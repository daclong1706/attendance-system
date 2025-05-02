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
    if g.user_role == "teacher":
        return jsonify({"message": "Forbidden: Admins only"}), 403

    class_sections = (
        db.session.query(
            ClassSection.id,
            Subject.name.label("subject_name"),
            Subject.code.label("subject_code"),
            db.func.count(Enrollment.id).label("student_count"),
            User.name.label("teacher_name"),
        )
        .join(Subject, ClassSection.subject_id == Subject.id)
        .outerjoin(Enrollment, Enrollment.class_section_id == ClassSection.id)
        .join(User, ClassSection.teacher_id == User.id)
        .group_by(ClassSection.id, Subject.name, Subject.code, User.name)
        .all()
    )

    return (
        jsonify(
            {
                "data": [
                    {
                        "id": cs.id,
                        "subject_name": cs.subject_name,
                        "subject_code": cs.subject_code,
                        "student_count": cs.student_count,
                        "teacher_name": cs.teacher_name,
                    }
                    for cs in class_sections
                ]
            }
        ),
        200,
    )


@class_bp.route("/infoClass", methods=["GET"])
@jwt_required_middleware
def get_class_information():
    if g.user_role == "teacher":
        return jsonify({"message": "Forbidden: Admins only"}), 403

    class_section = ClassSection.query.all()

    return (
        jsonify(
            {
                "data": [
                    {
                        "id": cs.id,
                        "subject_id": cs.subject_name,
                        "teacher_id": cs.subject_code,
                        "room": cs.room,
                        "day_of_week": cs.day_of_week,
                        "start_time": cs.start_time,
                        "end_time": cs.end_time,
                        "start_date": cs.start_date,
                        "end_date": cs.end_date,
                        "semester": cs.semester,
                        "year": cs.year,
                    }
                    for cs in class_section
                ]
            }
        ),
        200,
    )


@class_bp.route("/infoClassID", methods=["GET"])
@jwt_required_middleware
def get_class_informationID():
    class_id = request.args.get("id")  # Lấy ID lớp học từ query parameters
    if not class_id:
        return jsonify({"error": "Class ID is required"}), 400

    # Giả sử bạn có mô hình `ClassSection` trong cơ sở dữ liệu để lấy thông tin lớp học
    class_session = ClassSection.query.filter_by(
        id=class_id
    ).first()  # Truy vấn thông tin lớp học theo ID

    if not class_session:
        return jsonify({"error": "Class not found"}), 404

    # Chuyển đổi `start_time` và `end_time` thành chuỗi nếu chúng là đối tượng `time`
    start_time_str = (
        class_session.start_time.strftime("%H:%M:%S")
        if class_session.start_time
        else None
    )
    end_time_str = (
        class_session.end_time.strftime("%H:%M:%S")
        if class_session.end_time
        else None
    )

    # Trả về thông tin lớp học
    return (
        jsonify(
            {
                "data": [
                    {
                        "id": class_session.id,
                        "subject_id": class_session.subject_id,
                        "teacher_id": class_session.teacher_id,
                        "room": class_session.room,
                        "day_of_week": class_session.day_of_week,
                        "start_time": start_time_str,
                        "end_time": end_time_str,
                        "start_date": class_session.start_date,
                        "end_date": class_session.end_date,
                        "semester": class_session.semester,
                        "year": class_session.year,
                    }
                ]
            }
        ),
        200,
    )
