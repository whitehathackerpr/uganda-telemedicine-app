import os
import psycopg2
from psycopg2.extras import RealDictCursor, register_uuid
import json

# Register UUID type with psycopg2
register_uuid()

# Database connection parameters
DB_HOST = os.environ.get('DB_HOST', 'localhost')
DB_NAME = os.environ.get('DB_NAME', 'symptom_checker')
DB_USER = os.environ.get('DB_USER', 'postgres')
DB_PASSWORD = os.environ.get('DB_PASSWORD', 'postgres')
DB_PORT = os.environ.get('DB_PORT', '5432')

def get_db_connection():
    """
    Create and return a database connection.
    """
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT,
            cursor_factory=RealDictCursor
        )
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None

def create_user(name, email):
    """
    Create a new user in the database.
    
    Args:
        name (str): User's full name
        email (str): User's email address
        
    Returns:
        dict: User data including user_id if successful, None otherwise
    """
    conn = get_db_connection()
    if not conn:
        return None
    
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO users (name, email) VALUES (%s, %s) RETURNING user_id, name, email, created_at",
                (name, email)
            )
            user = cur.fetchone()
            conn.commit()
            return dict(user)
    except Exception as e:
        print(f"Error creating user: {e}")
        conn.rollback()
        return None
    finally:
        conn.close()

def save_symptom_input(user_id, symptom_data):
    """
    Save symptom input data to the database.
    
    Args:
        user_id (str): UUID of the user
        symptom_data (list): List of 10 symptom severity values
        
    Returns:
        dict: Symptom input data including input_id if successful, None otherwise
    """
    conn = get_db_connection()
    if not conn:
        return None
    
    try:
        # Convert symptom_data list to a JSON object with named keys
        symptom_json = {f"symptom_{i+1}": value for i, value in enumerate(symptom_data)}
        
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO symptom_inputs (user_id, symptom_data) VALUES (%s, %s) RETURNING input_id, user_id, symptom_data, submitted_at",
                (user_id, json.dumps(symptom_json))
            )
            input_data = cur.fetchone()
            conn.commit()
            return dict(input_data)
    except Exception as e:
        print(f"Error saving symptom input: {e}")
        conn.rollback()
        return None
    finally:
        conn.close()

def save_prediction(input_id, predicted_condition, confidence_score):
    """
    Save prediction results to the database.
    
    Args:
        input_id (str): UUID of the symptom input
        predicted_condition (str): Condition predicted by the AI model
        confidence_score (float): Confidence level of the prediction
        
    Returns:
        dict: Prediction data if successful, None otherwise
    """
    conn = get_db_connection()
    if not conn:
        return None
    
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO predictions (input_id, predicted_condition, confidence_score) VALUES (%s, %s, %s) RETURNING prediction_id, input_id, predicted_condition, confidence_score, created_at",
                (input_id, predicted_condition, confidence_score)
            )
            prediction = cur.fetchone()
            conn.commit()
            return dict(prediction)
    except Exception as e:
        print(f"Error saving prediction: {e}")
        conn.rollback()
        return None
    finally:
        conn.close()

def get_user_by_email(email):
    """
    Get user data by email.
    
    Args:
        email (str): User's email address
        
    Returns:
        dict: User data if found, None otherwise
    """
    conn = get_db_connection()
    if not conn:
        return None
    
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE email = %s", (email,))
            user = cur.fetchone()
            return dict(user) if user else None
    except Exception as e:
        print(f"Error getting user by email: {e}")
        return None
    finally:
        conn.close()

def get_user_history(user_id):
    """
    Get a user's symptom input and prediction history.
    
    Args:
        user_id (str): UUID of the user
        
    Returns:
        list: List of dictionaries containing symptom inputs and predictions
    """
    conn = get_db_connection()
    if not conn:
        return []
    
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT s.input_id, s.symptom_data, s.submitted_at, 
                       p.prediction_id, p.predicted_condition, p.confidence_score, p.created_at
                FROM symptom_inputs s
                LEFT JOIN predictions p ON s.input_id = p.input_id
                WHERE s.user_id = %s
                ORDER BY s.submitted_at DESC
            """, (user_id,))
            history = cur.fetchall()
            return [dict(record) for record in history]
    except Exception as e:
        print(f"Error getting user history: {e}")
        return []
    finally:
        conn.close()