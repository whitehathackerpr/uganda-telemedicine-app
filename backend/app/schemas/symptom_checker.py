from marshmallow import Schema, fields, validates, ValidationError

class SymptomCheckerSchema(Schema):
    """Schema for validating symptom checker input"""
    features = fields.List(fields.Float(required=True), required=True)
    
    @validates('features')
    def validate_features(self, features):
        """Validate that features is a list of 10 numeric values"""
        if len(features) != 10:
            raise ValidationError('Features must contain exactly 10 values')


class PredictionResultSchema(Schema):
    """Schema for validating prediction result input"""
    user_id = fields.String(required=True)
    features = fields.List(fields.Float(required=True), required=True)
    prediction = fields.Float(required=True)
    confidence = fields.Float(required=True)
    
    @validates('features')
    def validate_features(self, features):
        """Validate that features is a list of 10 numeric values"""
        if len(features) != 10:
            raise ValidationError('Features must contain exactly 10 values')