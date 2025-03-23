# Symptom Checker API

A Flask-based REST API for an AI-powered symptom checker application. This API provides endpoints for checking symptoms, saving prediction results, and retrieving prediction history.

## Features

- AI-powered symptom prediction using TensorFlow
- User authentication with Firebase
- PostgreSQL database integration
- Input validation with Marshmallow
- Comprehensive error handling
- Docker support for easy deployment

## API Endpoints

- `GET /api/health-check`: Simple health check endpoint
- `POST /api/symptom-checker`: Process symptom data and return prediction
- `POST /api/save-result`: Save prediction result to database (requires authentication)
- `GET /api/history`: Get prediction history for the authenticated user (requires authentication)

## Setup and Installation

### Prerequisites

- Python 3.9+
- PostgreSQL
- Firebase project (for authentication)

### Local Development

1. Clone the repository
2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Create a `.env` file based on `.env.example` and configure your environment variables
5. Run the application:
   ```
   python run.py
   ```

### Docker Deployment

1. Make sure Docker and Docker Compose are installed
2. Configure environment variables in `docker-compose.yml` or create a `.env` file
3. Build and run the containers:
   ```
   docker-compose up --build
   ```

## Testing

Run the tests using pytest:

```
pytest
```

## API Documentation

### Health Check

```
GET /api/health-check
```

Response:
```json
{
  "status": "success",
  "message": "API is running"
}
```

### Symptom Checker

```
POST /api/symptom-checker
```

Request body:
```json
{
  "features": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]
}
```

Response:
```json
{
  "status": "success",
  "prediction": 0.75,
  "confidence": 0.85
}
```

### Save Result

```
POST /api/save-result
```

Headers:
```
Authorization: Bearer <firebase-id-token>
```

Request body:
```json
{
  "features": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0],
  "prediction": 0.75,
  "confidence": 0.85
}
```

Response:
```json
{
  "status": "success",
  "message": "Prediction result saved successfully",
  "id": 1
}
```

### Get History

```
GET /api/history?page=1&per_page=10
```

Headers:
```
Authorization: Bearer <firebase-id-token>
```

Response:
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "user_id": "user123",
      "features": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0],
      "prediction": 0.75,
      "confidence": 0.85,
      "created_at": "2023-09-01T12:00:00"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 1,
    "pages": 1
  }
}
```