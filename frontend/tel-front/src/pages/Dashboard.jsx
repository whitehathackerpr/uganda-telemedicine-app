import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Button,
  Chip,
} from '@mui/material';
import {
  LocalHospital as DoctorIcon,
  EventNote as ConsultationIcon,
  Assessment as AssessmentIcon,
  CalendarToday as CalendarIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { consultationService, symptomService } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState([]);
  const [symptomChecks, setSymptomChecks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [consultationsResponse, symptomChecksResponse] = await Promise.all([
        consultationService.getMyConsultations(),
        symptomService.getHistory(),
      ]);
      setConsultations(consultationsResponse.data.consultations);
      setSymptomChecks(symptomChecksResponse.data.symptom_checks);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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

  const upcomingConsultations = consultations.filter(
    (consultation) =>
      consultation.status === 'scheduled' &&
      new Date(consultation.datetime) > new Date()
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Welcome to Your Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Here's an overview of your health journey
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <List>
                <ListItem
                  button
                  onClick={() => navigate('/dashboard/symptoms')}
                >
                  <ListItemIcon>
                    <AssessmentIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Check Symptoms" />
                  <ArrowForwardIcon />
                </ListItem>
                <ListItem
                  button
                  onClick={() => navigate('/dashboard/consultations')}
                >
                  <ListItemIcon>
                    <ConsultationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Book Consultation" />
                  <ArrowForwardIcon />
                </ListItem>
                <ListItem button onClick={() => navigate('/dashboard/doctors')}>
                  <ListItemIcon>
                    <DoctorIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Find Doctors" />
                  <ArrowForwardIcon />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Consultations */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6">Upcoming Consultations</Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/dashboard/consultations')}
                >
                  View All
                </Button>
              </Box>
              {upcomingConsultations.length > 0 ? (
                <List>
                  {upcomingConsultations.map((consultation) => (
                    <React.Fragment key={consultation.id}>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Dr. ${consultation.doctor.user.first_name} ${consultation.doctor.user.last_name}`}
                          secondary={new Date(
                            consultation.datetime
                          ).toLocaleString()}
                        />
                        <Chip
                          label={consultation.status}
                          color="primary"
                          size="small"
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary">
                  No upcoming consultations
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Symptom Checks */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6">Recent Symptom Checks</Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/dashboard/symptoms')}
                >
                  View All
                </Button>
              </Box>
              {symptomChecks.length > 0 ? (
                <List>
                  {symptomChecks.slice(0, 5).map((check) => (
                    <React.Fragment key={check.id}>
                      <ListItem>
                        <ListItemIcon>
                          <AssessmentIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={check.prediction}
                          secondary={new Date(check.created_at).toLocaleString()}
                        />
                        <Chip
                          label={`${(check.confidence_score * 100).toFixed(1)}%`}
                          color="secondary"
                          size="small"
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary">
                  No recent symptom checks
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 