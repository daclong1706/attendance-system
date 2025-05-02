from flask import Blueprint, request, jsonify, g
from app.models.user import User
from app.models.enrollment import Enrollment
from app.models.class_section import ClassSection
from app.extensions import db
from app.middlewares.auth_middleware import jwt_required_middleware
from werkzeug.security import generate_password_hash
from flask_bcrypt import Bcrypt
from datetime import datetime

bcrypt = Bcrypt()

admin_bp = Blueprint("admin_bp", __name__)


# Admin Create User (POST http://127.0.0.1:5000/admin/user)
@admin_bp.route("/user", methods=["POST"])
@jwt_required_middleware
def create_user():
    if g.user_role != "admin":
        return jsonify({"message": "Forbidden: Admins only"}), 403

    data = request.get_json()

    if (
        not data.get("name")
        or not data.get("email")
        or not data.get("password")
    ):
        return (
            jsonify({"message": "Name, email, and password are required"}),
            400,
        )

    hashed_password = bcrypt.generate_password_hash(data["password"]).decode(
        "utf-8"
    )

    new_user = User(
        name=data["name"],
        email=data["email"],
        mssv=data.get("mssv", ""),
        password=hashed_password,
        role=data["role"],
    )

    db.session.add(new_user)
    db.session.commit()

    return (
        jsonify(
            {
                "data": {
                    "id": new_user.id,
                    "name": new_user.name,
                    "email": new_user.email,
                    "mssv": new_user.mssv,
                    "role": new_user.role,
                    "created_at": new_user.created_at.strftime(
                        "%Y-%m-%d %H:%M:%S"
                    ),
                }
            }
        ),
        201,
    )


# Admin Delete User (DELETE http://127.0.0.1:5000/admin/user/5)
@admin_bp.route("/user/<int:user_id>", methods=["DELETE"])
@jwt_required_middleware
def delete_user(user_id):
    if g.user_role != "admin":
        return jsonify({"message": "Forbidden: Admins only"}), 403

    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": f"User with ID {user_id} has been deleted"}), 200


# Admin Update User (UPDATE http://127.0.0.1:5000/admin/user/6)
@admin_bp.route("/user/<int:user_id>", methods=["PUT"])
@jwt_required_middleware
def update_user(user_id):
    if g.user_role != "admin":
        return jsonify({"message": "Forbidden: Admins only"}), 403

    data = request.get_json()

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    if data.get("name"):
        user.name = data["name"]
    if data.get("email"):
        user.email = data["email"]
    if data.get("mssv"):
        user.mssv = data["mssv"]
    if data.get("password"):
        user.password = bcrypt.generate_password_hash(data["password"]).decode(
            "utf-8"
        )
    if data.get("role"):
        user.role = data["role"]

    db.session.commit()

    return (
        jsonify(
            {
                "data": {
                    "user": {
                        "id": user.id,
                        "name": user.name,
                        "email": user.email,
                        "mssv": user.mssv,
                        "role": user.role,
                        "created_at": user.created_at.strftime(
                            "%Y-%m-%d %H:%M:%S"
                        ),
                    }
                }
            }
        ),
        200,
    )


@admin_bp.route(
    "/enrollment/<int:class_section_id>/remove/<int:student_id>",
    methods=["DELETE"],
)
@jwt_required_middleware
def remove_student_from_class(class_section_id, student_id):
    if g.user_role != "admin":
        return jsonify({"message": "Forbidden: Admins only"}), 403

    print(class_section_id, student_id)

    enrollment = Enrollment.query.filter_by(
        class_section_id=class_section_id, student_id=student_id
    ).first()

    if not enrollment:
        return jsonify({"error": "Enrollment not found"}), 404

    db.session.delete(enrollment)
    db.session.commit()

    return (
        jsonify(
            {
                "message": f"Student {student_id} removed from class section {class_section_id}"
            }
        ),
        200,
    )


@admin_bp.route("/class/add", methods=["POST"])
@jwt_required_middleware
def create_class_section():
    if g.user_role != "admin":
        return jsonify({"message": "Forbidden: Admins only"}), 403

    data = request.get_json()

    required_fields = [
        "subject_id",
        "teacher_id",
        "room",
        "day_of_week",
        "start_time",
        "end_time",
        "start_date",
        "end_date",
        "semester",
        "year",
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    try:
        class_section = ClassSection(
            subject_id=data["subject_id"],
            teacher_id=data["teacher_id"],
            room=data["room"],
            day_of_week=data["day_of_week"],
            start_time=datetime.strptime(data["start_time"], "%H:%M").time(),
            end_time=datetime.strptime(data["end_time"], "%H:%M").time(),
            start_date=datetime.strptime(data["start_date"], "%Y-%m-%d").date(),
            end_date=datetime.strptime(data["end_date"], "%Y-%m-%d").date(),
            semester=data["semester"],
            year=data["year"],
        )

        db.session.add(class_section)
        db.session.commit()

        return (
            jsonify(
                {
                    "message": "Class section created successfully",
                    "id": class_section.id,
                }
            ),
            201,
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@admin_bp.route("/class/update/<int:class_section_id>", methods=["PUT"])
@jwt_required_middleware
def update_class_section(class_section_id):
    if g.user_role != "admin":
        return jsonify({"message": "Forbidden: Admins only"}), 403

    data = request.get_json()
    class_section = ClassSection.query.get(class_section_id)

    if not class_section:
        return jsonify({"error": "Class section not found"}), 404

    try:
        if "subject_id" in data:
            class_section.subject_id = data["subject_id"]
        if "teacher_id" in data:
            class_section.teacher_id = data["teacher_id"]
        if "room" in data:
            class_section.room = data["room"]
        if "day_of_week" in data:
            class_section.day_of_week = data["day_of_week"]
        if "start_time" in data:
            class_section.start_time = datetime.strptime(
                data["start_time"], "%H:%M"
            ).time()
        if "end_time" in data:
            class_section.end_time = datetime.strptime(
                data["end_time"], "%H:%M"
            ).time()
        if "start_date" in data:
            class_section.start_date = datetime.strptime(
                data["start_date"], "%Y-%m-%d"
            ).date()
        if "end_date" in data:
            class_section.end_date = datetime.strptime(
                data["end_date"], "%Y-%m-%d"
            ).date()
        if "semester" in data:
            class_section.semester = data["semester"]
        if "year" in data:
            class_section.year = data["year"]

        db.session.commit()
        return jsonify({"message": "Class section updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@admin_bp.route("/class/delete/<int:class_section_id>", methods=["DELETE"])
@jwt_required_middleware
def delete_class_section(class_section_id):
    if g.user_role != "admin":
        return jsonify({"message": "Forbidden: Admins only"}), 403

    class_section = ClassSection.query.get(class_section_id)

    if not class_section:
        return jsonify({"error": "Class section not found"}), 404

    try:
        db.session.delete(class_section)
        db.session.commit()
        return jsonify({"message": "Class section deleted successfully"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@admin_bp.route('/teachers', methods=['GET'])
@jwt_required_middleware
def get_teacher_list():
    teachers = User.query.filter_by(role="teacher").all()

    teacher_list = [
        {
            "id": teacher.id,
            "mssv": teacher.mssv,
            "name": teacher.name,
            "email": teacher.email
        }
        for teacher in teachers
    ]

    return jsonify({"teachers": teacher_list}), 200
