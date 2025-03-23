import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Link,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  VideoCall as VideoCallIcon,
  HealthAndSafety as HealthIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

const features = [
  {
    icon: <HospitalIcon sx={{ fontSize: 40 }} />,
    title: 'AI-Powered Symptom Checker',
    description:
      'Get instant preliminary diagnoses using our advanced AI technology.',
  },
  {
    icon: <VideoCallIcon sx={{ fontSize: 40 }} />,
    title: 'Video Consultations',
    description:
      'Connect with healthcare professionals from the comfort of your home.',
  },
  {
    icon: <HealthIcon sx={{ fontSize: 40 }} />,
    title: 'Comprehensive Healthcare',
    description:
      'Access a wide range of medical services and expert healthcare providers.',
  },
  {
    icon: <TimeIcon sx={{ fontSize: 40 }} />,
    title: '24/7 Access',
    description:
      'Get medical assistance whenever you need it, day or night.',
  },
];

const Landing = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Healthcare at Your Fingertips
              </Typography>
              <Typography variant="h5" sx={{ mb: 4 }}>
                Access quality healthcare services from anywhere in Uganda
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  Get Started
                </Button>
                <Button
                  component={RouterLink}
                  to="/about"
                  variant="outlined"
                  color="inherit"
                  size="large"
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="400"
                image="/images/hero-image.jpg"
                alt="Telemedicine"
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Why Choose Our Platform?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md">
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Ready to Get Started?
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Join thousands of patients who have already experienced the
                convenience of telemedicine.
              </Typography>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="primary"
                size="large"
              >
                Create Your Account
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">
                Email: support@telemedicine.ug
                <br />
                Phone: +256 123 456 789
                <br />
                Address: Kampala, Uganda
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link
                  component={RouterLink}
                  to="/about"
                  color="inherit"
                  underline="hover"
                >
                  About Us
                </Link>
                <Link
                  component={RouterLink}
                  to="/contact"
                  color="inherit"
                  underline="hover"
                >
                  Contact
                </Link>
                <Link
                  component={RouterLink}
                  to="/login"
                  color="inherit"
                  underline="hover"
                >
                  Login
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Typography variant="body2">
                Stay connected with us on social media for the latest updates and
                health tips.
              </Typography>
              <Box sx={{ mt: 2 }}>
                {/* Add social media icons/links here */}
              </Box>
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'rgba(255,255,255,0.1)' }}
          >
            © {new Date().getFullYear()} Telemedicine Uganda. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing; 