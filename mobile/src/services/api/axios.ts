import axios from 'axios';

// Use 10.0.2.2 for Android emulator to reach host's localhost
// For physical devices, use your computer's local IP (e.g. 192.168.1.231)
export const BASE_URL = 'http://192.168.1.231:3131';
export const API_URL = `${BASE_URL}/api`;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
