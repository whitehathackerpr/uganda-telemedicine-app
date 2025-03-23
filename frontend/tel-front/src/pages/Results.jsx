import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Assignment as AssignmentIcon,
  MedicalServices as MedicalServicesIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // In a real application, you would get this data from the location state
  // or from an API call based on a result ID
  const mockResults = {
    severity: 'Moderate',
    symptoms: ['Fever', 'Headache', 'Fatigue'],
    possibleConditions: [
      {
        name: 'Common Cold',
        probability: 'High',
        description: 'A viral infection of the upper respiratory tract',
      },
      {
        name: 'Influenza',
        probability: 'Medium',
        description: 'A viral infection that attacks your respiratory system',
      },
    ],
    recommendations: [
      'Rest and stay hydrated',
      'Take over-the-counter pain relievers',
      'Monitor your temperature',
      'Seek medical attention if symptoms worsen',
    ],
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'low':
        return 'success';
      case 'moderate':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'info';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Symptom Check Results
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Chip
            icon={<WarningIcon />}
            label={`Severity Level: ${mockResults.severity}`}
            color={getSeverityColor(mockResults.severity)}
            sx={{ mb: 3 }}
          />
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Symptoms */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <AssignmentIcon sx={{ mr: 1 }} />
                Reported Symptoms
              </Typography>
              <List>
                {mockResults.symptoms.map((symptom, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <InfoIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={symptom} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Possible Conditions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <HospitalIcon sx={{ mr: 1 }} />
                Possible Conditions
              </Typography>
              <List>
                {mockResults.possibleConditions.map((condition, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <MedicalServicesIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={condition.name}
                      secondary={
                        <>
                          <Chip
                            label={`Probability: ${condition.probability}`}
                            size="small"
                            sx={{ mr: 1, mt: 1 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {condition.description}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon sx={{ mr: 1 }} />
                Recommendations
              </Typography>
              <List>
                {mockResults.recommendations.map((recommendation, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <InfoIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={recommendation} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/symptom-checker')}
          startIcon={<AssignmentIcon />}
        >
          New Symptom Check
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/dashboard')}
          startIcon={<MedicalServicesIcon />}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default Results; 