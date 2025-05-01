import secrets
import string
import qrcode
import io
import base64
from utils import generate_qr_code_base64, generate_random_code, decode_qr_code


qr_content = generate_qr_code_base64("start:2:2024-09-08")
debug = decode_qr_code(qr_content)

print(debug)  # Should print: start:2:2024-09-08