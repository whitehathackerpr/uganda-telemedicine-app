import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  LinearProgress, 
  Button, 
  Divider,
  Paper,
  Grid
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import WarningIcon from '@mui/icons-material/Warning';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const ResultsDisplay = ({ result, onReset }) => {
  const { prediction, probability, confidence, insights } = result;
  
  // Convert probability to percentage for display
  const probabilityPercentage = Math.round(probability * 100);
  
  // Data for pie chart
  const data = [
    { name: prediction, value: probabilityPercentage },
    { name: 'Other', value: 100 - probabilityPercentage }
  ];
  
  // Colors for pie chart
  const COLORS = ['#1976d2', '#e0e0e0'];
  
  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom color="primary" align="center">
          AI Assessment Results
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Prediction: {prediction}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Confidence Level: {confidence.charAt(0).toUpperCase() + confidence.slice(1)}
              </Typography>
              
              <Box sx={{ mt: 2, mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Probability: {probabilityPercentage}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={probabilityPercentage} 
                  sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    mt: 1,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: probabilityPercentage > 70 ? '#f44336' : '#1976d2'
                    }
                  }} 
                />
              </Box>
            </Box>
            
            <Paper elevation={1} sx={{ p: 2, bgcolor: '#f5f5f5', mb: 3 }}>
              <Typography variant="body1">
                {insights}
              </Typography>
            </Paper>
            
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <WarningIcon color="warning" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                This is an AI-based preliminary assessment and not a medical diagnosis. 
                Please consult with a healthcare professional for proper medical advice.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={onReset}
            startIcon={<RestartAltIcon />}
          >
            Check Another Symptom Set
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;