import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const register = async (name, email, password) => {
  const response = await api.post('register', {
    name,
    email,
    password,
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await api.post('login', {
    email,
    password,
  });
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;