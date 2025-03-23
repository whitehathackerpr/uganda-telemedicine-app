import os
import numpy as np
import tensorflow as tf
from flask import current_app
import logging

# Initialize logger
logger = logging.getLogger(__name__)

# Global variable to store the loaded model
_model = None

def load_model():
    """
    Load the TensorFlow model from the specified path.
    If no model exists, create a simple dummy model for demonstration.
    """
    global _model
    
    # Return the model if it's already loaded
    if _model is not None:
        return _model
    
    try:
        # Get model path from config
        model_path = current_app.config.get('MODEL_PATH')
        
        # Check if model exists at the specified path
        if model_path and os.path.exists(model_path):
            logger.info(f"Loading model from {model_path}")
            _model = tf.keras.models.load_model(model_path)
        else:
            # Create a dummy model for demonstration
            logger.warning("Model not found. Creating a dummy model for demonstration.")
            _model = tf.keras.Sequential([
                tf.keras.layers.InputLayer(input_shape=(10,)),
                tf.keras.layers.Dense(16, activation='relu'),
                tf.keras.layers.Dense(1, activation='sigmoid')
            ])
            _model.compile(optimizer='adam', loss='binary_crossentropy')
        
        return _model
    
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        # Create a dummy model as fallback
        _model = tf.keras.Sequential([
            tf.keras.layers.InputLayer(input_shape=(10,)),
            tf.keras.layers.Dense(16, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')
        ])
        _model.compile(optimizer='adam', loss='binary_crossentropy')
        return _model

def predict(features):
    """
    Make a prediction using the loaded model.
    
    Args:
        features (list): A list of 10 numerical values representing symptoms.
    
    Returns:
        tuple: (prediction, confidence) where prediction is the model's output
               and confidence is a measure of the model's certainty.
    """
    try:
        # Ensure model is loaded
        model = load_model()
        
        # Convert features to numpy array and reshape for the model
        input_data = np.array(features).reshape(1, -1)
        
        # Make prediction
        prediction_result = model.predict(input_data)
        prediction = float(prediction_result[0][0])
        
        # Calculate confidence (this is a simplified example)
        # In a real application, you might use model-specific methods to get confidence
        confidence = abs(prediction - 0.5) * 2  # Scale to [0, 1]
        
        return prediction, confidence
    
    except Exception as e:
        logger.error(f"Error making prediction: {str(e)}")
        # Return default values in case of error
        return 0.5, 0.0