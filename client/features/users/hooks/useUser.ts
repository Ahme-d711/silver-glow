"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getAllUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateUser,
  deleteUser,
  updateUserBlockStatus,
} from "../services/user.service";
import type { User } from "@/features/auth/types";
import type {
  GetAllUsersParams,
  GetAllUsersResponse,
  CreateUserPayload,
  UpdateUserPayload,
} from "../types";
import { toast } from "sonner";

// Query keys
export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (filters?: GetAllUsersParams) =>
    [...usersKeys.lists(), { filters }] as const,
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
  current: () => [...usersKeys.all, "current"] as const,
};

/**
 * Get all users query with filtering, searching, and pagination
 */
export function useUsers(params?: GetAllUsersParams) {
  return useQuery({
    queryKey: usersKeys.list(params),
    queryFn: async () => {
      const response = await getAllUsers(params);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch users");
      }
      return response.data;
    },
  });
}

/**
 * Get single user by ID query
 */
export function useUser(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: async () => {
      // First, try to get from cache
      const cachedUsers = queryClient.getQueryData<GetAllUsersResponse>(
        usersKeys.lists()
      );
      if (cachedUsers) {
        const cachedUser = cachedUsers.users.find(
          (user) => user._id === id || user.id === id
        );
        if (cachedUser) {
          return cachedUser;
        }
      }

      // If not in cache, fetch from API
      const response = await getUserById(id);
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch user");
      }
      return response.data.user;
    },
    enabled: !!id,
  });
}

/**
 * Get current user profile query
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: usersKeys.current(),
    queryFn: async () => {
      const response = await getCurrentUser();
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch current user");
      }
      return response.data.user;
    },
  });
}

/**
 * Create user mutation
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      pictureFile,
    }: {
      payload: CreateUserPayload;
      pictureFile?: File;
    }) => createUser(payload, pictureFile),
    onSuccess: (response) => {
      if (response.success && response.data) {
        // Invalidate users list to refetch
        queryClient.invalidateQueries({ queryKey: usersKeys.lists() });

        // Add new user to cache
        queryClient.setQueryData<User>(
          usersKeys.detail(response.data.user._id || response.data.user.id || ""),
          response.data.user
        );

        toast.success(response.message || "User created successfully");
      } else {
        toast.error(response.message || "Failed to create user");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create user");
    },
  });
}

/**
 * Update user mutation
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
      pictureFile,
    }: {
      id: string;
      payload: UpdateUserPayload;
      pictureFile?: File;
    }) => updateUser(id, payload, pictureFile),
    onSuccess: (response, variables) => {
      if (response.success && response.data) {
        // Update user detail cache
        queryClient.setQueryData<User>(
          usersKeys.detail(variables.id),
          response.data.user
        );

        // Update users list cache if it exists
        queryClient.setQueryData<GetAllUsersResponse>(
          usersKeys.lists(),
          (old) => {
            if (!old) return old;
        return {
          ...old,
              users: old.users.map((user) =>
                user._id === variables.id || user.id === variables.id
                  ? response.data!.user
                  : user
              ),
            };
          }
        );

      // Invalidate to refetch in background
        queryClient.invalidateQueries({ queryKey: usersKeys.detail(variables.id) });
        queryClient.invalidateQueries({ queryKey: usersKeys.lists() });

        toast.success(response.message || "User updated successfully");
      } else {
        toast.error(response.message || "Failed to update user");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update user");
    },
  });
}

/**
 * Delete user mutation (soft delete)
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (response, userId) => {
      if (response.success) {
        // Remove user from detail cache
        queryClient.removeQueries({ queryKey: usersKeys.detail(userId) });

        // Update users list cache if it exists
        queryClient.setQueryData<GetAllUsersResponse>(
          usersKeys.lists(),
          (old) => {
            if (!old) return old;
            return {
              ...old,
              users: old.users.filter(
                (user) => user._id !== userId && user.id !== userId
              ),
            };
          }
        );

        // Invalidate to refetch in background
        queryClient.invalidateQueries({ queryKey: usersKeys.lists() });

        toast.success(response.message || "User deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete user");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete user");
    },
  });
}

/**
 * Update user block status mutation
 */
export function useUpdateUserBlockStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isBlocked }: { id: string; isBlocked: boolean }) =>
      updateUserBlockStatus(id, isBlocked),
    onSuccess: (response, variables) => {
      if (response.success && response.data) {
        // Update user detail cache
        queryClient.setQueryData<User>(
          usersKeys.detail(variables.id),
          response.data.user
        );

        // Update users list cache if it exists
        queryClient.setQueryData<GetAllUsersResponse>(
          usersKeys.lists(),
          (old) => {
            if (!old) return old;
            return {
              ...old,
              users: old.users.map((user) =>
                user._id === variables.id || user.id === variables.id
                  ? response.data!.user
                  : user
              ),
            };
          }
        );

        // Invalidate to refetch in background
        queryClient.invalidateQueries({
          queryKey: usersKeys.detail(variables.id),
        });
        queryClient.invalidateQueries({ queryKey: usersKeys.lists() });

        toast.success(response.message || "Status updated successfully");
      } else {
        toast.error(response.message || "Failed to update status");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update status");
    },
  });
}
