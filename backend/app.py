# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import sys
import os
import importlib.util

# Add the parent directory to the Python path to import from ai-module
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(parent_dir)

# Import the symptom checker function using importlib
spec = importlib.util.spec_from_file_location(
    "symptom_checker", 
    os.path.join(parent_dir, "ai-module", "symptom_checker.py")
)
symptom_checker_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(symptom_checker_module)
symptom_checker = symptom_checker_module.symptom_checker

# Import database functions
from database.db import (
    create_user, 
    get_user_by_email, 
    save_symptom_input, 
    save_prediction, 
    get_user_history
)

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests from the frontend.

@app.route('/api/users', methods=['POST'])
def register_user():
    """
    Register a new user.
    
    Expects JSON body with:
    - name: User's full name
    - email: User's email address
    """
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    
    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400
    
    # Check if user already exists
    existing_user = get_user_by_email(email)
    if existing_user:
        return jsonify({"error": "User with this email already exists"}), 409
    
    # Create new user
    user = create_user(name, email)
    if not user:
        return jsonify({"error": "Failed to create user"}), 500
    
    return jsonify({"user": user}), 201

@app.route('/api/users/login', methods=['POST'])
def login_user():
    """
    Login a user by email.
    
    Expects JSON body with:
    - email: User's email address
    """
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({"error": "Email is required"}), 400
    
    # Get user by email
    user = get_user_by_email(email)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({"user": user}), 200

@app.route('/api/symptom-checker', methods=['POST'])
def symptom_checker_endpoint():
    """
    Process symptom data and return prediction.
    
    Expects JSON body with:
    - user_id: UUID of the user (optional if not authenticated)
    - features: List of 10 symptom severity values
    """
    data = request.get_json()
    user_id = data.get('user_id')
    features = data.get('features', [])
    
    # Validate input
    if not features or len(features) != 10:
        return jsonify({"error": "Invalid input. Expected 10 features."}), 400
    
    # If user_id is provided, validate and save to database
    if user_id:
        try:
            # Convert user_id string to UUID
            user_id_uuid = uuid.UUID(user_id)
            
            # Save symptom input to database
            input_data = save_symptom_input(user_id, features)
            if not input_data:
                return jsonify({"error": "Failed to save symptom input"}), 500
        except ValueError:
            return jsonify({"error": "Invalid user ID format"}), 400
    else:
        # If no user_id, create a temporary input data structure
        input_data = {
            'input_id': None,
            'timestamp': None,
            'features': features
        }
    
    # Get prediction from the AI module
    confidence_score = symptom_checker(features)
    
    # Determine condition based on confidence score (simplified example)
    if confidence_score > 0.7:
        predicted_condition = "High Risk Condition"
    elif confidence_score > 0.4:
        predicted_condition = "Medium Risk Condition"
    else:
        predicted_condition = "Low Risk Condition"
    
    # Create prediction data
    prediction = {
        'predicted_condition': predicted_condition,
        'confidence_score': confidence_score
    }
    
    # Save prediction to database if user is authenticated
    if user_id and input_data.get('input_id'):
        saved_prediction = save_prediction(input_data['input_id'], predicted_condition, confidence_score)
        if saved_prediction:
            prediction = saved_prediction
    
    return jsonify({
        "input": input_data,
        "prediction": prediction
    })

@app.route('/api/users/<user_id>/history', methods=['GET'])
def user_history(user_id):
    """
    Get a user's symptom input and prediction history.
    """
    try:
        # Convert user_id string to UUID
        user_id_uuid = uuid.UUID(user_id)
    except ValueError:
        return jsonify({"error": "Invalid user ID format"}), 400
    
    history = get_user_history(user_id)
    return jsonify({"history": history})

if __name__ == '__main__':
    app.run(debug=True)