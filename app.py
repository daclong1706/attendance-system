# from flask import Flask, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Cho phép frontend gửi yêu cầu

# @app.route('/ping', methods=['GET'])
# def ping():
#     return jsonify({"message": "Backend đã kết nối thành công!"})

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)

# app.py
import os
from flask import Flask, render_template
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)



load_dotenv()

print(os.environ.get('DB_USER'))
print(os.environ.get('DB_PASSWORD'))
print(os.environ.get('DB_NAME'))

db_user = os.environ['DB_USER']
db_password = os.environ['DB_PASSWORD']
db_name = os.environ['DB_NAME']

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://{db_user}:{db_password}@localhost:3306/{db_name}".format(
    db_user=db_user, db_password=db_password, db_name=db_name
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), unique=True, index=True)
    password = db.Column(db.String(128))
    address = db.Column(db.String(128))

    def __repr__(self):
        return f"User('{self.email}')"