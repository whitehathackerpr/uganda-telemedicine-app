# Database Setup for AI-based Symptom Checker

This directory contains the database schema and connection module for the AI-based Symptom Checker application.

## Prerequisites

- PostgreSQL 12 or higher
- Python 3.8 or higher
- psycopg2-binary package (included in requirements.txt)

## Database Setup

1. Install PostgreSQL if you haven't already:
   ```bash
   # For Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install postgresql postgresql-contrib
   
   # For macOS using Homebrew
   brew install postgresql
   ```

2. Create a new PostgreSQL database:
   ```bash
   sudo -u postgres psql
   ```

3. In the PostgreSQL shell, create a new database and user:
   ```sql
   CREATE DATABASE symptom_checker;
   CREATE USER symptom_checker_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE symptom_checker TO symptom_checker_user;
   \q
   ```

4. Run the schema.sql file to create the tables:
   ```bash
   psql -U symptom_checker_user -d symptom_checker -a -f schema.sql
   ```

## Environment Variables

The database connection uses the following environment variables:

- `DB_HOST`: PostgreSQL host (default: localhost)
- `DB_NAME`: Database name (default: symptom_checker)
- `DB_USER`: Database user (default: postgres)
- `DB_PASSWORD`: Database password (default: postgres)
- `DB_PORT`: Database port (default: 5432)

You can set these variables in a `.env` file in the backend directory:

```
DB_HOST=localhost
DB_NAME=symptom_checker
DB_USER=symptom_checker_user
DB_PASSWORD=your_password
DB_PORT=5432
```

## Database Schema

The database schema consists of three tables:

1. `users`: Stores user information
2. `symptom_inputs`: Stores user symptom data
3. `predictions`: Stores AI model predictions

See the `schema.sql` file for the complete schema definition.

## Database Functions

The `db.py` module provides functions for interacting with the database:

- `create_user(name, email)`: Create a new user
- `get_user_by_email(email)`: Get user data by email
- `save_symptom_input(user_id, symptom_data)`: Save symptom input data
- `save_prediction(input_id, predicted_condition, confidence_score)`: Save prediction results
- `get_user_history(user_id)`: Get a user's symptom input and prediction history