import axios from 'axios';

// Base URL placeholder - should be moved to env constants later
const BASE_URL = 'http://localhost:5000/api';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
