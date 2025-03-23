import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Telemedicine Uganda
            </Link>
          </Typography>
          <Button color="inherit" component={Link} to="/appointment">
            Book Appointment
          </Button>
          <Button color="inherit" component={Link} to="/video">
            Video Consultation
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
