-- Database schema for AI-based Symptom Checker application

-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table to store user information
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Symptom inputs table to store user symptom data
CREATE TABLE symptom_inputs (
    input_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    symptom_data JSONB NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- Predictions table to store AI model predictions
CREATE TABLE predictions (
    prediction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    input_id UUID NOT NULL,
    predicted_condition VARCHAR(255) NOT NULL,
    confidence_score FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (input_id) REFERENCES symptom_inputs (input_id) ON DELETE CASCADE
);

-- Indexes for optimization
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_symptom_inputs_user_id ON symptom_inputs (user_id);
CREATE INDEX idx_predictions_input_id ON predictions (input_id);