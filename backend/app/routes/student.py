from flask import Blueprint, request, jsonify, g
from app.models.class_section import ClassSection
from app.models.user import User
from app.models.subject import Subject
from app.models.enrollment import Enrollment
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
