// src/pages/SymptomChecker.jsx
import React, { useState, useContext } from "react";
import { Container, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState(Array(10).fill("")); // Array of 10 empty strings
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index] = value;
    setSymptoms(updatedSymptoms);
  };

  const handleSubmit = async () => {
    setError("");
    setPrediction(null);

    // Check if user is logged in
    if (!user) {
      setError("You must be logged in to use the symptom checker.");
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    // Validate input
    if (symptoms.some((symptom) => symptom === "" || isNaN(symptom))) {
      setError("Please enter valid numeric values for all symptoms.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/symptom-checker", {
        user_id: user.id,
        features: symptoms.map(Number),
      });
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to get prediction. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI-Based Symptom Checker
      </Typography>
      <Typography variant="body1" gutterBottom>
        Enter values for the following 10 symptoms (as numbers) to get an assessment.
      </Typography>

      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
      {loading && <CircularProgress sx={{ my: 2 }} />}

      {symptoms.map((symptom, index) => (
        <TextField
          key={index}
          label={`Symptom ${index + 1}`}
          type="number"
          value={symptom}
          onChange={(e) => handleInputChange(index, e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2 }}
      >
        Get Prediction
      </Button>

      {prediction !== null && (
        <Alert severity="success" sx={{ my: 2 }}>
          Prediction: {prediction.predicted_condition} (Confidence: {prediction.confidence_score.toFixed(2)})
        </Alert>
      )}
    </Container>
  );
};

export default SymptomChecker;