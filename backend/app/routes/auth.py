from flask import Blueprint, request, jsonify
from app.extensions import db, bcrypt
from app.models.user import User
from flask_jwt_extended import create_access_token
from sqlalchemy import func

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not bcrypt.check_password_hash(user.password, data["password"]):
        return jsonify({"message": "Sai email hoặc mật khẩu"}), 401

    # access_token = create_access_token(identity=user.id)
    access_token = create_access_token(identity=str(user.id))  # Use string for the identity
    
    

    return jsonify({
        "data": {
            "access_token": access_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role,
                "name": user.name
            }
        }
    }), 200
    
@auth_bp.route("/role-count", methods=["GET"])
def count_roles():

    role_counts = (
        db.session.query(User.role, func.count(User.id))
        .group_by(User.role)
        .all()
    )

    role_summary = {role: count for role, count in role_counts}

    return jsonify({"data": role_summary}), 200


# @auth_bp.route("/register", methods=["POST"])
# def register():
#     data = request.json
#     hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
#     new_user = User(name=data["name"], email=data["email"], password=hashed_password, role="student")

#     db.session.add(new_user)
#     db.session.commit()
#     return jsonify({"message": "Đăng ký thành công"}), 201