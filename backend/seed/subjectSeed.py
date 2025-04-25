from app import create_app
from app.extensions import db
from app.models.subject import Subject


def runSubject():
    app = create_app()

    with app.app_context():
        subjects = [
            {"name": "Toán cao cấp", "code": "COMP1000"},
            {"name": "Vật lý đại cương", "code": "COMP1001"},
            {"name": "Hóa học cơ bản", "code": "COMP1002"},
            {"name": "Sinh học đại cương", "code": "COMP1003"},
            {"name": "Kỹ thuật lập trình", "code": "COMP1004"},
            {"name": "Giải tích số", "code": "COMP1005"},
            {"name": "Nhập môn lập trình", "code": "COMP1006"},
            {"name": "Cấu trúc máy tính", "code": "COMP1007"},
            {"name": "Lý thuyết đồ thị", "code": "COMP1008"},
            {"name": "Lập trình hướng đối tượng", "code": "COMP1009"},
            {"name": "Phân tích và thiết kế thuật toán", "code": "COMP1010"},
        ]

        for subject in subjects:
            db.session.add(Subject(name=subject["name"], code=subject["code"]))

        db.session.commit()

    print("Tạo bảng Subject thành công")
