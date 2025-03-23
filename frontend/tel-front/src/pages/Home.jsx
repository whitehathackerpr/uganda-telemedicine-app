import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  MedicalServices,
  Speed,
  Security,
  Accessibility,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <MedicalServices sx={{ fontSize: 40 }} />,
    title: 'AI-Powered Diagnosis',
    description: 'Get instant preliminary health assessments using advanced AI technology.',
  },
  {
    icon: <Speed sx={{ fontSize: 40 }} />,
    title: 'Quick & Efficient',
    description: 'Save time with our streamlined symptom checking process.',
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Secure & Private',
    description: 'Your health information is protected with enterprise-grade security.',
  },
  {
    icon: <Accessibility sx={{ fontSize: 40 }} />,
    title: 'Accessible Anywhere',
    description: 'Get medical guidance from the comfort of your home.',
  },
];

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Your Health, Our Priority
              </Typography>
              <Typography variant="h5" sx={{ mb: 4 }}>
                Get instant preliminary health assessments using AI technology
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.grey[100],
                  },
                }}
                onClick={() => navigate('/symptom-checker')}
              >
                Start Symptom Check
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/hero-image.svg"
                alt="Healthcare illustration"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  display: { xs: 'none', md: 'block' },
                  mx: 'auto',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Introduction Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom align="center">
          How It Works
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
        >
          Our AI-powered symptom checker helps you understand potential health conditions
          based on your symptoms. While this tool provides preliminary information,
          it's important to consult with healthcare professionals for proper diagnosis
          and treatment.
        </Typography>

        {/* Features Grid */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.grey[100],
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Ready to Get Started?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 4 }}
          >
            Take the first step towards better health understanding with our
            AI-powered symptom checker.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/symptom-checker')}
            >
              Start Your Health Assessment
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
