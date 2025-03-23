import tensorflow as tf
import numpy as np
from ..config import Config

# Load the model
model = tf.keras.models.load_model(Config.MODEL_PATH)

def preprocess_symptoms(symptoms):
    """
    Preprocess the symptoms input for the model.
    This function should be customized based on your model's requirements.
    """
    # Convert symptoms to a format suitable for the model
    # This is a placeholder - implement according to your model's needs
    processed_symptoms = np.array(symptoms)
    return processed_symptoms

def get_prediction(symptoms):
    """
    Get prediction from the AI model.
    
    Args:
        symptoms (list): List of symptoms
        
    Returns:
        tuple: (prediction, confidence_score, recommendations)
    """
    # Preprocess symptoms
    processed_symptoms = preprocess_symptoms(symptoms)
    
    # Get model prediction
    prediction = model.predict(processed_symptoms)
    
    # Get confidence score
    confidence_score = float(np.max(prediction))
    
    # Get predicted class
    predicted_class = np.argmax(prediction)
    
    # Get recommendations based on prediction
    recommendations = get_recommendations(predicted_class, confidence_score)
    
    return predicted_class, confidence_score, recommendations

def get_recommendations(predicted_class, confidence_score):
    """
    Generate recommendations based on the prediction and confidence score.
    
    Args:
        predicted_class (int): The predicted class from the model
        confidence_score (float): The confidence score of the prediction
        
    Returns:
        list: List of recommendations
    """
    recommendations = []
    
    # Add recommendations based on confidence score
    if confidence_score < 0.7:
        recommendations.append("Consider consulting a healthcare professional for a more accurate diagnosis.")
    
    # Add class-specific recommendations
    if predicted_class == 0:  # Example: No serious condition
        recommendations.extend([
            "Monitor your symptoms and seek medical attention if they worsen.",
            "Get adequate rest and stay hydrated."
        ])
    elif predicted_class == 1:  # Example: Mild condition
        recommendations.extend([
            "Schedule a follow-up with your healthcare provider.",
            "Take prescribed medications as directed."
        ])
    else:  # Example: Serious condition
        recommendations.extend([
            "Seek immediate medical attention.",
            "Do not delay treatment."
        ])
    
    return recommendations 