import api from '../utils/api';

// User login
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// User registration
export const register = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

// Fetch user profile
export const getUserProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

// Send forgot password OTP
export const sendForgotPasswordOTP = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

// Verify OTP for password reset
export const verifyOTP = async (email, otp) => {
  const response = await api.post('/auth/verify-otp', { email, otp });
  return response.data;
};

// Reset password
export const resetPassword = async (email, newPassword, otp) => {
  const response = await api.post('/auth/reset-password', { 
    email, 
    newPassword, 
    otp 
  });
  return response.data;
};
