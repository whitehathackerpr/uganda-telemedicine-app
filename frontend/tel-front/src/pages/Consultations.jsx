import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  VideoCall as VideoCallIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { consultationService } from '../services/api';

const Consultations = () => {
  const [doctors, setDoctors] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [doctorsResponse, consultationsResponse] = await Promise.all([
        consultationService.getDoctors(),
        consultationService.getMyConsultations(),
      ]);
      setDoctors(doctorsResponse.data.doctors);
      setConsultations(consultationsResponse.data.consultations);
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      date: '',
      time: '',
      reason: '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDoctor(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await consultationService.bookConsultation({
        doctor_id: selectedDoctor.id,
        datetime: `${formData.date}T${formData.time}`,
        reason: formData.reason,
      });
      fetchData();
      handleCloseDialog();
    } catch (error) {
      setError('Failed to book consultation');
      console.error('Error booking consultation:', error);
    }
  };

  const handleJoinConsultation = async (consultationId) => {
    try {
      const response = await consultationService.joinConsultation(consultationId);
      // Handle video call initialization here
      console.log('Video call data:', response.data);
    } catch (error) {
      setError('Failed to join consultation');
      console.error('Error joining consultation:', error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Available Doctors */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Available Doctors
              </Typography>
              <Grid container spacing={2}>
                {doctors.map((doctor) => (
                  <Grid item xs={12} sm={6} key={doctor.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <PersonIcon sx={{ mr: 1 }} />
                          <Typography variant="h6">
                            Dr. {doctor.user.first_name} {doctor.user.last_name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {doctor.specialization}
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<CalendarIcon />}
                          onClick={() => handleOpenDialog(doctor)}
                          fullWidth
                        >
                          Book Consultation
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* My Consultations */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                My Consultations
              </Typography>
              {consultations.length > 0 ? (
                <List>
                  {consultations.map((consultation) => (
                    <ListItem key={consultation.id} divider>
                      <ListItemText
                        primary={`Dr. ${consultation.doctor.user.first_name} ${consultation.doctor.user.last_name}`}
                        secondary={
                          <>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarIcon sx={{ mr: 1, fontSize: 16 }} />
                              {new Date(consultation.datetime).toLocaleDateString()}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <TimeIcon sx={{ mr: 1, fontSize: 16 }} />
                              {new Date(consultation.datetime).toLocaleTimeString()}
                            </Box>
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        {consultation.status === 'scheduled' && (
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<VideoCallIcon />}
                            onClick={() => handleJoinConsultation(consultation.id)}
                          >
                            Join
                          </Button>
                        )}
                        <Chip
                          label={consultation.status}
                          color={
                            consultation.status === 'scheduled'
                              ? 'primary'
                              : consultation.status === 'completed'
                              ? 'success'
                              : 'error'
                          }
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary">
                  No consultations scheduled
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Booking Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Book Consultation with Dr. {selectedDoctor?.user.first_name}{' '}
          {selectedDoctor?.user.last_name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Reason for Consultation"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.date || !formData.time || !formData.reason}
          >
            Book
          </Button>
        </DialogActions>
      </Dialog>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default Consultations; 