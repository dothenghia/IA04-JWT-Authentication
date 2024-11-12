import axios from 'axios';

// const API_BASE_URL = 'https://thenghia-registration-backend.vercel.app';
const API_BASE_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user && user.access_token) {
    config.headers['Authorization'] = `Bearer ${user.access_token}`;
  }
  return config;
});

export const getUsers = async () => {
  const response = await axiosInstance.get('/user/all');
  return response.data;
};

export const register = async (userData: any) => {
  const response = await axiosInstance.post('/user/register', userData);
  return response.data;
};

export const login = async (credentials: any) => {
  const response = await axiosInstance.post('/user/login', credentials);
  return response.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get('/user/profile');
  return response.data;
};
