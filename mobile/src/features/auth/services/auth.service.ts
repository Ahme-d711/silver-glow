import { axiosInstance } from '../../../services/api/axios';
import { AuthResponse, User, ApiResponse } from '../types/auth.types';
import { LoginFormData } from '../schemas/loginSchema';
import { RegisterFormData } from '../schemas/registerSchema';

export const authApi = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data.data;
  },

  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get<ApiResponse<{ user: User }>>('/auth/profile');
    return response.data.data.user;
  },
};
