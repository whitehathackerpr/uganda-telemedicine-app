import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
  Divider,
  Tabs,
  Tab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  LocalHospital as HospitalIcon,
  History as HistoryIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  VideoCall as VideoCallIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { consultationService } from '../services/api';

const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [consultations, setConsultations] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    date_of_birth: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [consultationsResponse, medicalHistoryResponse] = await Promise.all([
        consultationService.getMyConsultations(),
        consultationService.getMedicalHistory(),
      ]);
      setConsultations(consultationsResponse.data.consultations);
      setMedicalHistory(medicalHistoryResponse.data.medical_history);
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        date_of_birth: user.date_of_birth || '',
      });
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateProfile(formData);
      setEditMode(false);
      setSuccess('Profile updated successfully');
    } catch (error) {
      setError('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMedicalHistory = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitMedicalHistory = async () => {
    try {
      await consultationService.addMedicalHistory(formData);
      fetchData();
      handleCloseDialog();
      setSuccess('Medical history added successfully');
    } catch (error) {
      setError('Failed to add medical history');
      console.error('Error adding medical history:', error);
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
        {/* Profile Information */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">Profile Information</Typography>
                {!editMode ? (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={handleEditClick}
                    size="small"
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    startIcon={<SaveIcon />}
                    onClick={handleSaveClick}
                    color="primary"
                    size="small"
                  >
                    Save
                  </Button>
                )}
              </Box>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  {editMode ? (
                    <TextField
                      fullWidth
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      size="small"
                    />
                  ) : (
                    <ListItemText
                      primary="Name"
                      secondary={`${user.first_name} ${user.last_name}`}
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  {editMode ? (
                    <TextField
                      fullWidth
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      size="small"
                    />
                  ) : (
                    <ListItemText primary="Email" secondary={user.email} />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  {editMode ? (
                    <TextField
                      fullWidth
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      size="small"
                    />
                  ) : (
                    <ListItemText primary="Phone" secondary={user.phone || 'Not set'} />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon />
                  </ListItemIcon>
                  {editMode ? (
                    <TextField
                      fullWidth
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      size="small"
                    />
                  ) : (
                    <ListItemText primary="Address" secondary={user.address || 'Not set'} />
                  )}
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
                <Tab label="Consultations" />
                <Tab label="Medical History" />
                <Tab label="Prescriptions" />
              </Tabs>

              {tabValue === 0 && (
                <Box>
                  <List>
                    {consultations.map((consultation) => (
                      <ListItem key={consultation.id} divider>
                        <ListItemIcon>
                          <VideoCallIcon />
                        </ListItemIcon>
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
                        <Chip
                          label={consultation.status}
                          color={
                            consultation.status === 'scheduled'
                              ? 'primary'
                              : consultation.status === 'completed'
                              ? 'success'
                              : 'error'
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Medical History</Typography>
                    <Button
                      variant="contained"
                      startIcon={<HospitalIcon />}
                      onClick={handleAddMedicalHistory}
                    >
                      Add Record
                    </Button>
                  </Box>
                  <List>
                    {medicalHistory.map((record, index) => (
                      <ListItem key={index} divider>
                        <ListItemIcon>
                          <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={record.condition}
                          secondary={
                            <>
                              <Typography variant="body2">
                                {record.diagnosis_date}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {record.treatment}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {tabValue === 2 && (
                <Box>
                  <Typography variant="h6">Prescriptions</Typography>
                  <List>
                    {consultations
                      .filter((c) => c.prescription)
                      .map((consultation) => (
                        <ListItem key={consultation.id} divider>
                          <ListItemIcon>
                            <HospitalIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={`Prescription from Dr. ${consultation.doctor.user.first_name} ${consultation.doctor.user.last_name}`}
                            secondary={
                              <>
                                <Typography variant="body2">
                                  {new Date(consultation.datetime).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {consultation.prescription.medications.join(', ')}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      ))}
                  </List>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Medical History Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Medical History Record</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Condition"
              name="condition"
              value={formData.condition || ''}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Diagnosis Date"
              name="diagnosis_date"
              type="date"
              value={formData.diagnosis_date || ''}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Treatment"
              name="treatment"
              value={formData.treatment || ''}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitMedicalHistory} variant="contained">
            Add Record
          </Button>
        </DialogActions>
      </Dialog>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}
    </Container>
  );
};

export default UserProfile; 