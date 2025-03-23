from app import db
from datetime import datetime
import json

class PredictionHistory(db.Model):
    """Model for storing prediction history"""
    __tablename__ = 'prediction_history'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(128), db.ForeignKey('users.id'), nullable=False)
    features = db.Column(db.Text, nullable=False)  # Stored as JSON string
    prediction = db.Column(db.Float, nullable=False)
    confidence = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __init__(self, user_id, features, prediction, confidence):
        self.user_id = user_id
        self.features = json.dumps(features)
        self.prediction = prediction
        self.confidence = confidence
    
    def get_features(self):
        """Convert JSON string back to list"""
        return json.loads(self.features)
    
    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'features': self.get_features(),
            'prediction': self.prediction,
            'confidence': self.confidence,
            'created_at': self.created_at.isoformat()
        }
    
    def __repr__(self):
        return f'<PredictionHistory {self.id}>'