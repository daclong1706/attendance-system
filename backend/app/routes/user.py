from flask import Blueprint, request, jsonify
from app.models.user import User

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