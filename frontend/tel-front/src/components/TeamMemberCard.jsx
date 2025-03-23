import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material';

const TeamMemberCard = ({ member }) => {
  const { name, role, image, bio, social } = member;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={image}
        alt={name}
        sx={{
          objectFit: 'cover',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {name}
        </Typography>
        <Typography
          variant="subtitle1"
          color="primary"
          gutterBottom
          sx={{ mb: 2 }}
        >
          {role}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {bio}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          {social?.linkedin && (
            <Tooltip title="LinkedIn">
              <IconButton
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
              >
                <LinkedInIcon />
              </IconButton>
            </Tooltip>
          )}
          {social?.twitter && (
            <Tooltip title="Twitter">
              <IconButton
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
              >
                <TwitterIcon />
              </IconButton>
            </Tooltip>
          )}
          {social?.facebook && (
            <Tooltip title="Facebook">
              <IconButton
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
              >
                <FacebookIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard; 