import axios from 'axios';

// Configure axios base URL and credentials
// Using relative URL so Vite proxy can handle it
const api = axios.create({
  baseURL: 'https://kodbank-z09m.onrender.com/api',
  withCredentials: true, // Important: allows cookies to be sent with requests
  headers: {
    'Content-Type': 'application/json'
  }
});

// API functions

/**
 * Register a new user
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', {
      username: userData.username,
      password: userData.password,
      email: userData.email,
      phone: userData.phone,
      role: 'customer' // Always customer for registration
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

/**
 * Login user
 */
export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/auth/login', {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

/**
 * Check user balance
 */
export const checkBalance = async () => {
  try {
    const response = await api.get('/user/balance');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to retrieve balance' };
  }
};

export default api;
