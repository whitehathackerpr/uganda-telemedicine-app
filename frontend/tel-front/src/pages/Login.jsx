import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Replace '/api/login' with your actual API endpoint.
      const response = await axios.post('/api/login', { email, password });
      // Assuming the API returns an auth token
      localStorage.setItem('token', response.data.token);
      // Navigate to the home page or dashboard after successful login.
      navigate('/');
    } catch (err) {
      // Capture and display any error messages.
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
