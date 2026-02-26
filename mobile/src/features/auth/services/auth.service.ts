import { axiosInstance } from '../../../services/api/axios';
import { AuthResponse, User, ApiResponse } from '../types/auth.types';
import { LoginFormData } from '../schemas/loginSchema';
import { RegisterFormData } from '../schemas/registerSchema';
import { VerifyFormData, ResendFormData } from '../schemas/verifySchema';
import { UpdateProfileFormData } from '../schemas/updateProfileSchema';
import { ChangePasswordFormData } from '../schemas/changePasswordSchema';

export const authApi = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data.data;
  },

  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data.data;
  },

  updateProfile: async (data: UpdateProfileFormData | FormData): Promise<User> => {
    const response = await axiosInstance.put<ApiResponse<{ user: User }>>('/auth/profile', data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return response.data.data.user;
  },

  verifyPhone: async (data: VerifyFormData): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post<ApiResponse<null>>('/auth/verify-phone', data);
    return response.data;
  },

  resendVerification: async (data: ResendFormData): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post<ApiResponse<null>>('/auth/resend-verification', data);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get<ApiResponse<{ user: User }>>('/auth/user-data');
    return response.data.data.user;
  },

  changePassword: async (data: ChangePasswordFormData): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post<ApiResponse<null>>('/auth/change-password', data);
    return response.data;
  },
};
