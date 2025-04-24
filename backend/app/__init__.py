from flask import Flask
from config import Config
from app.extensions import db, migrate
from app.models import *

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    print("Start")
    # Initialize Flask extensions here  
    db.init_app(app)
    migrate.init_app(app, db)

    @app.route('/test/')
    def test_page():
        return '<h1>Testing the Flask Application Factory Pattern</h1>'

    return app