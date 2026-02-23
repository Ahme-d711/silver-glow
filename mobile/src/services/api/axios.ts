import axios from 'axios';

// Use 10.0.2.2 for Android emulator to reach host's localhost
// For physical devices, use your computer's local IP (e.g. 192.168.1.231)
const BASE_URL = 'http://192.168.1.231:5000/api';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
