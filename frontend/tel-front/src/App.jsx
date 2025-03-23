import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import theme from './theme';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/admin/Patients';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import PrivateRoute from './components/PrivateRoute';

// Public Pages
import Landing from './pages/Landing';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';

// Protected Pages
import SymptomChecker from './pages/SymptomChecker';
import Consultations from './pages/Consultations';
import DoctorProfile from './pages/DoctorProfile';
import UserProfile from './pages/UserProfile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/symptom-checker"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <SymptomChecker />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/consultations"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Consultations />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/doctor/:id"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <DoctorProfile />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <UserProfile />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <AdminDashboard />
                  </DashboardLayout>
                </PrivateRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="patients" element={<Patients />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;