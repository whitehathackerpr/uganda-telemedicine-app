import os
import firebase_admin
from firebase_admin import credentials, auth
from functools import wraps
from flask import request, jsonify, current_app, g
from app.models.user import User
from app import db

# Initialize Firebase Admin SDK
firebase_app = None

def initialize_firebase():
    """Initialize Firebase Admin SDK with credentials"""
    global firebase_app
    if firebase_app is not None:
        return firebase_app
    
    cred_path = current_app.config.get('FIREBASE_CREDENTIALS')
    if cred_path and os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_app = firebase_admin.initialize_app(cred)
    else:
        # Use application default credentials if no specific credentials are provided
        firebase_app = firebase_admin.initialize_app()
    
    return firebase_app

def verify_token(token):
    """Verify Firebase ID token"""
    try:
        # Initialize Firebase if not already initialized
        if firebase_app is None:
            initialize_firebase()
        
        # Verify the token
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        current_app.logger.error(f"Token verification failed: {str(e)}")
        return None

def get_or_create_user(user_id, email):
    """Get existing user or create a new one"""
    user = User.query.get(user_id)
    if not user:
        user = User(id=user_id, email=email)
        db.session.add(user)
        db.session.commit()
    return user

def token_required(f):
    """Decorator to protect API endpoints with Firebase authentication"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Get token from Authorization header
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'message': 'Authentication token is missing!'}), 401
        
        # Verify token
        decoded_token = verify_token(token)
        if not decoded_token:
            return jsonify({'message': 'Invalid authentication token!'}), 401
        
        # Get or create user
        user_id = decoded_token['uid']
        email = decoded_token.get('email', '')
        user = get_or_create_user(user_id, email)
        
        # Store user in g object for access in the route function
        g.user = user
        
        return f(*args, **kwargs)
    
    return decorated