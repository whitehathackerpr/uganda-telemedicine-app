import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
} from '@mui/icons-material';

const About = () => {
  const values = [
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Patient-Centered Care',
      description:
        'We prioritize your health and well-being, providing personalized care that meets your unique needs.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure & Private',
      description:
        'Your health information is protected with industry-standard security measures and strict privacy policies.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Quick Access',
      description:
        'Get immediate access to healthcare services without long waiting times or travel requirements.',
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description:
        'Our dedicated support team is always available to assist you with any questions or concerns.',
    },
  ];

  const benefits = [
    'Access to qualified healthcare professionals',
    'Convenient video consultations',
    'AI-powered symptom checking',
    'Digital prescription management',
    'Secure medical record storage',
    'Reduced healthcare costs',
    'No travel required',
    'Flexible appointment scheduling',
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Nakimera',
      role: 'Medical Director',
      image: '/images/team/sarah.jpg',
      bio: 'Experienced medical professional with over 15 years of practice in Uganda.',
      social: {
        linkedin: 'https://linkedin.com/in/sarah-nakimera',
        twitter: 'https://twitter.com/sarah-nakimera',
      },
    },
    {
      name: 'John Okello',
      role: 'Technical Lead',
      image: '/images/team/john.jpg',
      bio: 'Software engineer specializing in healthcare technology and telemedicine solutions.',
      social: {
        linkedin: 'https://linkedin.com/in/john-okello',
        twitter: 'https://twitter.com/john-okello',
      },
    },
    {
      name: 'Mary Nalubega',
      role: 'Patient Care Coordinator',
      image: '/images/team/mary.jpg',
      bio: 'Dedicated to ensuring patients receive the best possible care experience.',
      social: {
        linkedin: 'https://linkedin.com/in/mary-nalubega',
        facebook: 'https://facebook.com/mary-nalubega',
      },
    },
    {
      name: 'Dr. Robert Ssebunya',
      role: 'Head of Telemedicine',
      image: '/images/team/robert.jpg',
      bio: 'Leading our telemedicine initiatives and digital health transformation.',
      social: {
        linkedin: 'https://linkedin.com/in/robert-ssebunya',
        twitter: 'https://twitter.com/robert-ssebunya',
      },
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            About Telemedicine Uganda
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px' }}>
            Revolutionizing healthcare access in Uganda through innovative
            telemedicine solutions
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              Telemedicine Uganda is dedicated to making quality healthcare
              accessible to all Ugandans, regardless of their location or
              circumstances. We believe that everyone deserves access to reliable
              medical care, and we're working to bridge the gap between patients
              and healthcare providers through technology.
            </Typography>
            <Typography variant="body1" paragraph>
              Our platform combines cutting-edge technology with compassionate
              healthcare professionals to deliver comprehensive medical services
              through telemedicine. We're committed to improving healthcare
              outcomes and making a positive impact on the lives of our patients.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Our Vision
                </Typography>
                <Typography variant="body1" paragraph>
                  To be the leading telemedicine platform in Uganda, providing
                  accessible, affordable, and high-quality healthcare services to
                  all citizens.
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                  Our Goals
                </Typography>
                <List>
                  {[
                    'Expand healthcare access to remote areas',
                    'Reduce healthcare costs for patients',
                    'Improve healthcare outcomes',
                    'Support healthcare professionals',
                    'Promote preventive healthcare',
                  ].map((goal, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={goal} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Our Values
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Benefits of Our Platform
        </Typography>
        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon color="primary" />
                    <Typography>{benefit}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Our Team
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 6 }}>
            We are a dedicated team of healthcare professionals, developers, and
            support staff working together to improve healthcare access in Uganda.
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <TeamMemberCard member={member} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About; 