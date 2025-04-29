import secrets
import string
import qrcode
import io
import base64
from pyzbar.pyzbar import decode
from PIL import Image

def generate_random_code(length=10):
    """Generate a random string of fixed length."""
    characters = string.ascii_letters + string.digits
    return ''.join(secrets.choice(characters) for i in range(length))

def generate_qr_code_base64(data):
    qr = qrcode.make(data)
    buffer = io.BytesIO()
    qr.save(buffer, format="PNG")
    buffer.seek(0)
    img_base64 = base64.b64encode(buffer.read()).decode('utf-8')
    return img_base64

def decode_qr_code(base64_string):
    img_data = base64.b64decode(base64_string)
    img = Image.open(io.BytesIO(img_data))
    decoded = decode(img)

    if decoded:
        return decoded[0].data.decode('utf-8')
    return None

"""
@app.route('/generate_qr/<data>')
def generate_qr(data):
    qr = qrcode.make(data)  # Tạo mã QR từ dữ liệu
    img_io = BytesIO()
    qr.save(img_io, 'PNG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
"""