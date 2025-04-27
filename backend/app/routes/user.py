from flask import Blueprint, request, jsonify, g
from app.models.user import User
from app.extensions import db
from app.middlewares.auth_middleware import jwt_required_middleware
from werkzeug.security import generate_password_hash
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

user_bp = Blueprint("user_bp", __name__)

@user_bp.route("/getAllUser", methods=["GET"])
def get_all_users():
    users = User.query.all()
    return jsonify({
        "data": [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "mssv": user.mssv,
                "role": user.role,
                "created_at": user.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
            for user in users
        ]
    }), 200

@user_bp.route("/getUserInformation", methods=["GET"])
def get_user_information():
    user_id = request.args.get("id")

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    user_data = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "mssv": user.mssv,
        "role": user.role,
        "created_at": user.created_at.strftime('%Y-%m-%d %H:%M:%S')
    }

    return jsonify({"data": user_data}), 200

@user_bp.route("/create", methods=["POST"])
@jwt_required_middleware
def create_user():
    if g.user_role != 'admin':
            return jsonify({"message": "Forbidden: Admins only"}), 403

    data = request.get_json()

    if not data.get("name") or not data.get("email") or not data.get("password"):
        return jsonify({"message": "Name, email, and password are required"}), 400
    
    existing_user = User.query.filter_by(email=data["email"]).first()
    if existing_user:
        return jsonify({"message": "Email đã tồn tại! Vui lòng thử email khác."}), 400


    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

    new_user = User(
        name=data["name"],
        email=data["email"],
        mssv=data.get("mssv", ""),
        password=hashed_password,
        role=data["role"]
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "data": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "mssv": new_user.mssv,
            "role": new_user.role,
            "created_at": new_user.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
    }), 201


@user_bp.route("/<int:user_id>", methods=["DELETE"])
@jwt_required_middleware
def delete_user(user_id):
    if g.user_role != 'admin':
        return jsonify({"message": "Forbidden: Admins only"}), 403

    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": f"User with ID {user_id} has been deleted"}), 200


@user_bp.route("/<int:user_id>", methods=["PUT"])
@jwt_required_middleware
def update_user(user_id):
    if g.user_role != 'admin':
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
        user.password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    if data.get("role"):
        user.role = data["role"]

    db.session.commit()

    return jsonify({
        "data": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "mssv": user.mssv,
            "role": user.role,
            "created_at": user.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
    }), 200