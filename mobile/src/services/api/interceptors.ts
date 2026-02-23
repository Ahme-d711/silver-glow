import { axiosInstance } from './axios';
import { getToken, deleteToken } from '../../utils/token';

export const setupInterceptors = (onLogout?: () => void) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token && config.headers) {
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
      const originalRequest = error.config;

      // Handle 401 Unauthorized globally
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await deleteToken();
        if (onLogout) {
          onLogout();
        }
      }

      // Extract professional error message
      const message = error.response?.data?.message || error.message || 'Something went wrong';
      return Promise.reject(new Error(message));
    }
  );
};
