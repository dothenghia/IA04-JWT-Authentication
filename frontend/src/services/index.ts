import axios from 'axios';

const API_BASE_URL = 'https://thenghia-registration-backend.vercel.app';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Get all the users
export const getUsers = async () => {
  const response = await axiosInstance.get('/user/all');
  return response.data;
};

// Register account
export const register = async (userData: any) => {
  const response = await axiosInstance.post('/user/register', userData);
  return response.data;
};

// Login account
export const login = async (credentials: any) => {
  const response = await axiosInstance.post('/user/login', credentials);
  return response.data;
};
