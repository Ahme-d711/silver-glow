import { axiosInstance } from './axios';
import { getToken } from '../../utils/token';

export const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      // Prepare for 401 handling (refresh token flow or logout)
      if (error.response?.status === 401) {
        // Handle unauthorized access
      }
      return Promise.reject(error);
    }
  );
};
