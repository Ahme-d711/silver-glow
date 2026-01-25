"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getOrders, getOrdersByStatus, getOrderById, createOrder, updateOrder, cancelOrder } from "../services/orders.services"
import type { Order, OrderStatus } from "../types"
import { useAuthStore } from "@/features/dashboard/auth/stores/authStore"
import { toast } from "sonner"

// Query keys
export const ordersKeys = {
  all: ["orders"] as const,
  lists: () => [...ordersKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) => [...ordersKeys.lists(), { filters }] as const,
  byStatus: (status: OrderStatus, userId: string) => [...ordersKeys.all, "status", status, userId] as const,
  details: () => [...ordersKeys.all, "detail"] as const,
  detail: (id: string) => [...ordersKeys.details(), id] as const,
}

export const useOrdersState = () => {
  const [activeStatus, setActiveStatus] = useState("all")
  const [date, setDate] = useState<Date | undefined>()

  return {
    activeStatus,
    setActiveStatus,
    date,
    setDate,
  }
}

// Get All Orders Query
export function useOrders() {
  return useQuery({
    queryKey: ordersKeys.lists(),
    queryFn: async () => {
      const response = await getOrders();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch orders");
      }
      return response.data?.orders || [];
    },
  })
}

// Get Single Order Query
export function useOrder(id: string) {
  return useQuery({
    queryKey: ordersKeys.detail(id),
    queryFn: async () => {
      const response = await getOrderById(id);
      if (!response.success) throw new Error(response.message);
      return response.data?.order;
    },
    enabled: !!id,
  })
}

// Get Orders by Status Query
export function useOrdersByStatus(
  status: OrderStatus | null,
  userId?: string
) {
  return useQuery({
    queryKey: status ? ["orders", "status", status, userId || "all"] : ["orders", "status", "disabled"],
    queryFn: () => {
      if (!status) throw new Error("Status is required")
      return getOrdersByStatus(status, userId)
    },
    enabled: !!status,
  })
}

// Create Order Mutation
export function useCreateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ordersKeys.all });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create order");
    },
  });
}

// Update Order Mutation
export function useUpdateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => updateOrder(id, payload),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ordersKeys.all });
        if (response.data?.order?._id) {
          queryClient.invalidateQueries({ queryKey: ordersKeys.detail(response.data.order._id) });
        }
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update order");
    },
  });
}

// Cancel Order Mutation
export function useCancelOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ordersKeys.all });
        if (response.data?.order?._id) {
          queryClient.invalidateQueries({ queryKey: ordersKeys.detail(response.data.order._id) });
        }
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to cancel order");
    },
  });
}
