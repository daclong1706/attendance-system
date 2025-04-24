from flask import Flask
from config import Config
from app.extensions import db, migrate, jwt, bcrypt
from app.models import *
from app.routes import auth_bp
from flask_cors import CORS

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    CORS(app, resources={r"/*": {"origins": "*"}})
    # Initialize Flask extensions here  
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    # Đăng ký API routes
    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app