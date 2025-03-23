import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  Alert,
  CircularProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Videocam as VideoIcon,
  VideocamOff as VideoOffIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Send as SendIcon,
  AttachFile as AttachIcon,
  Image as ImageIcon,
  Description as DescriptionIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { consultationService } from '../services/api';

const Consultation = () => {
  const { id } = useParams();
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [openNotes, setOpenNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    fetchConsultation();
  }, [id]);

  const fetchConsultation = async () => {
    try {
      const response = await consultationService.getConsultation(id);
      setConsultation(response.data.consultation);
      setMessages(response.data.messages || []);
      setNotes(response.data.consultation.notes || '');
      setDiagnosis(response.data.consultation.diagnosis || '');
      setPrescription(response.data.consultation.prescription || '');
    } catch (err) {
      setError('Failed to fetch consultation details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const response = await consultationService.sendMessage(id, {
        content: message,
        type: 'text',
      });
      setMessages([...messages, response.data.message]);
      setMessage('');
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  const handleSaveNotes = async () => {
    try {
      await consultationService.updateConsultation(id, {
        notes,
        diagnosis,
        prescription,
      });
      setOpenNotes(false);
    } catch (err) {
      setError('Failed to save notes. Please try again.');
    }
  };

  const handleEndConsultation = async () => {
    if (window.confirm('Are you sure you want to end this consultation?')) {
      try {
        await consultationService.endConsultation(id);
        // Redirect to consultations list or dashboard
      } catch (err) {
        setError('Failed to end consultation. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2} sx={{ flex: 1, overflow: 'hidden' }}>
        {/* Video Call Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Consultation with {consultation?.patient_name}
              </Typography>
              <Box>
                <Tooltip title={isVideoOn ? 'Turn off video' : 'Turn on video'}>
                  <IconButton onClick={() => setIsVideoOn(!isVideoOn)}>
                    {isVideoOn ? <VideoIcon /> : <VideoOffIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title={isMicOn ? 'Mute' : 'Unmute'}>
                  <IconButton onClick={() => setIsMicOn(!isMicOn)}>
                    {isMicOn ? <MicIcon /> : <MicOffIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="End Consultation">
                  <IconButton color="error" onClick={handleEndConsultation}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                backgroundColor: '#000',
                borderRadius: 1,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Chat Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">Chat</Typography>
            </Box>

            <List sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              {messages.map((msg, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    sx={{
                      flexDirection: 'column',
                      alignItems: msg.sender_id === consultation?.doctor_id ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '80%',
                        backgroundColor: msg.sender_id === consultation?.doctor_id ? 'primary.main' : 'grey.100',
                        color: msg.sender_id === consultation?.doctor_id ? 'white' : 'text.primary',
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      <Typography variant="body2">{msg.content}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </ListItem>
                  {index < messages.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <form onSubmit={handleSendMessage}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    size="small"
                  />
                  <IconButton color="primary" type="submit">
                    <SendIcon />
                  </IconButton>
                  <IconButton>
                    <AttachIcon />
                  </IconButton>
                  <IconButton>
                    <ImageIcon />
                  </IconButton>
                </Box>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Medical Notes Dialog */}
      <Dialog
        open={openNotes}
        onClose={() => setOpenNotes(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Medical Notes</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Prescription"
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNotes(false)}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSaveNotes}
          >
            Save Notes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Consultation; 