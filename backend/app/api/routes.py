from flask import request, jsonify, g
from marshmallow import ValidationError
from app.api import api_bp
from app.schemas.symptom_checker import SymptomCheckerSchema, PredictionResultSchema
from app.services.ai_model import predict
from app.models.prediction import PredictionHistory
from app.auth.firebase import token_required
from app import db

# Health check endpoint
@api_bp.route('/health-check', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({"status": "success", "message": "API is running"})

# Symptom checker endpoint
@api_bp.route('/symptom-checker', methods=['POST'])
def symptom_checker():
    """
    Process symptom data and return prediction.
    
    Expects a JSON payload with a "features" key containing a list of 10 numbers.
    Returns a prediction and confidence score.
    """
    # Parse and validate input data
    try:
        schema = SymptomCheckerSchema()
        data = schema.load(request.json)
        features = data['features']
    except ValidationError as err:
        return jsonify({"status": "error", "message": "Invalid input data", "errors": err.messages}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    
    # Get prediction from AI model
    prediction, confidence = predict(features)
    
    # Return prediction result
    return jsonify({
        "status": "success",
        "prediction": prediction,
        "confidence": confidence
    })

# Save prediction result endpoint
@api_bp.route('/save-result', methods=['POST'])
@token_required
def save_result():
    """
    Save prediction result to database.
    
    Requires authentication.
    Expects a JSON payload with features, prediction, and confidence.
    """
    try:
        # Get user from authentication
        user = g.user
        
        # Parse and validate input data
        schema = PredictionResultSchema()
        data = request.json
        data['user_id'] = user.id  # Add user_id to data
        validated_data = schema.load(data)
        
        # Create new prediction history record
        prediction_history = PredictionHistory(
            user_id=validated_data['user_id'],
            features=validated_data['features'],
            prediction=validated_data['prediction'],
            confidence=validated_data['confidence']
        )
        
        # Save to database
        db.session.add(prediction_history)
        db.session.commit()
        
        return jsonify({
            "status": "success",
            "message": "Prediction result saved successfully",
            "id": prediction_history.id
        })
    
    except ValidationError as err:
        return jsonify({"status": "error", "message": "Invalid input data", "errors": err.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500

# Get prediction history endpoint
@api_bp.route('/history', methods=['GET'])
@token_required
def get_history():
    """
    Get prediction history for the authenticated user.
    
    Requires authentication.
    Returns paginated list of prediction history records.
    """
    try:
        # Get user from authentication
        user = g.user
        
        # Get pagination parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Query database for prediction history
        pagination = PredictionHistory.query.filter_by(user_id=user.id) \
            .order_by(PredictionHistory.created_at.desc()) \
            .paginate(page=page, per_page=per_page)
        
        # Convert records to dictionaries
        records = [record.to_dict() for record in pagination.items]
        
        # Return paginated results
        return jsonify({
            "status": "success",
            "data": records,
            "pagination": {
                "page": page,
                "per_page": per_page,
                "total": pagination.total,
                "pages": pagination.pages
            }
        })
    
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500