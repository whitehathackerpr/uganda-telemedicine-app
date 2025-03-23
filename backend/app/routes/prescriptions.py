from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.prescription import Prescription
from ..models.consultation import Consultation
from ..models.user import User
from .. import db

prescriptions = Blueprint('prescriptions', __name__)

@prescriptions.route('/create', methods=['POST'])
@jwt_required()
def create_prescription():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    # Validate consultation exists and is completed
    consultation = Consultation.query.get_or_404(data['consultation_id'])
    if consultation.status != 'completed':
        return jsonify({'error': 'Consultation must be completed before creating prescription'}), 400
    
    # Ensure user is the doctor
    if consultation.doctor_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Create prescription
    prescription = Prescription(
        consultation_id=data['consultation_id'],
        diagnosis=data['diagnosis'],
        medications=data['medications'],
        notes=data.get('notes')
    )
    
    db.session.add(prescription)
    db.session.commit()
    
    return jsonify({
        'message': 'Prescription created successfully',
        'prescription': prescription.to_dict()
    }), 201

@prescriptions.route('/my-prescriptions', methods=['GET'])
@jwt_required()
def get_my_prescriptions():
    current_user_id = get_jwt_identity()
    consultations = Consultation.query.filter_by(user_id=current_user_id).all()
    consultation_ids = [c.id for c in consultations]
    
    prescriptions = Prescription.query.filter(
        Prescription.consultation_id.in_(consultation_ids)
    ).order_by(Prescription.created_at.desc()).all()
    
    return jsonify({
        'prescriptions': [prescription.to_dict() for prescription in prescriptions]
    })

@prescriptions.route('/<int:prescription_id>', methods=['GET'])
@jwt_required()
def get_prescription(prescription_id):
    current_user_id = get_jwt_identity()
    prescription = Prescription.query.get_or_404(prescription_id)
    
    # Ensure user is either the patient or the doctor
    if prescription.consultation.user_id != current_user_id and prescription.consultation.doctor_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    return jsonify(prescription.to_dict())

@prescriptions.route('/<int:prescription_id>', methods=['PUT'])
@jwt_required()
def update_prescription(prescription_id):
    current_user_id = get_jwt_identity()
    prescription = Prescription.query.get_or_404(prescription_id)
    
    # Ensure user is the doctor
    if prescription.consultation.doctor_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    
    if 'diagnosis' in data:
        prescription.diagnosis = data['diagnosis']
    if 'medications' in data:
        prescription.medications = data['medications']
    if 'notes' in data:
        prescription.notes = data['notes']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Prescription updated successfully',
        'prescription': prescription.to_dict()
    }) 