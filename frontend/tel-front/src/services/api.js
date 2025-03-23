import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/me', data),
};

// Symptom checker services
export const symptomService = {
  checkSymptoms: (data) => api.post('/symptoms/check', data),
  getHistory: () => api.get('/symptoms/history'),
  getSymptomCheck: (id) => api.get(`/symptoms/${id}`),
};

// Consultation services
export const consultationService = {
  getDoctors: () => api.get('/consultations/doctors'),
  bookConsultation: (data) => api.post('/consultations/book', data),
  getMyConsultations: () => api.get('/consultations/my-consultations'),
  getConsultation: (id) => api.get(`/consultations/${id}`),
  joinConsultation: (id) => api.post(`/consultations/${id}/join`),
  completeConsultation: (id) => api.post(`/consultations/${id}/complete`),
};

// Prescription services
export const prescriptionService = {
  createPrescription: (data) => api.post('/prescriptions/create', data),
  getMyPrescriptions: () => api.get('/prescriptions/my-prescriptions'),
  getPrescription: (id) => api.get(`/prescriptions/${id}`),
  updatePrescription: (id, data) => api.put(`/prescriptions/${id}`, data),
};

// Admin services
export const adminService = {
  getUsers: () => api.get('/admin/users'),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  getDoctors: () => api.get('/admin/doctors'),
  createDoctor: (data) => api.post('/admin/doctors', data),
  getDoctor: (id) => api.get(`/admin/doctors/${id}`),
  updateDoctor: (id, data) => api.put(`/admin/doctors/${id}`, data),
  deleteDoctor: (id) => api.delete(`/admin/doctors/${id}`),
};

export default api; 