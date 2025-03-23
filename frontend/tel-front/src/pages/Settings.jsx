import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Chip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Palette as ThemeIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
  Backup as BackupIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Message as MessageIcon,
  CalendarToday as CalendarIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: true,
      push: true,
      appointmentReminders: true,
      consultationUpdates: true,
      marketingEmails: false,
    },
    preferences: {
      language: 'en',
      theme: 'light',
      fontSize: 14,
      timezone: 'UTC',
    },
    privacy: {
      profileVisibility: 'public',
      medicalHistoryAccess: 'private',
      showOnlineStatus: true,
    },
    data: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: 30,
    },
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType('');
  };

  const handleSettingChange = (category, setting) => (event) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      },
    }));
  };

  const handleSaveSettings = async () => {
    try {
      // TODO: Implement API call to save settings
      setSuccess('Settings saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save settings. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const renderNotificationSettings = () => (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <NotificationsIcon /> Notification Settings
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText
            primary="Email Notifications"
            secondary="Receive notifications via email"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={settings.notifications.email}
              onChange={handleSettingChange('notifications', 'email')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText
            primary="SMS Notifications"
            secondary="Receive notifications via SMS"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={settings.notifications.sms}
              onChange={handleSettingChange('notifications', 'sms')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText
            primary="Push Notifications"
            secondary="Receive push notifications"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={settings.notifications.push}
              onChange={handleSettingChange('notifications', 'push')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <CalendarIcon />
          </ListItemIcon>
          <ListItemText
            primary="Appointment Reminders"
            secondary="Get reminded about upcoming appointments"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={settings.notifications.appointmentReminders}
              onChange={handleSettingChange('notifications', 'appointmentReminders')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText
            primary="Consultation Updates"
            secondary="Receive updates about your consultations"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={settings.notifications.consultationUpdates}
              onChange={handleSettingChange('notifications', 'consultationUpdates')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText
            primary="Marketing Emails"
            secondary="Receive marketing and promotional emails"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={settings.notifications.marketingEmails}
              onChange={handleSettingChange('notifications', 'marketingEmails')}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  );

  const renderPreferencesSettings = () => (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ThemeIcon /> Preferences
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText
            primary="Language"
            secondary="Select your preferred language"
          />
          <ListItemSecondaryAction>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={settings.preferences.language}
                onChange={handleSettingChange('preferences', 'language')}
                size="small"
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="de">German</MenuItem>
                <MenuItem value="it">Italian</MenuItem>
              </Select>
            </FormControl>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ThemeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Theme"
            secondary="Choose your preferred theme"
          />
          <ListItemSecondaryAction>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={settings.preferences.theme}
                onChange={handleSettingChange('preferences', 'theme')}
                size="small"
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="system">System</MenuItem>
              </Select>
            </FormControl>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ThemeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Font Size"
            secondary="Adjust the text size"
          />
          <ListItemSecondaryAction>
            <Slider
              value={settings.preferences.fontSize}
              onChange={(_, value) => handleSettingChange('preferences', 'fontSize')({ target: { value } })}
              min={12}
              max={18}
              step={1}
              marks
              valueLabelDisplay="auto"
              sx={{ width: 150 }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  );

  const renderPrivacySettings = () => (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SecurityIcon /> Privacy Settings
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText
            primary="Profile Visibility"
            secondary="Control who can see your profile"
          />
          <ListItemSecondaryAction>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={settings.privacy.profileVisibility}
                onChange={handleSettingChange('privacy', 'profileVisibility')}
                size="small"
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="friends">Friends Only</MenuItem>
              </Select>
            </FormControl>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText
            primary="Medical History Access"
            secondary="Control access to your medical records"
          />
          <ListItemSecondaryAction>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={settings.privacy.medicalHistoryAccess}
                onChange={handleSettingChange('privacy', 'medicalHistoryAccess')}
                size="small"
              >
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="doctors">Doctors Only</MenuItem>
                <MenuItem value="family">Family Members</MenuItem>
              </Select>
            </FormControl>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText
            primary="Show Online Status"
            secondary="Display your online status to others"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={settings.privacy.showOnlineStatus}
              onChange={handleSettingChange('privacy', 'showOnlineStatus')}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  );

  const renderDataSettings = () => (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <StorageIcon /> Data Management
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <BackupIcon />
          </ListItemIcon>
          <ListItemText
            primary="Auto Backup"
            secondary="Automatically backup your data"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={settings.data.autoBackup}
              onChange={handleSettingChange('data', 'autoBackup')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BackupIcon />
          </ListItemIcon>
          <ListItemText
            primary="Backup Frequency"
            secondary="How often to backup your data"
          />
          <ListItemSecondaryAction>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={settings.data.backupFrequency}
                onChange={handleSettingChange('data', 'backupFrequency')}
                size="small"
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText
            primary="Data Retention"
            secondary="How long to keep backup data"
          />
          <ListItemSecondaryAction>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={settings.data.retentionPeriod}
                onChange={handleSettingChange('data', 'retentionPeriod')}
                size="small"
              >
                <MenuItem value={7}>7 days</MenuItem>
                <MenuItem value={30}>30 days</MenuItem>
                <MenuItem value={90}>90 days</MenuItem>
                <MenuItem value={365}>1 year</MenuItem>
              </Select>
            </FormControl>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          <ListItemText
            primary="Delete Account"
            secondary="Permanently delete your account and all data"
          />
          <ListItemSecondaryAction>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleOpenDialog('deleteAccount')}
            >
              Delete Account
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  );

  return (
    <Box>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Settings
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
        >
          Save Changes
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {renderNotificationSettings()}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderPreferencesSettings()}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderPrivacySettings()}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderDataSettings()}
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
          <TextField
            fullWidth
            label="Enter your password to confirm"
            type="password"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button color="error" variant="contained">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings; 