from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.consultation import Consultation, Doctor
from ..models.user import User
from .. import db
from datetime import datetime
import uuid
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant
from twilio.rest import Client

consultations = Blueprint('consultations', __name__)

# Initialize Twilio client
twilio_client = Client(Config.TWILIO_ACCOUNT_SID, Config.TWILIO_AUTH_TOKEN)

@consultations.route('/doctors', methods=['GET'])
@jwt_required()
def get_doctors():
    doctors = Doctor.query.filter_by(is_active=True).all()
    return jsonify({
        'doctors': [doctor.to_dict() for doctor in doctors]
    })

@consultations.route('/book', methods=['POST'])
@jwt_required()
def book_consultation():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    # Validate doctor exists and is active
    doctor = Doctor.query.filter_by(id=data['doctor_id'], is_active=True).first_or_404()
    
    # Create consultation
    consultation = Consultation(
        user_id=current_user_id,
        doctor_id=data['doctor_id'],
        datetime=datetime.fromisoformat(data['datetime']),
        notes=data.get('notes')
    )
    
    # Generate room name and token
    consultation.room_name = f"consultation-{uuid.uuid4()}"
    token = AccessToken(
        Config.TWILIO_ACCOUNT_SID,
        Config.TWILIO_API_KEY,
        Config.TWILIO_API_SECRET
    )
    token.add_grant(VideoGrant(room=consultation.room_name))
    consultation.room_token = token.to_jwt()
    
    db.session.add(consultation)
    db.session.commit()
    
    return jsonify({
        'message': 'Consultation booked successfully',
        'consultation': consultation.to_dict()
    }), 201

@consultations.route('/my-consultations', methods=['GET'])
@jwt_required()
def get_my_consultations():
    current_user_id = get_jwt_identity()
    consultations = Consultation.query.filter_by(user_id=current_user_id).order_by(Consultation.datetime.desc()).all()
    
    return jsonify({
        'consultations': [consultation.to_dict() for consultation in consultations]
    })

@consultations.route('/<int:consultation_id>', methods=['GET'])
@jwt_required()
def get_consultation(consultation_id):
    current_user_id = get_jwt_identity()
    consultation = Consultation.query.get_or_404(consultation_id)
    
    # Ensure user can only access their own consultations
    if consultation.user_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    return jsonify(consultation.to_dict())

@consultations.route('/<int:consultation_id>/join', methods=['POST'])
@jwt_required()
def join_consultation(consultation_id):
    current_user_id = get_jwt_identity()
    consultation = Consultation.query.get_or_404(consultation_id)
    
    # Ensure user is either the patient or the doctor
    if consultation.user_id != current_user_id and consultation.doctor_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Generate new token for joining
    token = AccessToken(
        Config.TWILIO_ACCOUNT_SID,
        Config.TWILIO_API_KEY,
        Config.TWILIO_API_SECRET
    )
    token.add_grant(VideoGrant(room=consultation.room_name))
    
    return jsonify({
        'token': token.to_jwt(),
        'room_name': consultation.room_name
    })

@consultations.route('/<int:consultation_id>/complete', methods=['POST'])
@jwt_required()
def complete_consultation(consultation_id):
    current_user_id = get_jwt_identity()
    consultation = Consultation.query.get_or_404(consultation_id)
    
    # Ensure user is the doctor
    if consultation.doctor_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    consultation.status = 'completed'
    db.session.commit()
    
    return jsonify({
        'message': 'Consultation completed successfully',
        'consultation': consultation.to_dict()
    }) 