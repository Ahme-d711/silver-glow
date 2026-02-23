export const USER_ROLES = ["admin", "user"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  picture?: string;
  isActive?: boolean;
  isVerified?: boolean;
  isBlocked?: boolean;
  phone?: string;
  address?: string;
  totalOrders?: number;
  totalBalance?: number;
  lastLoginAt?: Date;
  lastTransactionAt?: Date;
  verificationCode?: string;
  verificationCodeExpires?: Date;
  resetPasswordCode?: string;
  resetPasswordCodeExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthResponse {
  user: User;
  accessToken: string; // Backend calls it accessToken
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
