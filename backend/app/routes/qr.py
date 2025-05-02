import pandas as pd
import os
import qrcode
from io import BytesIO
from flask import Blueprint, request, jsonify, g, send_file
from werkzeug.utils import secure_filename
from datetime import datetime
from app.models.class_section import ClassSection
from app.models.user import User
from app.models.subject import Subject
from app.models.enrollment import Enrollment
from app.models.attendance import Attendance, AttendanceLog, AttendanceSession
from app.middlewares.auth_middleware import jwt_required_middleware
from app.extensions import db, bcrypt
from app.utils import generate_random_code, generate_qr_code_base64

qr_bp = Blueprint("qr_bp", __name__)

@qr_bp.route('/generate_qr/<path:data>')
def generate_qr(data):
    qr = qrcode.make(data)
    img_io = BytesIO()
    qr.save(img_io, 'PNG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')
