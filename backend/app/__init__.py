from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

# Initialize SQLAlchemy
db = SQLAlchemy()

def create_app(config_name=None):
    """Application factory function"""
    app = Flask(__name__)
    
    # Load configuration
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    app.config.from_object(f'app.config.{config_name.capitalize()}Config')
    
    # Initialize extensions
    CORS(app)
    db.init_app(app)
    
    # Register blueprints
    from app.api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app