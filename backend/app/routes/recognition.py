import pandas as pd
import os
from flask import Blueprint, request, jsonify, g
from werkzeug.utils import secure_filename
from datetime import datetime
from app.models.class_section import ClassSection
from app.models.user import User
from app.models.enrollment import Enrollment
from app.models.attendance import Attendance, AttendanceLog, AttendanceSession
from app.middlewares.auth_middleware import jwt_required_middleware
from app.extensions import db, bcrypt
from app.utils import generate_random_code
from app.Model.scripts.mark_attendance import mark_attendance
import json

recognition_bp = Blueprint("recognition_bp", __name__)

@recognition_bp.route("/attendance/face_recognition", methods=["POST"])
@jwt_required_middleware
def attendance_by_face_recognition():
    if g.user_role != "teacher":
        return jsonify({"message": "Forbidden: Teachers only"}), 403

    # Nhận ảnh từ request
    image = request.files.get("image")
    
    if not image:
        return jsonify({"message": "No image provided"}), 400
    
    json_data = request.form.get("data")  # Lấy dữ liệu dưới dạng chuỗi
    print(json_data)
    if not json_data:
        return jsonify({"message": "No JSON data provided"}), 400

    data = json.loads(json_data)

    # Lưu ảnh tạm thời
    if not os.path.exists("temp"):
        os.makedirs("temp")

    image_path = os.path.join("temp", image.filename)
    image.save(image_path)

    # Gọi model nhận diện khuôn mặt
    recognized_user, similarity = mark_attendance(image_path)

    if recognized_user == "Unknown" or similarity < 0.5:
        return jsonify({"message": "Student not recognized"}), 404

    # Xác định thời gian điểm danh
    # attendance_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print("User ID:",recognized_user, similarity)
    # Xử lý điểm danh như đã làm trước đó
    # return jsonify({"message": f"Attendance saved successfully, {recognized_user}"}), 200
    return process_attendance(recognized_user, data)

def process_attendance(student_id, data):
    # attendance_time_obj = datetime.strptime(attendance_time, "%Y-%m-%d %H:%M:%S")
    
    class_section_id = data.get("class_section_id")
    selected_date = data.get("selected_date")
    
    if(student_id == "Long"):
        student_id = "S00041"
    
    if not class_section_id or not selected_date:
        return jsonify({"message": "Missing required parameters"}), 400

    class_section = ClassSection.query.get(class_section_id)
    if not class_section:
        return jsonify({"message": "Class not found"}), 404

    selected_date_obj = datetime.strptime(selected_date, "%Y-%m-%d").date()
    if not (class_section.start_date <= selected_date_obj <= class_section.end_date):
        return jsonify({"message": "Selected date is out of range"}), 400
    

    # Tìm sinh viên
    student = User.query.filter_by(mssv=student_id).first()
    if not student:
        return jsonify({"message": "Student not found"}), 404

    attendance_session = AttendanceSession.query.filter_by(
        class_session_id=class_section_id, date=selected_date_obj
    ).first()

    if not attendance_session:
        return jsonify({"message": "Attendance session not found"}), 404

    attendance = Attendance.query.filter_by(
        student_id=student.id, attendance_session_id=attendance_session.id
    ).first()

    if attendance:
        attendance.status = "present"
    else:
        attendance = Attendance(
            student_id=student.id,
            attendance_session_id=attendance_session.id,
            status="present"
        )
        db.session.add(attendance)

    db.session.commit()

    return jsonify({
        "data": {
            "id": student.id,
            "name": student.name,
            "mssv": student.mssv
        }
        }), 200