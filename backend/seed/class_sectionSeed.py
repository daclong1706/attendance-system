from app import create_app
from app.extensions import db
from app.models.class_section import ClassSection
from datetime import time, date


def runClassSection():
    app = create_app()

    with app.app_context():
        class_sections = [
            {
                "subject_id": 1,
                "teacher_id": 1,
                "room": "A101",
                "day_of_week": 2,
                "start_time": time(7, 30),
                "end_time": time(9, 0),
                "start_date": date(2025, 2, 10),
                "end_date": date(2025, 4, 28),
                "semester": "HK2",
                "year": 2024, # 2024-2025
            },
            {
                "subject_id": 2,
                "teacher_id": 2,
                "room": "B202",
                "day_of_week": 2,
                "start_time": time(10, 0),
                "end_time": time(12, 0),
                "start_date": date(2025, 2, 10),
                "end_date": date(2025, 5, 5),
                "semester": "HK2",
                "year": 2024,
            },
            {
                "subject_id": 3,
                "teacher_id": 3,
                "room": "C303",
                "day_of_week": 2,
                "start_time": time(13, 0),
                "end_time": time(15, 0),
                "start_date": date(2025, 2, 10),
                "end_date": date(2025, 5, 12),
                "semester": "HK2",
                "year": 2024,
            },
            {
                "subject_id": 4,
                "teacher_id": 5,
                "room": "B102",
                "day_of_week": 3,
                "start_time": time(10, 0),
                "end_time": time(11, 30),
                "start_date": date(2025, 2, 19),
                "end_date": date(2025, 5, 19),
                "semester": "HK2",
                "year": 2024,
            },
            {
                "subject_id": 5,
                "teacher_id": 6,
                "room": "C101",
                "day_of_week": 4,
                "start_time": time(13, 0),
                "end_time": time(14, 30),
                "start_date": date(2025, 2, 11),
                "end_date": date(2025, 5, 20),
                "semester": "HK2",
                "year": 2024,
            },
            {
                "subject_id": 6,
                "teacher_id": 7,
                "room": "C102",
                "day_of_week": 6,
                "start_time": time(15, 0),
                "end_time": time(16, 30),
                "start_date": date(2025, 2, 13),
                "end_date": date(2025, 5, 24),
                "semester": "HK2",
                "year": 2024,
            },
            {
                "subject_id": 7,
                "teacher_id": 8,
                "room": "D101",
                "day_of_week": 5,
                "start_time": time(7, 30),
                "end_time": time(9, 0),
                "start_date": date(2025, 2, 12),
                "end_date": date(2025, 5, 23),
                "semester": "HK2",
                "year": 2024,
            },
            {
                "subject_id": 8,
                "teacher_id": 9,
                "room": "D102",
                "day_of_week": 5,
                "start_time": time(9, 15),
                "end_time": time(10, 45),
                "start_date": date(2025, 2, 12),
                "end_date": date(2025, 5, 23),
                "semester": "HK2",
                "year": 2024,
            },
            {
                "subject_id": 9,
                "teacher_id": 10,
                "room": "E101",
                "day_of_week": 4,
                "start_time": time(13, 0),
                "end_time": time(14, 30),
                "start_date": date(2025, 2, 11),
                "end_date": date(2025, 5, 22),
                "semester": "HK2",
                "year": 2024,
            },
            {
                "subject_id": 10,
                "teacher_id": 2,
                "room": "E102",
                "day_of_week": 5,
                "start_time": time(15, 0),
                "end_time": time(16, 30),
                "start_date": date(2025, 2, 12),
                "end_date": date(2025, 5, 23),
                "semester": "HK2",
                "year": 2024,
            },
        ]

        for section in class_sections:
            db.session.add(
                ClassSection(
                    subject_id=section["subject_id"],
                    teacher_id=section["teacher_id"],
                    room=section["room"],
                    day_of_week=section["day_of_week"],
                    start_time=section["start_time"],
                    end_time=section["end_time"],
                    start_date=section["start_date"],
                    end_date=section["end_date"],
                    semester=section["semester"],
                    year=section["year"],
                )
            )

        db.session.commit()

    print("Tạo bảng ClassSection thành công")
