from flask import Blueprint, jsonify, g
from app.models.class_section import ClassSection
from app.models.subject import Subject
from app.models.enrollment import Enrollment
from app.middlewares.auth_middleware import jwt_required_middleware
from app.extensions import db

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
        db.func.count(Enrollment.id).label("student_count")
    ).join(Subject, ClassSection.subject_id == Subject.id
    ).outerjoin(Enrollment, Enrollment.class_section_id == ClassSection.id
    ).filter(ClassSection.teacher_id == teacher_id
    ).group_by(ClassSection.id, Subject.name, Subject.code
    ).all()

    return jsonify({
        "data": {
            "classes": [
                {
                    "id": cs.id,
                    "subject_name": cs.subject_name,
                    "subject_code": cs.subject_code,
                    "student_count": cs.student_count
                }
                for cs in class_sections
            ]
        }
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
            "class": {
                "id": class_section.id,
                "subject_name": subject.name,
                "subject_code": subject.code,
                "room": class_section.room,
                "day_of_week": class_section.day_of_week,
                "start_time": class_section.start_time.strftime('%H:%M'),
                "end_time": class_section.end_time.strftime('%H:%M'),
                "students": students
            }
        }
    }), 200