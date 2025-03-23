from app import db
from datetime import datetime

class User(db.Model):
    """User model for storing user information"""
    __tablename__ = 'users'
    
    id = db.Column(db.String(128), primary_key=True)  # Firebase UID
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship with PredictionHistory
    predictions = db.relationship('PredictionHistory', backref='user', lazy=True)
    
    def __repr__(self):
        return f'<User {self.email}>'