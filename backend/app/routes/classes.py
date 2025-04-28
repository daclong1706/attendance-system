from flask import Blueprint, request, jsonify, g
from flask_bcrypt import Bcrypt
from app.models.class_section import ClassSection
from app.models.subject import Subject
from app.models.enrollment import Enrollment
from app.models.user import User
from app.extensions import db
from app.middlewares.auth_middleware import jwt_required_middleware


bcrypt = Bcrypt()

class_bp = Blueprint("class_bp", __name__)

@class_bp.route("", methods=["GET"])
@jwt_required_middleware
def get_class():
    if g.user_role == 'teacher':
            return jsonify({"message": "Forbidden: Admins only"}), 403

    class_sections = db.session.query(
        ClassSection.id,
        Subject.name.label("subject_name"),
        Subject.code.label("subject_code"),
        db.func.count(Enrollment.id).label("student_count"),
        User.name.label("teacher_name")
    ).join(Subject, ClassSection.subject_id == Subject.id
    ).outerjoin(Enrollment, Enrollment.class_section_id == ClassSection.id
    ).join(User, ClassSection.teacher_id == User.id 
    ).group_by(ClassSection.id, Subject.name, Subject.code, User.name
    ).all()

    return jsonify({
        "data": [
            {
                "id": cs.id,
                "subject_name": cs.subject_name,
                "subject_code": cs.subject_code,
                "student_count": cs.student_count,
                "teacher_name": cs.teacher_name
            }
            for cs in class_sections
        ]
    }), 200

