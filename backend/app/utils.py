import secrets
import string

def generate_random_code(length=10):
    """Generate a random string of fixed length."""
    characters = string.ascii_letters + string.digits
    return ''.join(secrets.choice(characters) for i in range(length))