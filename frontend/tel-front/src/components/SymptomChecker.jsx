import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Slider, 
  Button, 
  Box, 
  Grid, 
  Paper, 
  CircularProgress,
  Fade,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ResultsDisplay from './ResultsDisplay';

const symptoms = [
  { id: 'fever', name: 'Fever' },
  { id: 'cough', name: 'Cough' },
  { id: 'fatigue', name: 'Fatigue' },
  { id: 'difficultyBreathing', name: 'Difficulty Breathing' },
  { id: 'headache', name: 'Headache' },
  { id: 'soreThroat', name: 'Sore Throat' },
  { id: 'bodyAches', name: 'Body Aches' },
  { id: 'nausea', name: 'Nausea' },
  { id: 'diarrhea', name: 'Diarrhea' },
  { id: 'lossOfTasteSmell', name: 'Loss of Taste/Smell' }
];

const initialSymptomValues = symptoms.reduce((acc, symptom) => {
  acc[symptom.id] = 0;
  return acc;
}, {});

const SymptomChecker = () => {
  const [symptomValues, setSymptomValues] = useState(initialSymptomValues);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleSliderChange = (symptomId) => (event, newValue) => {
    setSymptomValues({
      ...symptomValues,
      [symptomId]: newValue
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock prediction result
      const mockResult = {
        prediction: 'Influenza',
        probability: 0.75,
        confidence: 'high',
        insights: 'Based on your symptoms, there is a 75% chance of Influenza. Your fever, cough, and fatigue are typical indicators.'
      };
      
      setPredictionResult(mockResult);
      setIsLoading(false);
      setShowResults(true);
    }, 2000);
    
    // In a real application, you would make an API call to your backend:
    /*
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(symptomValues),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      setPredictionResult(result);
      setIsLoading(false);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      // Handle error state
    }
    */
  };

  const handleReset = () => {
    setSymptomValues(initialSymptomValues);
    setShowResults(false);
    setPredictionResult(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom color="primary" align="center">
            AI-Based Symptom Checker
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Use the sliders below to indicate the severity of your symptoms from 0 (none) to 10 (severe).
            Our AI will analyze your symptoms and provide a preliminary assessment.
          </Typography>
          <Divider sx={{ my: 2 }} />
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {symptoms.map((symptom) => (
                <Grid item xs={12} key={symptom.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography id={`${symptom.id}-slider`} sx={{ width: '30%', mr: 2 }}>
                      {symptom.name}:
                    </Typography>
                    <Slider
                      value={symptomValues[symptom.id]}
                      onChange={handleSliderChange(symptom.id)}
                      aria-labelledby={`${symptom.id}-slider`}
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={0}
                      max={10}
                      sx={{ flex: 1 }}
                    />
                    <Typography sx={{ width: '10%', textAlign: 'center', ml: 2 }}>
                      {symptomValues[symptom.id]}
                    </Typography>
                  </Box>
                </Grid>
              ))}
              
              <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  sx={{ mr: 2 }}
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
                </Button>
                
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={handleReset}
                  startIcon={<RestartAltIcon />}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      
      <Fade in={showResults}>
        <div>
          {showResults && predictionResult && (
            <ResultsDisplay result={predictionResult} onReset={handleReset} />
          )}
        </div>
      </Fade>
    </Container>
  );
};

export default SymptomChecker;