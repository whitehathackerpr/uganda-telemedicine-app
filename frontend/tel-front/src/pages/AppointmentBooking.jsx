import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

const AppointmentBooking = () => {
  const [doctor, setDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleBooking = async () => {
    setError('');
    setSuccess('');
    try {
      // Prepare the data for the API call.
      const appointmentData = {
        doctor,
        date: selectedDate,
        time: selectedTime,
      };
      // Replace '/api/appointments' with your actual backend endpoint.
      const response = await axios.post('/api/appointments', appointmentData);
      setSuccess('Appointment booked successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Book an Appointment
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Doctor's Name"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Select Time"
              value={selectedTime}
              onChange={(newValue) => setSelectedTime(newValue)}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleBooking}>
            Book Appointment
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppointmentBooking;
