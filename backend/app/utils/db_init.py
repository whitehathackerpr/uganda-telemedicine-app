from ..models.user import User
from ..models.consultation import Doctor
from .. import db
from werkzeug.security import generate_password_hash

def init_db():
    """
    Initialize the database with default data.
    """
    # Create tables
    db.create_all()
    
    # Check if admin user exists
    admin = User.query.filter_by(email='admin@example.com').first()
    if not admin:
        # Create admin user
        admin = User(
            email='admin@example.com',
            first_name='Admin',
            last_name='User',
            is_admin=True,
            is_active=True
        )
        admin.set_password('admin123')  # Change this in production
        db.session.add(admin)
        db.session.commit()
    
    # Check if test doctor exists
    doctor_user = User.query.filter_by(email='doctor@example.com').first()
    if not doctor_user:
        # Create test doctor user
        doctor_user = User(
            email='doctor@example.com',
            first_name='Test',
            last_name='Doctor',
            is_active=True
        )
        doctor_user.set_password('doctor123')  # Change this in production
        db.session.add(doctor_user)
        db.session.commit()
        
        # Create doctor profile
        doctor = Doctor(
            user_id=doctor_user.id,
            specialization='General Medicine',
            license_number='MD123456',
            is_active=True
        )
        db.session.add(doctor)
        db.session.commit()
    
    # Check if test patient exists
    patient = User.query.filter_by(email='patient@example.com').first()
    if not patient:
        # Create test patient user
        patient = User(
            email='patient@example.com',
            first_name='Test',
            last_name='Patient',
            is_active=True
        )
        patient.set_password('patient123')  # Change this in production
        db.session.add(patient)
        db.session.commit()
    
    print("Database initialized successfully!") 