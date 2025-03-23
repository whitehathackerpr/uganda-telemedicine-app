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
  Paper,
  ListItemAvatar,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LocalHospital as DoctorIcon,
  EventNote as ConsultationIcon,
  Assessment as AssessmentIcon,
  CalendarToday as CalendarIcon,
  ArrowForward as ArrowForwardIcon,
  People as PeopleIcon,
  Message as MessageIcon,
  TrendingUp as TrendingUpIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { consultationService, symptomService } from '../services/api';

const StatCard = ({ title, value, icon, color, trend }) => (
  <Paper
    sx={{
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
      },
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography color="text.secondary" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUpIcon sx={{ color: trend >= 0 ? 'success.main' : 'error.main' }} />
          <Typography
            variant="body2"
            sx={{ color: trend >= 0 ? 'success.main' : 'error.main' }}
          >
            {Math.abs(trend)}% from last month
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: `${color}20`,
          borderRadius: '50%',
          p: 1,
          display: 'flex',
        }}
      >
        {icon}
      </Box>
    </Box>
  </Paper>
);

const ActivityItem = ({ title, description, time, avatar }) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar src={avatar}>{title[0]}</Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={title}
      secondary={
        <Box>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {time}
          </Typography>
        </Box>
      }
    />
  </ListItem>
);

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

  const stats = [
    {
      title: 'Total Patients',
      value: '2,543',
      icon: <PeopleIcon sx={{ color: '#1976d2' }} />,
      color: '#1976d2',
      trend: 12,
    },
    {
      title: 'Appointments',
      value: '156',
      icon: <CalendarIcon sx={{ color: '#2e7d32' }} />,
      color: '#2e7d32',
      trend: 8,
    },
    {
      title: 'Messages',
      value: '89',
      icon: <MessageIcon sx={{ color: '#ed6c02' }} />,
      color: '#ed6c02',
      trend: -3,
    },
  ];

  const recentActivities = [
    {
      title: 'John Doe',
      description: 'New appointment scheduled',
      time: '5 minutes ago',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      title: 'Jane Smith',
      description: 'Completed consultation',
      time: '1 hour ago',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      title: 'Mike Johnson',
      description: 'Sent a message',
      time: '2 hours ago',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Dashboard Overview
        </Typography>
        <Tooltip title="More options">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={activity.title}>
                  <ActivityItem {...activity} />
                  {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Server Load
              </Typography>
              <LinearProgress variant="determinate" value={75} sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Database Usage
              </Typography>
              <LinearProgress variant="determinate" value={45} sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                API Response Time
              </Typography>
              <LinearProgress variant="determinate" value={90} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 