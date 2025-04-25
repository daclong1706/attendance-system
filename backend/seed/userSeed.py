from app import create_app
from app.extensions import db, bcrypt
from app.models.user import User


def runUser():
    app = create_app()

    with app.app_context():
        users = [
            {
                "name": "Quản Trị Viên",
                "email": "admin@example.com",
                "mssv": "A0000",
                "password": "admin123",
                "role": "admin",
            }
        ]

        # 9 giáo viên
        teacher_names = [
            "Trần Văn Hùng",
            "Lê Thị Mai",
            "Phạm Văn Bình",
            "Ngô Thị Thu",
            "Đỗ Minh Tuấn",
            "Vũ Thị Lan",
            "Hoàng Văn Cường",
            "Bùi Thị Hạnh",
            "Nguyễn Văn Phong",
        ]

        for i, name in enumerate(teacher_names, 1):
            users.append(
                {
                    "name": name,
                    "email": f"teacher{i}@example.com",
                    "mssv": f"T{i:04}",
                    "password": "teacher123",
                    "role": "teacher",
                }
            )

        # 40 học sinh
        student_names = [
            "Nguyễn Văn An",
            "Trần Thị Bích",
            "Lê Văn Cường",
            "Phạm Thị Dung",
            "Hoàng Văn Dũng",
            "Đỗ Thị Giang",
            "Nguyễn Hữu Hòa",
            "Vũ Thị Hương",
            "Bùi Văn Hưng",
            "Lý Thị Lan",
            "Ngô Văn Lâm",
            "Trịnh Thị Liên",
            "Trần Văn Long",
            "Phạm Thị Mai",
            "Lê Minh Nam",
            "Vũ Thị Nga",
            "Hoàng Văn Ngọc",
            "Nguyễn Thị Oanh",
            "Đặng Văn Phát",
            "Bùi Thị Phương",
            "Trần Văn Quang",
            "Phạm Thị Quyên",
            "Nguyễn Văn Sang",
            "Lê Thị Tâm",
            "Hoàng Văn Thái",
            "Ngô Thị Thảo",
            "Đỗ Văn Thành",
            "Vũ Thị Thanh",
            "Trịnh Văn Thiện",
            "Nguyễn Văn Thọ",
            "Phạm Thị Thu",
            "Trần Văn Toàn",
            "Lê Thị Trang",
            "Bùi Văn Trí",
            "Nguyễn Minh Tú",
            "Hoàng Thị Tuyết",
            "Đỗ Văn Vinh",
            "Ngô Thị Xuân",
            "Trịnh Văn Yên",
            "Lý Thị Yến",
        ]

        for i, name in enumerate(student_names, 1):
            users.append(
                {
                    "name": name,
                    "email": f"student{i}@example.com",
                    "mssv": f"S{i:05}",
                    "password": "student123",
                    "role": "student",
                }
            )

        user_objects = [
            User(
                name=user["name"],
                email=user["email"],
                mssv=user["mssv"],
                password=bcrypt.generate_password_hash(user["password"]).decode(
                    "utf-8"
                ),
                role=user["role"],
            )
            for user in users
        ]

        db.session.add_all(user_objects)
        db.session.commit()

    print("Tạo bảng User thành công")
