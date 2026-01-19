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
}

/**
 * Update user payload
 */
export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  picture?: string;
  role?: "admin" | "user";
  isActive?: boolean;
  isVerified?: boolean;
  isBlocked?: boolean;
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

