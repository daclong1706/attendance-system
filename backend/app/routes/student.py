from flask import Blueprint, request, jsonify, g
from app.models.class_section import ClassSection
from app.models.user import User
from app.models.subject import Subject
from app.models.enrollment import Enrollment
from app.models.attendance import AttendanceSession, Attendance
from app.middlewares.auth_middleware import jwt_required_middleware
from app.extensions import db, bcrypt

student_bp = Blueprint("student_bp", __name__)

@student_bp.route("/update", methods=["PUT"])
@jwt_required_middleware
def update_student():
    if g.user_role != "student":
        return jsonify({"message": "Forbidden: Students only"}), 403

    student = User.query.filter_by(id=g.user_id).first()

    if not student:
        return jsonify({"message": "Student not found"}), 404

    data = request.get_json()
    
    if not data.get("name") and not data.get("email"):
        return jsonify({"message": "At least one of 'name' or 'email' is required"}), 400

    if "name" in data and data["name"]:
        student.name = data["name"]

    if "email" in data and data["email"]:
        student.email = data["email"]

    if "password" in data and data["password"]:
        student.password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

    db.session.commit()

    return jsonify({
        "data": {
            "user": {
                "id": student.id,
                "name": student.name,
                "email": student.email,
                "mssv": student.mssv,
                "role": student.role,
                "created_at": student.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
        }
    }), 200

@student_bp.route("/schedule", methods=["GET"])
@jwt_required_middleware
def get_student_schedule():
    if g.user_role != "student":
        return jsonify({"message": "Forbidden: Students only"}), 403

    student = User.query.filter_by(id=g.user_id).first()
    if not student:
        return jsonify({"message": "Student not found"}), 404

    enrollments = Enrollment.query.filter_by(student_id=student.id).all()

    student_schedule = []
    for enrollment in enrollments:
        class_section = ClassSection.query.filter_by(id=enrollment.class_section_id).first()
        subject = Subject.query.filter_by(id=class_section.subject_id).first()
        teacher = User.query.filter_by(id=class_section.teacher_id).first();

        class_time = f"{class_section.start_time.strftime('%H:%M')} - {class_section.end_time.strftime('%H:%M')}"

        student_schedule.append({
            "subject": subject.name,
            "class_time": class_time,
            "room": class_section.room,
            "day_of_week": class_section.day_of_week,
            "semester": class_section.semester,
            "year": class_section.year,
            "start_time": class_section.start_time.strftime('%H:%M'),
            "end_time": class_section.end_time.strftime('%H:%M'),
            "start_date": class_section.start_date.strftime('%Y-%m-%d'),
            "end_date": class_section.end_date.strftime('%Y-%m-%d'),
            "teacher_name": teacher.name,
            "teacher_email": teacher.email
        })

    return jsonify({"data": student_schedule}), 200

@student_bp.route("/attendance", methods=["POST"])
@jwt_required_middleware
def get_student_attendance_history():
    if g.user_role != "student":
        return jsonify({"message": "Forbidden: Teachers only"}), 403

    data = request.get_json()
    print("Dữ liệu nhận được:", data)
    student_id = data.get("student_id")
    class_section_id = data.get("class_section_id")

    if not student_id or not class_section_id:
        return jsonify({"message": "Missing required parameters"}), 400

    attendance_records = Attendance.query.filter_by(student_id=student_id).join(AttendanceSession).filter(
        AttendanceSession.class_session_id == class_section_id
    ).all()

    if not attendance_records:
        return jsonify({"message": "Attendance records not found"}), 404

    attendance_history = [
        {
            "date": record.attendance_session.date.strftime("%Y-%m-%d"),
            "attendance_status": record.status
        }
        for record in attendance_records
    ]

    return jsonify({
        "data": {
            "student_id": student_id,
            "class_section_id": class_section_id,
            "attendance_history": attendance_history
        }
    }), 200
    
@student_bp.route("/attendance/all", methods=["POST"])
@jwt_required_middleware
def get_student_full_attendance_history():
    if g.user_role != "student":
        return jsonify({"message": "Forbidden: Students only"}), 403

    data = request.get_json()
    print("Dữ liệu nhận được:", data)
    student_id = data.get("student_id")

    if not student_id:
        return jsonify({"message": "Missing required parameter: student_id"}), 400

    attendance_records = Attendance.query.filter_by(student_id=student_id).join(AttendanceSession).all()

    if not attendance_records:
        return jsonify({"message": "Attendance records not found"}), 404

    attendance_history = {}

    for record in attendance_records:
        class_section_id = record.attendance_session.class_session_id
        if class_section_id not in attendance_history:
            attendance_history[class_section_id] = []

        attendance_history[class_section_id].append({
            "date": record.attendance_session.date.strftime("%Y-%m-%d"),
            "attendance_status": record.status
        })

    return jsonify({
        "data": {
            "student_id": student_id,
            "attendance_history": attendance_history
        }
    }), 200

