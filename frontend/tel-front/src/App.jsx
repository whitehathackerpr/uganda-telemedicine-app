import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AppointmentBooking from './pages/AppointmentBooking';
import VideoConsultation from './pages/VideoConsultation';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import SymptomChecker from "./pages/SymptomChecker";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/appointment"
            element={
              <ProtectedRoute>
                <AppointmentBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video"
            element={
              <ProtectedRoute>
                <VideoConsultation />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Route path="/symptom-checker" element={<SymptomChecker />} />
      </Router>
    </AuthProvider>
  );
};

export default App;
