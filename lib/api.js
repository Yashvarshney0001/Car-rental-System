import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

export const carsAPI = {
  getCars: (params) => api.get('/cars', { params }),
  getCarById: (id) => api.get(`/cars/${id}`),
  createCar: (carData) => api.post('/cars', carData),
};

export const bookingsAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getMyBookings: (params) => api.get('/bookings/my-bookings', { params }),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  cancelBooking: (id) => api.patch(`/bookings/${id}/cancel`),
};

export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  changePassword: (passwordData) => api.put('/users/change-password', passwordData),
  getDashboard: () => api.get('/users/dashboard'),
};

export const contactAPI = {
  sendMessage: (messageData) => api.post('/contact', messageData),
  getMessages: (params) => api.get('/contact', { params }),
  getMessageById: (id) => api.get(`/contact/${id}`),
  updateMessageStatus: (id, status) => api.patch(`/contact/${id}/status`, { status }),
};

export default api;