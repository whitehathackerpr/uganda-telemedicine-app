// src/pages/SymptomChecker.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const symptoms = [
  {
    name: 'fever',
    label: 'Fever',
    type: 'slider',
    description: 'How high is your fever?',
    marks: [
      { value: 0, label: 'None' },
      { value: 1, label: 'Mild' },
      { value: 2, label: 'Moderate' },
      { value: 3, label: 'High' },
      { value: 4, label: 'Very High' },
    ],
  },
  {
    name: 'headache',
    label: 'Headache',
    type: 'slider',
    description: 'How severe is your headache?',
    marks: [
      { value: 0, label: 'None' },
      { value: 1, label: 'Mild' },
      { value: 2, label: 'Moderate' },
      { value: 3, label: 'Severe' },
      { value: 4, label: 'Very Severe' },
    ],
  },
  {
    name: 'cough',
    label: 'Cough',
    type: 'select',
    description: 'What type of cough do you have?',
    options: [
      { value: 'none', label: 'None' },
      { value: 'dry', label: 'Dry Cough' },
      { value: 'wet', label: 'Wet Cough' },
      { value: 'productive', label: 'Productive Cough' },
    ],
  },
  {
    name: 'fatigue',
    label: 'Fatigue',
    type: 'slider',
    description: 'How tired are you feeling?',
    marks: [
      { value: 0, label: 'None' },
      { value: 1, label: 'Mild' },
      { value: 2, label: 'Moderate' },
      { value: 3, label: 'Severe' },
      { value: 4, label: 'Very Severe' },
    ],
  },
  {
    name: 'bodyPain',
    label: 'Body Pain',
    type: 'slider',
    description: 'How severe is your body pain?',
    marks: [
      { value: 0, label: 'None' },
      { value: 1, label: 'Mild' },
      { value: 2, label: 'Moderate' },
      { value: 3, label: 'Severe' },
      { value: 4, label: 'Very Severe' },
    ],
  },
];

const steps = ['Symptoms', 'Additional Information', 'Results'];

const SymptomChecker = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/symptom-checker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setPrediction(data);
      handleNext();
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={4}>
            {symptoms.map((symptom) => (
              <Grid item xs={12} md={6} key={symptom.name}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {symptom.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {symptom.description}
                    </Typography>
                    {symptom.type === 'slider' ? (
                      <Slider
                        value={formData[symptom.name] || 0}
                        onChange={(_, value) => handleInputChange(symptom.name, value)}
                        step={1}
                        marks={symptom.marks}
                        valueLabelDisplay="auto"
                        min={0}
                        max={4}
                        sx={{ mt: 2 }}
                      />
                    ) : (
                      <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>{symptom.label}</InputLabel>
                        <Select
                          value={formData[symptom.name] || ''}
                          onChange={(e) => handleInputChange(symptom.name, e.target.value)}
                          label={symptom.label}
                        >
                          {symptom.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );
      case 1:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Additional Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={formData.gender || ''}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      label="Gender"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Additional Notes"
                    value={formData.notes || ''}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent>
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : prediction ? (
                <>
                  <Typography variant="h5" gutterBottom>
                    Prediction Results
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Based on your symptoms, the AI model predicts:
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {prediction.condition}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Confidence: {prediction.confidence}%
                  </Typography>
                  <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                    Recommendations:
                  </Typography>
                  <ul>
                    {prediction.recommendations.map((rec, index) => (
                      <li key={index}>
                        <Typography variant="body2">{rec}</Typography>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Symptom Checker
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent(activeStep)}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? () => navigate('/') : handleSubmit}
          disabled={loading}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
};

export default SymptomChecker;