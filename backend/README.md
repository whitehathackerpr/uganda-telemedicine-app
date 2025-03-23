# Telemedicine App Backend

This is the backend service for the telemedicine application, built with Flask and PostgreSQL.

## Features

- User authentication and authorization
- Symptom checking with AI model integration
- Video consultations using Twilio
- Prescription management
- Admin panel for managing users and doctors
- RESTful API endpoints
- JWT-based authentication
- CORS support
- Database migrations

## Prerequisites

- Python 3.8 or higher
- PostgreSQL
- Twilio account (for video consultations)
- TensorFlow (for AI model)

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory with the following variables:
```
FLASK_APP=run.py
FLASK_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET_KEY=your-secret-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_API_KEY=your-twilio-api-key
TWILIO_API_SECRET=your-twilio-api-secret
MODEL_PATH=path/to/your/model
```

4. Create the database:
```bash
createdb dbname
```

5. Initialize the database:
```bash
flask db init
flask db migrate
flask db upgrade
```

## Running the Application

1. Start the development server:
```bash
python run.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update current user

### Symptom Checker
- `POST /api/symptoms/check` - Check symptoms
- `GET /api/symptoms/history` - Get symptom check history
- `GET /api/symptoms/<id>` - Get specific symptom check

### Consultations
- `GET /api/consultations/doctors` - Get available doctors
- `POST /api/consultations/book` - Book a consultation
- `GET /api/consultations/my-consultations` - Get user's consultations
- `GET /api/consultations/<id>` - Get specific consultation
- `POST /api/consultations/<id>/join` - Join a consultation
- `POST /api/consultations/<id>/complete` - Complete a consultation

### Prescriptions
- `POST /api/prescriptions/create` - Create a prescription
- `GET /api/prescriptions/my-prescriptions` - Get user's prescriptions
- `GET /api/prescriptions/<id>` - Get specific prescription
- `PUT /api/prescriptions/<id>` - Update a prescription

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/<id>` - Get specific user
- `PUT /api/admin/users/<id>` - Update user
- `GET /api/admin/doctors` - Get all doctors
- `POST /api/admin/doctors` - Create doctor
- `GET /api/admin/doctors/<id>` - Get specific doctor
- `PUT /api/admin/doctors/<id>` - Update doctor
- `DELETE /api/admin/doctors/<id>` - Delete doctor

## Testing

Run the test suite:
```bash
pytest
```

## Development

1. Format code:
```bash
black .
```

2. Check code style:
```bash
flake8
```

## Security Considerations

- All endpoints except registration and login require JWT authentication
- Passwords are hashed using Werkzeug's security functions
- CORS is configured to allow only specific origins
- Input validation and sanitization is performed
- Admin routes are protected with an additional decorator

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 