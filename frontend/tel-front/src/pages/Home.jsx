import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Welcome to Uganda Telemedicine App
      </Typography>
      <Typography variant="body1" gutterBottom>
        Book appointments with doctors and access healthcare anytime, anywhere.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to="/login"
        sx={{ mr: 2 }}
      >
        Login
      </Button>
      <Button 
        variant="outlined" 
        color="primary" 
        component={Link} 
        to="/signup"
      >
        Signup
      </Button>
    </Container>
  );
};

export default Home;
