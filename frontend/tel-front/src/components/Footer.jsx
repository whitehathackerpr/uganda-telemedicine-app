import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              AI-Based Symptom Checker
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Providing advanced telemedicine solutions to help you understand your symptoms and get the care you need.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <IconButton aria-label="facebook" color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twitter" color="primary">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="linkedin" color="primary">
                <LinkedInIcon />
              </IconButton>
              <IconButton aria-label="instagram" color="primary">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/symptom-checker" color="inherit" display="block" sx={{ mb: 1 }}>
              Symptom Checker
            </Link>
            <Link href="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact Us
            </Link>
            <Link href="/privacy" color="inherit" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" display="block">
              Terms of Service
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1 }} color="primary" />
              <Typography variant="body2">
                123 Medical Center Dr, Kampala, Uganda
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} color="primary" />
              <Typography variant="body2">
                +256 123 456 789
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1 }} color="primary" />
              <Typography variant="body2">
                info@ugandatelemedicine.org
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Uganda Telemedicine. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;