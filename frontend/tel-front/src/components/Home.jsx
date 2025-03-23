import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Paper 
} from '@mui/material';
import { Link } from 'react-router-dom';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Paper 
        sx={{ 
          position: 'relative',
          backgroundColor: 'primary.main',
          color: 'white',
          mb: 4,
          py: 6,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" gutterBottom>
                AI-Powered Healthcare
              </Typography>
              <Typography variant="h5" paragraph>
                Advanced telemedicine solutions for Uganda
              </Typography>
              <Typography variant="body1" paragraph>
                Our AI-based symptom checker helps you understand your health concerns and connects you with healthcare professionals when needed.
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large" 
                component={Link} 
                to="/symptom-checker"
                sx={{ mt: 2 }}
              >
                Try Symptom Checker
              </Button>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <Box 
                component="img"
                src="https://placehold.co/600x400/1976d2/FFFFFF/png?text=Telemedicine+App"
                alt="Telemedicine illustration"
                sx={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Our Services
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
          Bringing healthcare to your fingertips with innovative technology
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <HealthAndSafetyIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  AI Symptom Analysis
                </Typography>
                <Typography>
                  Our advanced AI system analyzes your symptoms and provides preliminary assessments to help you understand potential health concerns.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <MedicalServicesIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  Virtual Consultations
                </Typography>
                <Typography>
                  Connect with healthcare professionals remotely through secure video consultations, reducing the need for in-person visits.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <AccessTimeIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  24/7 Health Support
                </Typography>
                <Typography>
                  Access healthcare information and support anytime, anywhere, making healthcare more accessible for everyone in Uganda.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      {/* Call to Action */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Ready to check your symptoms?
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Our AI-based symptom checker is designed to help you understand your health concerns better.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              component={Link} 
              to="/symptom-checker"
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;