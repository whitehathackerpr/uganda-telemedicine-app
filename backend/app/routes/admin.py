from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.user import User
from ..models.consultation import Doctor
from .. import db
from functools import wraps

admin = Blueprint('admin', __name__)

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or not user.is_admin:
            return jsonify({'error': 'Admin access required'}), 403
        
        return f(*args, **kwargs)
    return decorated_function

@admin.route('/users', methods=['GET'])
@jwt_required()
@admin_required
def get_users():
    users = User.query.all()
    return jsonify({
        'users': [user.to_dict() for user in users]
    })

@admin.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
@admin_required
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@admin.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'email' in data:
        user.email = data['email']
    if 'phone' in data:
        user.phone = data['phone']
    if 'is_active' in data:
        user.is_active = data['is_active']
    if 'is_admin' in data:
        user.is_admin = data['is_admin']
    
    db.session.commit()
    
    return jsonify({
        'message': 'User updated successfully',
        'user': user.to_dict()
    })

@admin.route('/doctors', methods=['GET'])
@jwt_required()
@admin_required
def get_doctors():
    doctors = Doctor.query.all()
    return jsonify({
        'doctors': [doctor.to_dict() for doctor in doctors]
    })

@admin.route('/doctors', methods=['POST'])
@jwt_required()
@admin_required
def create_doctor():
    data = request.get_json()
    
    # Validate user exists
    user = User.query.get_or_404(data['user_id'])
    
    # Create doctor
    doctor = Doctor(
        user_id=data['user_id'],
        specialization=data['specialization'],
        license_number=data['license_number']
    )
    
    db.session.add(doctor)
    db.session.commit()
    
    return jsonify({
        'message': 'Doctor created successfully',
        'doctor': doctor.to_dict()
    }), 201

@admin.route('/doctors/<int:doctor_id>', methods=['GET'])
@jwt_required()
@admin_required
def get_doctor(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)
    return jsonify(doctor.to_dict())

@admin.route('/doctors/<int:doctor_id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_doctor(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)
    data = request.get_json()
    
    if 'specialization' in data:
        doctor.specialization = data['specialization']
    if 'license_number' in data:
        doctor.license_number = data['license_number']
    if 'is_active' in data:
        doctor.is_active = data['is_active']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Doctor updated successfully',
        'doctor': doctor.to_dict()
    })

@admin.route('/doctors/<int:doctor_id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_doctor(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)
    
    # Soft delete by setting is_active to False
    doctor.is_active = False
    db.session.commit()
    
    return jsonify({
        'message': 'Doctor deleted successfully'
    }) 