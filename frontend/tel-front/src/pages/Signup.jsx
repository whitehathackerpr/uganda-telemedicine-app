import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // Replace '/api/signup' with your actual API endpoint.
      const response = await axios.post('/api/signup', { name, email, password });
      // Optionally handle success, e.g., navigate to the login page
      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Signup
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          Signup
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
