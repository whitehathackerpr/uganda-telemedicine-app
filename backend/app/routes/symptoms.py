from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.symptom import SymptomCheck
from ..models.user import User
from .. import db
from ..services.ai_service import get_prediction
from datetime import datetime

symptoms = Blueprint('symptoms', __name__)

@symptoms.route('/check', methods=['POST'])
@jwt_required()
def check_symptoms():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    # Get prediction from AI model
    prediction, confidence_score, recommendations = get_prediction(data['symptoms'])
    
    # Save symptom check
    symptom_check = SymptomCheck(
        user_id=current_user_id,
        symptoms=data['symptoms'],
        prediction=prediction,
        confidence_score=confidence_score,
        recommendations=recommendations
    )
    
    db.session.add(symptom_check)
    db.session.commit()
    
    return jsonify({
        'message': 'Symptoms checked successfully',
        'prediction': prediction,
        'confidence_score': confidence_score,
        'recommendations': recommendations,
        'symptom_check': symptom_check.to_dict()
    })

@symptoms.route('/history', methods=['GET'])
@jwt_required()
def get_symptom_history():
    current_user_id = get_jwt_identity()
    symptom_checks = SymptomCheck.query.filter_by(user_id=current_user_id).order_by(SymptomCheck.created_at.desc()).all()
    
    return jsonify({
        'symptom_checks': [check.to_dict() for check in symptom_checks]
    })

@symptoms.route('/<int:check_id>', methods=['GET'])
@jwt_required()
def get_symptom_check(check_id):
    current_user_id = get_jwt_identity()
    symptom_check = SymptomCheck.query.get_or_404(check_id)
    
    # Ensure user can only access their own symptom checks
    if symptom_check.user_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    return jsonify(symptom_check.to_dict()) 