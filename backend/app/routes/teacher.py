from flask import Blueprint, request, jsonify, g
from datetime import datetime
from app.models.class_section import ClassSection
from app.models.user import User
from app.models.subject import Subject
from app.models.enrollment import Enrollment
from app.models.attendance import Attendance, AttendanceLog, AttendanceSession
from app.middlewares.auth_middleware import jwt_required_middleware
from app.extensions import db, bcrypt
from app.utils import generate_random_code
from datetime import datetime

teacher_bp = Blueprint("teacher_bp", __name__)

"""
@teacher_bp.route("/classes", methods=["GET"])
@jwt_required_middleware
def get_teacher_classes():
    if g.user_role != 'teacher':
        return jsonify({"message": "Forbidden: Teachers only"}), 403

    teacher_id = g.user_id

    class_sections = db.session.query(
        ClassSection.id,
        Subject.name.label("subject_name")
    ).join(Subject, ClassSection.subject_id == Subject.id
    ).filter(ClassSection.teacher_id == teacher_id).all()

    return jsonify({
        "data": {
            "classes": [
                {
                    "id": class_section.id,
                    "subject_name": class_section.subject_name
                }
                for class_section in class_sections
            ]
        }
    }), 200
"""

@teacher_bp.route("/classes", methods=["GET"])
@jwt_required_middleware
def get_teacher_classes():
    if g.user_role != 'teacher':
        return jsonify({"message": "Forbidden: Teachers only"}), 403

    teacher_id = g.user_id

    class_sections = db.session.query(
        ClassSection.id,
        Subject.name.label("subject_name"),
        Subject.code.label("subject_code"),
        db.func.count(Enrollment.id).label("student_count"),
        ClassSection.day_of_week.label("day_of_week"),
        ClassSection.start_date.label("start_date"),
        ClassSection.end_date.label("end_date")
    ).join(Subject, ClassSection.subject_id == Subject.id
    ).outerjoin(Enrollment, Enrollment.class_section_id == ClassSection.id
    ).filter(ClassSection.teacher_id == teacher_id
    ).group_by(ClassSection.id, Subject.name, Subject.code
    ).all()

    return jsonify({
        "data": [
            {
                "id": cs.id,
                "subject_name": cs.subject_name,
                "subject_code": cs.subject_code,
                "student_count": cs.student_count,
                "day_of_week": cs.day_of_week,
                "start_date": cs.start_date,
                "end_date": cs.end_date
            }
            for cs in class_sections
        ]
    }), 200

@teacher_bp.route("/classes/<int:class_section_id>", methods=["GET"])
@jwt_required_middleware
def get_class_details(class_section_id):
    if g.user_role != 'teacher':
        return jsonify({"message": "Forbidden: Teachers only"}), 403
    
    # Fetch the class section by ID
    class_section = ClassSection.query.get(class_section_id)
    if not class_section:
        return jsonify({"message": "Class not found"}), 404

    # Fetch the subject of the class
    subject = Subject.query.get(class_section.subject_id)
    if not subject:
        return jsonify({"message": "Subject not found"}), 404
    
    enrollments = Enrollment.query.filter_by(class_section_id=class_section_id).all()
    students = [
        {
            "id": enrollment.student.id,
            "name": enrollment.student.name,
            "email": enrollment.student.email,
            "mssv": enrollment.student.mssv,
        }
        for enrollment in enrollments
    ]
    
    return jsonify({
        "data": {
            "id": class_section.id,
            "subject_name": subject.name,
            "subject_code": subject.code,
            "room": class_section.room,
            "day_of_week": class_section.day_of_week,
            "start_time": class_section.start_time.strftime('%H:%M'),
            "end_time": class_section.end_time.strftime('%H:%M'),
            "students": students
        }
    }), 200

@teacher_bp.route("/update", methods=["PUT"])
@jwt_required_middleware
def update_teacher():
    if g.user_role != 'teacher':
        return jsonify({"message": "Forbidden: Teachers only"}), 403

    teacher = User.query.get(g.user_id)
    
    if not teacher:
        return jsonify({"message": "Teacher not found"}), 404

    data = request.get_json()

    if "name" in data:
        teacher.name = data["name"]

    if "email" in data:
        teacher.email = data["email"]

    if "password" in data and data["password"]:
        teacher.password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

    db.session.commit()

    return jsonify({
        "data": {
            "user": {
                "id": teacher.id,
                "name": teacher.name,
                "email": teacher.email,
                "mssv": teacher.mssv,
                "role": teacher.role,
                "created_at": teacher.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
        }
    }), 200

@teacher_bp.route("/schedule", methods=["GET"])
@jwt_required_middleware
def get_teacher_schedule():
    if g.user_role != "teacher":
        return jsonify({"message": "Forbidden: Teachers only"}), 403

    # Get the teacher's classes
    teacher = User.query.filter_by(id=g.user_id).first()
    if not teacher:
        return jsonify({"message": "Teacher not found"}), 404

    class_sections = ClassSection.query.filter_by(teacher_id=teacher.id).all()

    teaching_schedule = []
    for class_section in class_sections:
        subject = Subject.query.filter_by(id=class_section.subject_id).first()
        class_time = f"{class_section.start_time.strftime('%H:%M')} - {class_section.end_time.strftime('%H:%M')}"

        teaching_schedule.append({
            "subject": subject.name,
            "class_time": class_time,
            "room": class_section.room,
            "day_of_week": class_section.day_of_week,
            "semester": class_section.semester,
            "year": class_section.year,
            "start_time": class_section.start_time.strftime('%H:%M'),
            "end_time": class_section.end_time.strftime('%H:%M'),
            "start_date": class_section.start_date.strftime('%Y-%m-%d'),
            "end_date": class_section.end_date.strftime('%Y-%m-%d')
        })

    return jsonify({"data": teaching_schedule}), 200

@teacher_bp.route("/attendance-session", methods=["POST"])
@jwt_required_middleware
def create_attendance_session():
    if g.user_role != "teacher":
        return jsonify({"message": "Forbidden: Teachers only"}), 403

    data = request.get_json()

    class_section_id = data.get("class_section_id")
    date_str = data.get("date")

    if not all([class_section_id, date_str]):
        return jsonify({"message": "Missing class_section_id or date"}), 400

    try:
        date = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"message": "Invalid date format, expected YYYY-MM-DD"}), 400

    class_section = ClassSection.query.get(class_section_id)
    if not class_section:
        return jsonify({"message": "Class section not found"}), 404

    if class_section.teacher_id != int(g.user_id):
        return jsonify({"message": "You are not authorized to create attendance session for this class"}), 403

    existing_session = AttendanceSession.query.filter_by(class_session_id=class_section_id, date=date).first()
    if existing_session:
        return jsonify({"message": "Attendance session already exists for this class and date"}), 409

    # Step 1: Create AttendanceSession
    attendance_session = AttendanceSession(
        class_session_id=class_section_id,
        date=date,
        qr_code_start=generate_random_code(),
        qr_code_end=generate_random_code()
    )

    db.session.add(attendance_session)
    db.session.flush()  # Flush so that attendance_session.id is available

    # Step 2: Create Attendances for each student enrolled
    enrollments = Enrollment.query.filter_by(class_section_id=class_section_id).all()

    for enrollment in enrollments:
        attendance = Attendance(
            student_id=enrollment.student_id,
            attendance_session_id=attendance_session.id,
            status='present'
        )
        db.session.add(attendance)

    db.session.commit()

    return jsonify({
        "message": "Attendance session created successfully",
        "attendance_session_id": attendance_session.id
    }), 201

@teacher_bp.route("/attendance-session/<int:attendance_session_id>/update", methods=["PUT"])
@jwt_required_middleware
def update_attendance_status(attendance_session_id):
    updates = data.get("updates", [])  # Expecting a list of updates
    if not updates:
        return jsonify({"message": "No updates provided"}), 400

    attendance_session = AttendanceSession.query.get(attendance_session_id)
    if not attendance_session:
        return jsonify({"message": "Attendance session not found"}), 404

    updated_attendances = []
    for update in updates:
        attendance_id = update.get("attendance_id")
        new_status = update.get("status")

        if not attendance_id or not new_status:
            continue  # Skip invalid entries

        attendance = Attendance.query.filter_by(id=attendance_id, attendance_session_id=attendance_session_id).first()
        if attendance:
            attendance.status = new_status
            updated_attendances.append({
                "attendance_id": attendance.id,
                "student_id": attendance.student_id,
                "status": attendance.status
            })

    db.session.commit()

    return jsonify({
        "message": "Attendance statuses updated successfully",
        "data": updated_attendances
    }), 200


from datetime import datetime
from flask import jsonify, request, g
from app.extensions import db
from app.models import ClassSection, Subject, Enrollment, AttendanceSession, Attendance

@teacher_bp.route("/attendance", methods=["POST"])
@jwt_required_middleware
def get_class_attendance():
    print("Dữ liệu nhận được:", data)

    class_section_id = data.get("class_section_id")
    selected_date = data.get("selected_date")
    day_of_week = data.get("day_of_week")

    if not class_section_id or not selected_date or not day_of_week:
        return jsonify({"message": "Missing required parameters"}), 400

    class_section = ClassSection.query.get(class_section_id)
    if not class_section:
        return jsonify({"message": "Class not found"}), 404

    selected_date_obj = datetime.strptime(selected_date, "%Y-%m-%d").date()
    if not (class_section.start_date <= selected_date_obj <= class_section.end_date):
        return jsonify({"message": "Selected date is out of range"}), 400

    if str(day_of_week) != str(class_section.day_of_week):
        return jsonify({"message": "Invalid day of week for this class"}), 400

    attendance_session = AttendanceSession.query.filter_by(
        class_session_id=class_section_id, date=selected_date_obj
    ).first()

    if not attendance_session:
        attendance_session = AttendanceSession(
            class_session_id=class_section_id,
            date=selected_date_obj,
            qr_code_start="GeneratedStartQR",
            qr_code_end="GeneratedEndQR"
        )
        db.session.add(attendance_session)
        db.session.commit()

        enrollments = Enrollment.query.filter_by(class_section_id=class_section_id).all()
        for enrollment in enrollments:
            attendance = Attendance(
                student_id=enrollment.student.id,
                attendance_session_id=attendance_session.id,
                status="not_recorded"
            )
            db.session.add(attendance)
        db.session.commit()

    attendances = Attendance.query.filter_by(attendance_session_id=attendance_session.id).all()
    students = [
        {
            "id": attendance.student.id,
            "name": attendance.student.name,
            "email": attendance.student.email,
            "mssv": attendance.student.mssv,
            "attendance_status": attendance.status
        }
        for attendance in attendances
    ]

    return jsonify(
        {
            "data": {
                "id": class_section.id,
                "students": students
            }
        }
    ), 200

@teacher_bp.route("/attendance/save", methods=["POST"])
@jwt_required_middleware
def save_attendance():
    if g.user_role != "teacher":
        return jsonify({"message": "Forbidden: Teachers only"}), 403

    data = request.get_json()

    class_section_id = data.get("class_section_id")
    selected_date = data.get("selected_date")
    day_of_week = data.get("day_of_week")
    students = data.get("students")

    if not class_section_id or not selected_date or not day_of_week or not students:
        return jsonify({"message": "Missing required parameters"}), 400

    class_section = ClassSection.query.get(class_section_id)
    if not class_section:
        return jsonify({"message": "Class not found"}), 404

    selected_date_obj = datetime.strptime(selected_date, "%Y-%m-%d").date()
    if not (class_section.start_date <= selected_date_obj <= class_section.end_date):
        return jsonify({"message": "Selected date is out of range"}), 400

    if str(day_of_week) != str(class_section.day_of_week):
        return jsonify({"message": "Invalid day of week for this class"}), 400

    attendance_session = AttendanceSession.query.filter_by(
        class_session_id=class_section_id, date=selected_date_obj
    ).first()

    if not attendance_session:
        return jsonify({"message": "Attendance session not found"}), 404

    for student in students:
        attendance = Attendance.query.filter_by(
            student_id=student["id"], attendance_session_id=attendance_session.id
        ).first()

        if attendance:
            attendance.status = student["status"]
        else:
            attendance = Attendance(
                student_id=student["id"],
                attendance_session_id=attendance_session.id,
                status=student["status"]
            )
            db.session.add(attendance)

    db.session.commit()

    return jsonify({"message": "Attendance saved successfully"}), 200
