from app import create_app
from app.extensions import db
from app.models.attendance import Attendance


def runAttendance():
    app = create_app()

    with app.app_context():
        attendances = [
            {
                "student_id": 1,
                "attendance_session_id": 1,
                "status": "present",
            },
            {
                "student_id": 2,
                "attendance_session_id": 1,
                "status": "absent",
            },
            {
                "student_id": 3,
                "attendance_session_id": 2,
                "status": "present",
            },
            {
                "student_id": 4,
                "attendance_session_id": 2,
                "status": "absent",
            },
            {
                "student_id": 5,
                "attendance_session_id": 3,
                "status": "present",
            },
            {
                "student_id": 6,
                "attendance_session_id": 3,
                "status": "absent",
            },
            {
                "student_id": 7,
                "attendance_session_id": 4,
                "status": "present",
            },
            {
                "student_id": 8,
                "attendance_session_id": 4,
                "status": "absent",
            },
            {
                "student_id": 9,
                "attendance_session_id": 5,
                "status": "present",
            },
            {
                "student_id": 10,
                "attendance_session_id": 5,
                "status": "absent",
            },
            {
                "student_id": 11,
                "attendance_session_id": 6,
                "status": "present",
            },
            {
                "student_id": 12,
                "attendance_session_id": 6,
                "status": "absent",
            },
            {
                "student_id": 13,
                "attendance_session_id": 7,
                "status": "present",
            },
            {
                "student_id": 14,
                "attendance_session_id": 7,
                "status": "absent",
            },
            {
                "student_id": 15,
                "attendance_session_id": 8,
                "status": "present",
            },
            {
                "student_id": 16,
                "attendance_session_id": 8,
                "status": "absent",
            },
            {
                "student_id": 17,
                "attendance_session_id": 9,
                "status": "present",
            },
            {
                "student_id": 18,
                "attendance_session_id": 9,
                "status": "absent",
            },
            {
                "student_id": 19,
                "attendance_session_id": 10,
                "status": "present",
            },
            {
                "student_id": 20,
                "attendance_session_id": 10,
                "status": "absent",
            },
            {
                "student_id": 21,
                "attendance_session_id": 1,
                "status": "present",
            },
            {
                "student_id": 22,
                "attendance_session_id": 1,
                "status": "absent",
            },
            {
                "student_id": 23,
                "attendance_session_id": 2,
                "status": "present",
            },
            {
                "student_id": 24,
                "attendance_session_id": 2,
                "status": "absent",
            },
            {
                "student_id": 25,
                "attendance_session_id": 3,
                "status": "present",
            },
            {
                "student_id": 26,
                "attendance_session_id": 3,
                "status": "absent",
            },
            {
                "student_id": 27,
                "attendance_session_id": 4,
                "status": "present",
            },
            {
                "student_id": 28,
                "attendance_session_id": 4,
                "status": "absent",
            },
            {
                "student_id": 29,
                "attendance_session_id": 5,
                "status": "present",
            },
            {
                "student_id": 30,
                "attendance_session_id": 5,
                "status": "absent",
            },
            {
                "student_id": 31,
                "attendance_session_id": 6,
                "status": "present",
            },
            {
                "student_id": 32,
                "attendance_session_id": 6,
                "status": "absent",
            },
            {
                "student_id": 33,
                "attendance_session_id": 7,
                "status": "present",
            },
            {
                "student_id": 34,
                "attendance_session_id": 7,
                "status": "absent",
            },
            {
                "student_id": 35,
                "attendance_session_id": 8,
                "status": "present",
            },
            {
                "student_id": 36,
                "attendance_session_id": 8,
                "status": "absent",
            },
            {
                "student_id": 37,
                "attendance_session_id": 9,
                "status": "present",
            },
            {
                "student_id": 38,
                "attendance_session_id": 9,
                "status": "absent",
            },
            {
                "student_id": 39,
                "attendance_session_id": 10,
                "status": "present",
            },
            {
                "student_id": 40,
                "attendance_session_id": 10,
                "status": "absent",
            },
        ]

        for attendance in attendances:
            db.session.add(Attendance(**attendance))

        db.session.commit()

    print("Tạo bảng Attendance thành công")
