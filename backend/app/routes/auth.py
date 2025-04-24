from flask import Blueprint, request, jsonify
from app.extensions import db, bcrypt
from app.models.user import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not bcrypt.check_password_hash(user.password, data["password"]):
        return jsonify({"message": "Sai email hoặc mật khẩu"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({
        "data": {
            "access_token": access_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role
            }
        }
    }), 200

# @auth_bp.route("/register", methods=["POST"])
# def register():
#     data = request.json
#     hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
#     new_user = User(name=data["name"], email=data["email"], password=hashed_password, role="student")

#     db.session.add(new_user)
#     db.session.commit()
#     return jsonify({"message": "Đăng ký thành công"}), 201