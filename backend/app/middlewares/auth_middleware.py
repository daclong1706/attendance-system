from flask import request, jsonify, g
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity, get_jwt
from functools import wraps
from app.models.user import User

"""
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
"""

def jwt_required_middleware(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()

            user = User.query.get(user_id)

            g.user_id = user_id
            g.user_role = user.role

            return func(*args, **kwargs)
        except Exception as e:
            print(f"JWT verification failed: {str(e)}")
            return jsonify({"message": "Unauthorized"}), 401
    return wrapper