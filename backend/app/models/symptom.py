from datetime import datetime
from .. import db

class SymptomCheck(db.Model):
    __tablename__ = 'symptom_checks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    symptoms = db.Column(db.JSON, nullable=False)
    prediction = db.Column(db.String(255))
    confidence_score = db.Column(db.Float)
    recommendations = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'symptoms': self.symptoms,
            'prediction': self.prediction,
            'confidence_score': self.confidence_score,
            'recommendations': self.recommendations,
            'created_at': self.created_at.isoformat()
        } 