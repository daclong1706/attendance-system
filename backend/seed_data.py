from app import create_app
from app.extensions import db, bcrypt
from app.models.user import User

app = create_app()

with app.app_context():
    users = [
        # {"name": "Admin", "email": "admin@example.com", "mssv": "", "password": "123456", "role": "admin"},
        {"name": "Nguyễn Văn A", "email": "vana@example.com", "mssv": "123456", "password": "654321", "role": "student"},
        {"name": "Trần Thị B", "email": "thib@example.com", "mssv": "", "password": "abcdef", "role": "teacher"},
        {"name": "Lê Văn C", "email": "vanc@example.com", "mssv": "112233", "password": "qwerty", "role": "student"}
    ]

    user_objects = [
        User(
            name=user["name"],
            email=user["email"],
            mssv=user["mssv"],
            password=bcrypt.generate_password_hash(user["password"]).decode("utf-8"),
            role=user["role"]
        )
        for user in users
    ]

    db.session.add_all(user_objects)
    db.session.commit()

print("Đã thêm tất cả tài khoản thành công!")