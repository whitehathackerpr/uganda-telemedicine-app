from app import create_app
from app.utils.db_init import init_db

app = create_app()

if __name__ == '__main__':
    # Initialize database
    with app.app_context():
        init_db()
    
    # Run the application
    app.run(debug=True, host='0.0.0.0', port=5000) 