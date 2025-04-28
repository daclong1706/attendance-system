from flask import Blueprint, request, jsonify, g
from app.models.subject import Subject
from app.extensions import db
from app.middlewares.auth_middleware import jwt_required_middleware

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

@subject_bp.route("/create", methods=["POST"])
@jwt_required_middleware
def create_subject():
    if g.user_role != 'admin':
        return jsonify({"message": "Forbidden: Admins only"}), 403
    
    data = request.get_json()
    if not data.get("name") or not data.get("code"):
        return jsonify({"message": "Code and name are required"}), 400
    
    existing_subject = Subject.query.filter_by(code=data["code"]).first()
    if existing_subject:
        return jsonify({"message": "Học phần đã tồn tại"}), 400
    
    new_subject = Subject(
        name=data["name"],
        code=data["code"]
    )
    
    db.session.add(new_subject)
    db.session.commit()
    
    return jsonify({
        "data": {
            "id": new_subject.id,
            "name": new_subject.name,
            "code": new_subject.code,
        }
    }), 201
    
@subject_bp.route("/<int:subject_id>", methods=["DELETE"])
@jwt_required_middleware
def delete_subject(subject_id):
    if g.user_role != 'admin':
        return jsonify({"message": "Forbidden: Admins only"}), 403

    subject = Subject.query.get(subject_id)

    if not subject:
        return jsonify({"message": "Subject not found"}), 404

    db.session.delete(subject)
    db.session.commit()

    return jsonify({"message": f"Subject with ID {subject_id} has been deleted"}), 200

@subject_bp.route("/<int:subject_id>", methods=["PUT"])
@jwt_required_middleware
def update_subject(subject_id):
    if g.user_role != 'admin':
        return jsonify({"message": "Forbidden: Admins only"}), 403

    data = request.get_json()

    subject = Subject.query.get(subject_id)
    if not subject:
        return jsonify({"message": "Subject not found"}), 404

    if data.get("name"):
        subject.name = data["name"]
    if data.get("code"):
        subject.code = data["code"]

    db.session.commit()

    return jsonify({
        "data": {
            "id": subject.id,
            "name": subject.name,
            "code": subject.code,
        }
    }), 200
    