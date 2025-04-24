from app import create_app
from app.extensions import db
from app.models.class_section import ClassSection
from datetime import time


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
                "semester": "Fall",
                "year": 2023,
            },
            {
                "subject_id": 2,
                "teacher_id": 2,
                "room": "B202",
                "day_of_week": 3,
                "start_time": time(10, 0),
                "end_time": time(12, 0),
                "semester": "Spring",
                "year": 2024,
            },
            {
                "subject_id": 3,
                "teacher_id": 3,
                "room": "C303",
                "day_of_week": 4,
                "start_time": time(13, 0),
                "end_time": time(15, 0),
                "semester": "Summer",
                "year": 2024,
            },
            {
                "subject_id": 4,
                "teacher_id": 5,
                "room": "B102",
                "day_of_week": 4,
                "start_time": time(10, 0),
                "end_time": time(11, 30),
                "semester": "HK1",
                "year": 2024,
            },
            {
                "subject_id": 5,
                "teacher_id": 6,
                "room": "C101",
                "day_of_week": 5,
                "start_time": time(13, 0),
                "end_time": time(14, 30),
                "semester": "HK1",
                "year": 2024,
            },
            {
                "subject_id": 6,
                "teacher_id": 7,
                "room": "C102",
                "day_of_week": 1,
                "start_time": time(15, 0),
                "end_time": time(16, 30),
                "semester": "HK2",
                "year": 2024,
            },
            {
                "subject_id": 7,
                "teacher_id": 8,
                "room": "D101",
                "day_of_week": 2,
                "start_time": time(7, 30),
                "end_time": time(9, 0),
                "semester": "HK2",
                "year": 2024,
            },
            {
                "subject_id": 8,
                "teacher_id": 9,
                "room": "D102",
                "day_of_week": 3,
                "start_time": time(9, 15),
                "end_time": time(10, 45),
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
                    semester=section["semester"],
                    year=section["year"],
                )
            )

        db.session.commit()

    print("Tạo bảng ClassSection thành công")
