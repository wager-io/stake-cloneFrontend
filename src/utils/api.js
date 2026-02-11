import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const baseUrl = () => {
  return import.meta.env.VITE_API_URL || "https://wager-903d5d29a36d.herokuapp.com";
};

export const serverUrl = () => {
  return import.meta.env.VITE_API_URL || "https://wager-903d5d29a36d.herokuapp.com";
}

// Create an Axios instance
const api = axios.create({
  baseURL: baseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor (optional, for adding tokens or logging)
api.interceptors.request.use(
  (config) => {
    // Add authorization token if needed
    const token = Cookies.get('authToken'); // Get token from cookies

    if (token) {
      console.log(`[API Interceptor] Attaching Token to ${config.url}:`, token.substring(0, 10) + '...');
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log(`[API Interceptor] No token found in Cookies for ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor (optional, for handling errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (401) - token expired or invalid
    if (error.response && error.response.status === 401) {
      // Remove the invalid token from cookies
      Cookies.remove('authToken');

      // Show notification to user
      toast.error('Your session has expired. Please log in again.');

      // Optionally redirect to login page
      // If you're using React Router, you might want to handle this in a component instead
      // window.location.href = '/login';

      // You could also dispatch an action to update auth state if using Redux
      // Or trigger a context update if using React Context
    }

    // Handle forbidden errors (403)
    else if (error.response && error.response.status === 403) {
      console.log(error.response)
      // toast.error('You do not have permission to perform this action');
    }

    // Handle server errors (500)
    else if (error.response && error.response.status >= 500) {
      console.log(error.response)
      // toast.error('Server error. Please try again later.');
    }

    // Handle network errors
    else if (error.request && !error.response) {
      // toast.error('Network error. Please check your connection.');
      console.log(error.request)
    }

    // Log the error for debugging
    console.error('API Error:', error.response?.data || error.message);

    // Return the rejected promise
    return Promise.reject(error);
  }
);

// Helper methods for common API operations
api.fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

api.postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

api.updateData = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

api.deleteData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;