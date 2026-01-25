"use client";

import { AxiosError } from "axios";
import clientAxios from "@/lib/axios/clientAxios";
import type { User } from "@/features/dashboard/auth/types";
import type {
  ApiResponse,
  GetAllUsersParams,
  GetAllUsersResponse,
  CreateUserPayload,
  UpdateUserPayload,
  ServiceResponse,
} from "../types";

/**
 * Get all users with filtering, searching, and pagination
 */
export async function getAllUsers(
  params?: GetAllUsersParams
): Promise<ServiceResponse<GetAllUsersResponse>> {
  try {
    const response = await clientAxios.get<ApiResponse<GetAllUsersResponse>>("/users", {
      params,
    });

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch users",
      error: err.message,
    };
  }
}

/**
 * Get single user by ID
 */
export async function getUserById(id: string): Promise<ServiceResponse<{ user: User }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ user: User }>>(`/users/${id}`);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch user",
      error: err.message,
    };
  }
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<ServiceResponse<{ user: User }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ user: User }>>("/users/me");

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch current user",
      error: err.message,
    };
  }
}

/**
 * Create new user
 * @param payload - User data
 * @param pictureFile - Optional picture file to upload
 */
export async function createUser(
  payload: CreateUserPayload | FormData
): Promise<ServiceResponse<{ user: User }>> {
  try {
    const response = await clientAxios.post<ApiResponse<{ user: User }>>("/users", payload);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to create user",
      error: err.message,
    };
  }
}

/**
 * Update user
 * @param id - User ID
 * @param payload - User data to update
 * @param pictureFile - Optional picture file to upload
 */
export async function updateUser(
  id: string,
  payload: UpdateUserPayload | FormData
): Promise<ServiceResponse<{ user: User }>> {
  try {
    const response = await clientAxios.put<ApiResponse<{ user: User }>>(`/users/${id}`, payload);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to update user",
      error: err.message,
    };
  }
}

/**
 * Delete user (soft delete - sets isActive to false)
 */
export async function deleteUser(id: string): Promise<ServiceResponse<null>> {
  try {
    const response = await clientAxios.delete<ApiResponse<null>>(`/users/${id}`);

    return {
      success: true,
      message: response.data.message || "User deleted successfully",
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to delete user",
      error: err.message,
    };
  }
}

/**
 * Update user block status
 */
export async function updateUserBlockStatus(
  id: string,
  isBlocked: boolean
): Promise<ServiceResponse<{ user: User }>> {
  try {
    const response = await clientAxios.patch<ApiResponse<{ user: User }>>(
      `/users/${id}/block`,
      { isBlocked }
    );

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to update block status",
      error: err.message,
    };
  }
}

/**
 * Add balance to user
 */
export async function addUserBalance(
  id: string,
  amount: number
): Promise<ServiceResponse<{ user: User }>> {
  try {
    const response = await clientAxios.patch<ApiResponse<{ user: User }>>(
      `/users/${id}/balance`,
      { amount }
    );

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to add balance",
      error: err.message,
    };
  }
}

/**
 * Activate user
 */
export async function activateUser(id: string): Promise<ServiceResponse<{ user: User }>> {
  try {
    const response = await clientAxios.patch<ApiResponse<{ user: User }>>(
      `/users/${id}/activate`
    );

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to activate user",
      error: err.message,
    };
  }
}

