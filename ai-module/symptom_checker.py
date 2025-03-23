# ai-module/symptom_checker.py
import tensorflow as tf
import numpy as np

def load_model():
    # In practice, load a pre-trained TensorFlow model
    # For demonstration purposes, we create a simple dummy model.
    model = tf.keras.Sequential([
        tf.keras.layers.InputLayer(input_shape=(10,)),  # Assume 10 features for symptoms
        tf.keras.layers.Dense(16, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy')
    return model

# Load the model when the module is imported.
model = load_model()

def symptom_checker(symptom_features):
    """
    Predicts a result based on symptom features.
    
    Args:
        symptom_features (list): A list of 10 numerical values representing symptoms.
    
    Returns:
        float: A prediction value (for example, probability that a condition is present).
    """
    # Convert the list to a NumPy array and reshape for the model.
    input_data = np.array(symptom_features).reshape(1, -1)
    prediction = model.predict(input_data)
    return float(prediction[0][0])
