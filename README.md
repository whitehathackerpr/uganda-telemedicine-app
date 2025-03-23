# Uganda Telemedicine App

Telemedicine and Health Consultation App with AI-based Symptom Checker

## Project Structure

- **frontend/**: Contains the frontend code for the web application
- **backend/**: Contains the Flask backend API
  - **database/**: Contains the PostgreSQL database schema and connection module
- **ai-module/**: Contains the AI model for symptom checking

## Features

- AI-based symptom checker that predicts potential health conditions
- User registration and authentication
- Storage of symptom inputs and prediction results
- User history tracking

## Backend Setup

1. Install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Set up the PostgreSQL database:
   - Follow the instructions in `backend/database/README.md`

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. Run the Flask application:
   ```bash
   python app.py
   ```

## API Endpoints

- **POST /api/users**: Register a new user
- **POST /api/users/login**: Login a user by email
- **POST /api/symptom-checker**: Process symptom data and return prediction
- **GET /api/users/{user_id}/history**: Get a user's symptom input and prediction history

## Database Schema

The application uses a PostgreSQL database with the following tables:

1. **users**: Stores user information
2. **symptom_inputs**: Stores user symptom data
3. **predictions**: Stores AI model predictions

For more details, see `backend/database/schema.sql`.