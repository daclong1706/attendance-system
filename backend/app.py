from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Cho phép frontend gửi yêu cầu

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "Backend đã kết nối thành công!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)