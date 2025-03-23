import jwt
from datetime import datetime, timedelta
from flask import current_app

def generate_token(user_id, expires_in=24):
    """
    Generate a JWT token for user authentication.
    
    Args:
        user_id (int): The user's ID
        expires_in (int): Token expiration time in hours
        
    Returns:
        str: The generated JWT token
    """
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(hours=expires_in)
    }
    
    return jwt.encode(
        payload,
        current_app.config['JWT_SECRET_KEY'],
        algorithm='HS256'
    )

def validate_token(token):
    """
    Validate a JWT token.
    
    Args:
        token (str): The JWT token to validate
        
    Returns:
        dict: The decoded token payload if valid
        None: If token is invalid
    """
    try:
        payload = jwt.decode(
            token,
            current_app.config['JWT_SECRET_KEY'],
            algorithms=['HS256']
        )
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def format_datetime(dt):
    """
    Format a datetime object to ISO format string.
    
    Args:
        dt (datetime): The datetime object to format
        
    Returns:
        str: The formatted datetime string
    """
    if dt is None:
        return None
    return dt.isoformat()

def parse_datetime(dt_str):
    """
    Parse an ISO format datetime string to datetime object.
    
    Args:
        dt_str (str): The datetime string to parse
        
    Returns:
        datetime: The parsed datetime object
    """
    if dt_str is None:
        return None
    return datetime.fromisoformat(dt_str)

def sanitize_input(text):
    """
    Sanitize user input to prevent XSS attacks.
    
    Args:
        text (str): The text to sanitize
        
    Returns:
        str: The sanitized text
    """
    if text is None:
        return None
    # Add your sanitization logic here
    return text.strip()

def validate_email(email):
    """
    Validate email format.
    
    Args:
        email (str): The email to validate
        
    Returns:
        bool: True if email is valid, False otherwise
    """
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_phone(phone):
    """
    Validate phone number format.
    
    Args:
        phone (str): The phone number to validate
        
    Returns:
        bool: True if phone number is valid, False otherwise
    """
    import re
    pattern = r'^\+?1?\d{9,15}$'
    return bool(re.match(pattern, phone)) 