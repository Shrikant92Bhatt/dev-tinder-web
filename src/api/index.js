import axios from 'axios';
import { API_CONFIG, isDevelopment } from '../config/environment.js';

// Create axios instance with configuration
const apiClient = axios.create({
  ...API_CONFIG,
  // Additional CORS configuration for local development
  ...(isDevelopment && {
    withCredentials: true,
    headers: {
      ...API_CONFIG.headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    }
  })
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add timestamp for debugging
    if (isDevelopment) {
      config.metadata = { startTime: new Date() };
    }
    
    // Handle CORS preflight requests
    if (config.method === 'options') {
      config.headers['Access-Control-Allow-Origin'] = '*';
      config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS';
      config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log response time in development
    if (isDevelopment && response.config.metadata) {
      const endTime = new Date();
      const duration = endTime - response.config.metadata.startTime;
      console.log(`API Call: ${response.config.url} - ${duration}ms`);
    }
    return response;
  },
  (error) => {
    // Handle CORS errors specifically
    if (error.message === 'Network Error' && isDevelopment) {
      console.error('CORS Error: Make sure your backend server is running and configured for CORS');
      console.error('Backend should allow requests from:', window.location.origin);
    }
    
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error occurred');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - no response received');
      if (isDevelopment) {
        console.error('This might be a CORS issue. Check your backend CORS configuration.');
      }
    } else {
      // Other error
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API endpoints
const login = async (email, password) => {
  try {
    const response = await apiClient.post('/login', {
      email,
      password,
    });

    return response?.data;
  } catch (error) {
    throw new Error('Error in Login ', error);
  }
};

export const logoutAPI = async () => {
  try {
    const response = await apiClient.post('/logout');

    return response?.data;
  } catch (error) {
    throw new Error('Error in Logout ', error);
  }
};

export const getUser = async () => {
  try {
    const response = await apiClient.get('/profile/view');
    return response.data;
  } catch (error) {
    throw new Error('Error in fetch user', error);
  }
};

export const getFeed = async () => {
  try {
    const response = await apiClient.get('/user/feed');
    return response.data;
  } catch (error) {
    throw new Error('Error in fetching feed', error);
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await apiClient.patch('/profile/edit', data);
    return response.data;
  } catch (error) {
    throw new Error('Error in update', error);
  }
};

export const getConnections = async () => {
  try {
    const response = await apiClient.get('/user/connections');
    return response.data;
  } catch (error) {
    throw new Error('Error in fetching connections', error);
  }
};

export const getRequests = async () => {
  try {
    const response = await apiClient.get('/user/requests');
    return response.data;
  } catch (error) {
    throw new Error('Error in fetching requests', error);
  }
};

export const acceptRequest = async (requestId) => {
  try {
    const response = await apiClient.post(`/request/review/accepted/${requestId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error in accepting request', error);
  }
};

export const rejectRequest = async (requestId) => {
  try {
    const response = await apiClient.post(`/user/requests/${requestId}/reject`);
    return response.data;
  } catch (error) {
    throw new Error('Error in rejecting request', error);
  }
};

export const sendConnectionRequest = async (userId) => {
  try {
    const response = await apiClient.post(`/request/send/interested/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error in sending connection request', error);
  }
};

export const rejectUser = async (userId) => {
  try {
    const response = await apiClient.post(`/request/send/ignored/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error in rejecting user', error);
  }
};

export const signup = async (userData) => {
  try {
    const response = await apiClient.post('/signup', userData);
    return response?.data;
  } catch (error) {
    throw new Error('Error in signup', error);
  }
};

export default login;
