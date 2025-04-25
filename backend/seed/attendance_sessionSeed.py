from app import create_app
from app.models.attendance import AttendanceSession
from app.extensions import db


def runAttendanceSession():
    app = create_app()

    with app.app_context():
        attendance_sessions = [
            {
                "class_session_id": 1,
                "date": "2024-09-01",
                "qr_code_start": "COMP1000_1",
                "qr_code_end": "COMP1000_2",
            },
            {
                "class_session_id": 2,
                "date": "2024-09-02",
                "qr_code_start": "COMP1001_1",
                "qr_code_end": "COMP1001_2",
            },
            {
                "class_session_id": 3,
                "date": "2024-09-03",
                "qr_code_start": "COMP1002_1",
                "qr_code_end": "COMP1002_2",
            },
            {
                "class_session_id": 4,
                "date": "2024-09-04",
                "qr_code_start": "COMP1003_1",
                "qr_code_end": "COMP1003_2",
            },
            {
                "class_session_id": 5,
                "date": "2024-09-05",
                "qr_code_start": "COMP1004_1",
                "qr_code_end": "COMP1004_2",
            },
            {
                "class_session_id": 6,
                "date": "2024-09-06",
                "qr_code_start": "COMP1005_1",
                "qr_code_end": "COMP1005_2",
            },
            {
                "class_session_id": 7,
                "date": "2024-09-07",
                "qr_code_start": "COMP1006_1",
                "qr_code_end": "COMP1006_2",
            },
            {
                "class_session_id": 8,
                "date": "2024-09-08",
                "qr_code_start": "COMP1007_1",
                "qr_code_end": "COMP1007_2",
            },
            {
                "class_session_id": 9,
                "date": "2024-09-09",
                "qr_code_start": "COMP1008_1",
                "qr_code_end": "COMP1008_2",
            },
            {
                "class_session_id": 10,
                "date": "2024-09-10",
                "qr_code_start": "COMP1009_1",
                "qr_code_end": "COMP1009_2",
            },
        ]

        for session in attendance_sessions:
            attendance_session = AttendanceSession(
                class_session_id=session["class_session_id"],
                date=session["date"],
                qr_code_start=session["qr_code_start"],
                qr_code_end=session["qr_code_end"],
            )
            db.session.add(attendance_session)

        db.session.commit()
    print("Attendance sessions seeded successfully.")
