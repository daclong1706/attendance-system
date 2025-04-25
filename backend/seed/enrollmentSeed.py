from app import create_app
from app.extensions import db
from app.models.enrollment import Enrollment


def runEnrollment():
    app = create_app()

    with app.app_context():
        enrollments = [
            {
                "student_id": 1,
                "class_section_id": 1,
            },
            {
                "student_id": 2,
                "class_section_id": 2,
            },
            {
                "student_id": 3,
                "class_section_id": 3,
            },
            {
                "student_id": 4,
                "class_section_id": 4,
            },
            {
                "student_id": 5,
                "class_section_id": 5,
            },
            {
                "student_id": 6,
                "class_section_id": 1,
            },
            {
                "student_id": 7,
                "class_section_id": 2,
            },
            {
                "student_id": 8,
                "class_section_id": 3,
            },
            {
                "student_id": 9,
                "class_section_id": 4,
            },
            {
                "student_id": 10,
                "class_section_id": 5,
            },
            {
                "student_id": 11,
                "class_section_id": 1,
            },
            {
                "student_id": 12,
                "class_section_id": 2,
            },
            {
                "student_id": 13,
                "class_section_id": 3,
            },
            {
                "student_id": 14,
                "class_section_id": 4,
            },
            {
                "student_id": 15,
                "class_section_id": 5,
            },
            {
                "student_id": 16,
                "class_section_id": 1,
            },
            {
                "student_id": 17,
                "class_section_id": 2,
            },
            {
                "student_id": 18,
                "class_section_id": 3,
            },
            {
                "student_id": 19,
                "class_section_id": 4,
            },
            {
                "student_id": 20,
                "class_section_id": 5,
            },
            {
                "student_id": 21,
                "class_section_id": 1,
            },
            {
                "student_id": 22,
                "class_section_id": 2,
            },
            {
                "student_id": 23,
                "class_section_id": 3,
            },
            {
                "student_id": 24,
                "class_section_id": 4,
            },
            {
                "student_id": 25,
                "class_section_id": 5,
            },
            {
                "student_id": 26,
                "class_section_id": 1,
            },
            {
                "student_id": 27,
                "class_section_id": 2,
            },
            {
                "student_id": 28,
                "class_section_id": 3,
            },
            {
                "student_id": 29,
                "class_section_id": 4,
            },
            {
                "student_id": 30,
                "class_section_id": 5,
            },
            {
                "student_id": 31,
                "class_section_id": 1,
            },
            {
                "student_id": 32,
                "class_section_id": 2,
            },
            {
                "student_id": 33,
                "class_section_id": 3,
            },
            {
                "student_id": 34,
                "class_section_id": 4,
            },
            {
                "student_id": 35,
                "class_section_id": 5,
            },
            {
                "student_id": 36,
                "class_section_id": 1,
            },
            {
                "student_id": 37,
                "class_section_id": 2,
            },
            {
                "student_id": 38,
                "class_section_id": 3,
            },
            {
                "student_id": 39,
                "class_section_id": 4,
            },
            {
                "student_id": 40,
                "class_section_id": 5,
            },
        ]

        for enrollment in enrollments:
            new_enrollment = Enrollment(**enrollment)
            db.session.add(new_enrollment)

        db.session.commit()
    print("Enrollment data seeded successfully.")
