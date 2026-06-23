import type { User } from "@/features/auth/types";

/**
 * API Response structure
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

/**
 * Pagination metadata
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  pages: number;
}

/**
 * Get all users response
 */
export interface GetAllUsersResponse {
  users: User[];
  pagination: Pagination;
}

/**
 * Get all users query parameters
 */
export interface GetAllUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: "admin" | "user";
  isActive?: boolean;
}

/**
 * Create user payload
 */
export interface CreateUserPayload {
  name: string;
  email: string;
  password?: string;
  phone: string;
  picture?: string;
  role?: "admin" | "user";
  isActive?: boolean;
  isVerified?: boolean;
  address?: string;
  totalOrders?: number;
  totalBalance?: number;
}

/**
 * Update user payload
 */
export interface UpdateUserPayload {
  name?: string;
  picture?: string;
  role?: "admin" | "user";
  isActive?: boolean;
  isVerified?: boolean;
  address?: string;
}

/**
 * Service response type
 */
export interface ServiceResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export type UserAccountStatus = "active" | "deactivated";

export interface UserSidebarData {
  id: string;
  name: string;
  status: UserAccountStatus;
  address: string;
  phone: string;
  lastTransaction: string;
  lastOnline: string;
  profileImage?: string;
  isActive?: boolean;
}

export interface UserStatTrend {
  value: string;
  isUp: boolean;
  sub: string;
}

export interface UserStatsData {
  totalOrders: string;
  totalBalance: string;
  orderTrend: UserStatTrend;
  balanceTrend: UserStatTrend;
}

export interface UserTransaction {
  orderId: string;
  id: string;
  product: string;
  sub: string;
  total: string;
  status: string;
  paymentStatus: string;
  date: string;
  image?: string;
}

