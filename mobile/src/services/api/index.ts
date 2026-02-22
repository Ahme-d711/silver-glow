import { axiosInstance } from './axios';
import { setupInterceptors } from './interceptors';

setupInterceptors();

export default axiosInstance;
