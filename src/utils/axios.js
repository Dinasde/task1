// src/utils/axios.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api', // Set the base URL here
});

// Add an interceptor to attach the token in the headers
axiosInstance.interceptors.request.use(
  (request) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      // Attach the token to the headers
      request.headers.token= token;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
