// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if there's a stored token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch the current user's info using the token
      axios
        .get('/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          localStorage.removeItem('token');
          console.error('Token validation failed:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Login handler
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
