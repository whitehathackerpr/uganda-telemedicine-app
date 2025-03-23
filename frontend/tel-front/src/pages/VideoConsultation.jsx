import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Alert } from '@mui/material';
import Video from 'twilio-video';

const VideoConsultation = () => {
  const [room, setRoom] = useState(null);
  const [error, setError] = useState('');
  const [connecting, setConnecting] = useState(true);

  // In a real-world scenario, the token should be securely fetched from your backend.
  const token = "YOUR_TWILIO_TOKEN"; // Placeholder token; replace with your dynamic token

  useEffect(() => {
    if (token) {
      Video.connect(token, { name: 'telemedicine-room' })
        .then((room) => {
          setRoom(room);
          setConnecting(false);
          // Attach existing participants' tracks to the DOM
          room.participants.forEach(participant => {
            participant.tracks.forEach(publication => {
              if (publication.track) {
                document.getElementById('remote-media').appendChild(publication.track.attach());
              }
            });
          });

          // When a new participant connects, attach their tracks to the DOM.
          room.on('participantConnected', participant => {
            participant.tracks.forEach(publication => {
              if (publication.track) {
                document.getElementById('remote-media').appendChild(publication.track.attach());
              }
            });
          });
        })
        .catch((err) => {
          console.error(err);
          setError('Could not connect to the video room.');
          setConnecting(false);
        });
    }

    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [token]);

  const handleDisconnect = () => {
    if (room) {
      room.disconnect();
      setRoom(null);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Video Consultation
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {connecting && !room ? (
        <Typography>Connecting to video room...</Typography>
      ) : (
        <>
          <Box id="remote-media" sx={{ border: '1px solid #ccc', p: 2, mb: 2 }} />
          <Button variant="contained" color="secondary" onClick={handleDisconnect}>
            Disconnect
          </Button>
        </>
      )}
    </Container>
  );
};

export default VideoConsultation;
