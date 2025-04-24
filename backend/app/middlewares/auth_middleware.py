from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

def jwt_required_middleware(func):
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            request.user_id = user_id 
            return func(*args, **kwargs)
        except Exception:
            return jsonify({"message": "Unauthorized"}), 401
    return wrapper