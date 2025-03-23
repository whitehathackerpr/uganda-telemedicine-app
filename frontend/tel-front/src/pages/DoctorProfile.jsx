import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
  Rating,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Star as StarIcon,
  LocalHospital as HospitalIcon,
  Language as LanguageIcon,
  VideoCall as VideoCallIcon,
} from '@mui/icons-material';
import { consultationService } from '../services/api';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    fetchDoctorData();
  }, [id]);

  const fetchDoctorData = async () => {
    try {
      const response = await consultationService.getDoctorProfile(id);
      setDoctor(response.data.doctor);
      setAvailability(response.data.availability || []);
    } catch (error) {
      setError('Failed to fetch doctor information');
      console.error('Error fetching doctor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBookConsultation = () => {
    navigate('/consultations', { state: { doctorId: id } });
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

  if (!doctor) {
    return (
      <Container>
        <Alert severity="error">Doctor not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Doctor Information */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h5">
                    Dr. {doctor.user.first_name} {doctor.user.last_name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {doctor.specialization}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={doctor.rating || 0} readOnly precision={0.5} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({doctor.review_count || 0} reviews)
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                startIcon={<VideoCallIcon />}
                onClick={handleBookConsultation}
                sx={{ mb: 2 }}
              >
                Book Consultation
              </Button>
              <Divider sx={{ my: 2 }} />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Education"
                    secondary={doctor.education}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Experience"
                    secondary={`${doctor.years_of_experience} years`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Languages"
                    secondary={doctor.languages.join(', ')}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Detailed Information */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="About" />
                <Tab label="Availability" />
                <Tab label="Reviews" />
              </Tabs>

              {tabValue === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    About
                  </Typography>
                  <Typography paragraph>{doctor.bio}</Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Specializations
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {doctor.specializations.map((spec, index) => (
                      <Chip key={index} label={spec} />
                    ))}
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Certifications
                  </Typography>
                  <List>
                    {doctor.certifications.map((cert, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <HospitalIcon />
                        </ListItemIcon>
                        <ListItemText primary={cert} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Available Time Slots
                  </Typography>
                  <Grid container spacing={2}>
                    {availability.map((slot, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <CalendarIcon sx={{ mb: 1 }} />
                          <Typography variant="subtitle1">
                            {new Date(slot.date).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {slot.start_time} - {slot.end_time}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {tabValue === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Patient Reviews
                  </Typography>
                  {doctor.reviews?.map((review, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating value={review.rating} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {new Date(review.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body1">{review.comment}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default DoctorProfile; 