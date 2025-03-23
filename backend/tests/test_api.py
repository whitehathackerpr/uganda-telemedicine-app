import json
import pytest
from app import create_app, db

@pytest.fixture
def client():
    """Create a test client for the app."""
    app = create_app('testing')
    
    # Create a test client using the Flask application
    with app.test_client() as client:
        # Establish an application context
        with app.app_context():
            # Create the database and the database tables
            db.create_all()
            yield client
            # Drop the database tables
            db.session.remove()
            db.drop_all()

def test_health_check(client):
    """Test the health check endpoint."""
    response = client.get('/api/health-check')
    data = json.loads(response.data)
    
    assert response.status_code == 200
    assert data['status'] == 'success'
    assert data['message'] == 'API is running'

def test_symptom_checker(client):
    """Test the symptom checker endpoint."""
    # Test with valid input
    features = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]
    response = client.post(
        '/api/symptom-checker',
        data=json.dumps({'features': features}),
        content_type='application/json'
    )
    data = json.loads(response.data)
    
    assert response.status_code == 200
    assert data['status'] == 'success'
    assert 'prediction' in data
    assert 'confidence' in data
    
    # Test with invalid input (wrong number of features)
    features = [1.0, 2.0, 3.0]
    response = client.post(
        '/api/symptom-checker',
        data=json.dumps({'features': features}),
        content_type='application/json'
    )
    data = json.loads(response.data)
    
    assert response.status_code == 400
    assert data['status'] == 'error'