from flask import Blueprint, request, jsonify, g
from app.models.user import User
from app.models.attendance import Attendance, AttendanceLog, AttendanceSession
from app.extensions import db
from app.middlewares.auth_middleware import jwt_required_middleware
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_required
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

debug_bp = Blueprint("debug_dp", __name__)

# Admin Create User (POST http://127.0.0.1:5000/admin/user)
@debug_bp.route("/protected-admin", methods=["POST"])
@jwt_required_middleware
def protected_admin():
    print(g.user_role)
    if g.user_role != 'admin':
        return jsonify({"message": "Forbidden: Admins only"}), 403

    # Access the authenticated user's ID from flask.g
    user_id = g.get("user_id")
    return jsonify({"message": f"Welcome, user {user_id}!"}), 200

@debug_bp.route("/protected-teacher", methods=["POST"])
@jwt_required_middleware
def protected_teacher():
    print(g.user_role)
    if g.user_role != 'teacher':
        return jsonify({"message": "Forbidden: Teachers only"}), 403

    # Access the authenticated user's ID from flask.g
    user_id = g.get("user_id")
    return jsonify({"message": f"Welcome, user {user_id}!"}), 200

@debug_bp.route("/protected-student", methods=["POST"])
@jwt_required_middleware
def protected_student():
    print(g.user_role)
    if g.user_role != 'student':
        return jsonify({"message": "Forbidden: Students only"}), 403

    # Access the authenticated user's ID from flask.g
    user_id = g.get("user_id")
    return jsonify({"message": f"Welcome, user {user_id}!"}), 200

@debug_bp.route("/attendance/<int:attendance_session_id>", methods=["GET"])
def get_attendances_for_session(attendance_session_id):
    # Log attendance session ID
    print(f"Fetching attendances for session ID: {attendance_session_id}")

    # Query the attendances
    attendances = Attendance.query.filter_by(attendance_session_id=attendance_session_id).all()

    # Check if any attendances exist for the session
    if not attendances:
        print("No attendances found for this session.")
        return jsonify({"message": "No attendances found for this session"}), 404

    # Prepare list of attendance data
    attendance_list = []
    for attendance in attendances:
        student = User.query.get(attendance.student_id)
        attendance_list.append({
            "attendance_id": attendance.id,
            "student_id": attendance.student_id,
            "student_name": student.name if student else "Unknown",
            "status": attendance.status,
            #"timestamp": attendance.timestamp.strftime('%Y-%m-%d %H:%M:%S') if attendance.timestamp else None
        })

    # Log the attendance list
    print(f"Found {len(attendance_list)} attendance records.")

    # Return the data
    return jsonify({
        "data": attendance_list
    }), 200