"use client";

import { AxiosError } from "axios";
import clientAxios from "@/lib/axios/clientAxios";
import type { User } from "@/features/auth/types";
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
  payload: CreateUserPayload,
  pictureFile?: File
): Promise<ServiceResponse<{ user: User }>> {
  try {
    let response;

    if (pictureFile) {
      // Use FormData for file upload
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("email", payload.email);
      formData.append("phone", payload.phone);
      if (payload.password) formData.append("password", payload.password);
      if (payload.role) formData.append("role", payload.role);
      if (payload.isActive !== undefined)
        formData.append("isActive", String(payload.isActive));
      if (payload.isVerified !== undefined)
        formData.append("isVerified", String(payload.isVerified));
      formData.append("picture", pictureFile);

      response = await clientAxios.post<ApiResponse<{ user: User }>>("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      // Use JSON for regular data
      response = await clientAxios.post<ApiResponse<{ user: User }>>("/users", payload);
    }

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
  payload: UpdateUserPayload,
  pictureFile?: File
): Promise<ServiceResponse<{ user: User }>> {
  try {
    let response;

    if (pictureFile) {
      // Use FormData for file upload
      const formData = new FormData();
      if (payload.name) formData.append("name", payload.name);
      if (payload.email) formData.append("email", payload.email);
      if (payload.phone) formData.append("phone", payload.phone);
      if (payload.password) formData.append("password", payload.password);
      if (payload.role) formData.append("role", payload.role);
      if (payload.isActive !== undefined)
        formData.append("isActive", String(payload.isActive));
      if (payload.isVerified !== undefined)
        formData.append("isVerified", String(payload.isVerified));
      formData.append("picture", pictureFile);

      response = await clientAxios.put<ApiResponse<{ user: User }>>(`/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      // Use JSON for regular data
      response = await clientAxios.put<ApiResponse<{ user: User }>>(`/users/${id}`, payload);
    }

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

