from flask import Blueprint, request, jsonify
from app.models.subject import Subject

subject_bp = Blueprint("subject_bp", __name__)

@subject_bp.route("/getAllSubject", methods=["GET"])
def get_all_subjects():
    subjects = Subject.query.all()  # ✅ Đây là danh sách các đối tượng Subject
    return jsonify({
        "data": {
            "subjects": [  # ✅ Đưa danh sách vào đây thay vì một đối tượng đơn lẻ
                {
                    "id": subject.id,
                    "name": subject.name,
                    "code": subject.code
                }
                for subject in subjects
            ]
        }
    }), 200
