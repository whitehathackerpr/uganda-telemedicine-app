# backend/app.py
# backend/app.py
# This file is kept for backward compatibility
# It imports and uses the application factory pattern

from app import create_app

# Create the Flask application
app = create_app()

if __name__ == '__main__':
    # Run the application
    app.run(debug=True)