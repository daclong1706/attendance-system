from flask import Blueprint, request, jsonify
from app.models.subject import Subject

subject_bp = Blueprint("subject_bp", __name__)

@subject_bp.route("", methods=["GET"])
def get_all_subjects():
    subjects = Subject.query.all() 
    return jsonify({
        "data": [
            {
                "id": subject.id,
                "name": subject.name,
                "code": subject.code
            }
            for subject in subjects
        ]
    }), 200
