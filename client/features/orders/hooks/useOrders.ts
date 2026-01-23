"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getOrders, getOrdersByStatus } from "../services/orders.services"
import type { OrderStatus } from "../types"
import { useAuthStore } from "@/features/auth/stores/authStore"

// Query keys
export const ordersKeys = {
  all: ["orders"] as const,
  lists: () => [...ordersKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) => [...ordersKeys.lists(), { filters }] as const,
  byStatus: (status: OrderStatus, userId: string) => [...ordersKeys.all, "status", status, userId] as const,
  details: () => [...ordersKeys.all, "detail"] as const,
  detail: (id: string | number) => [...ordersKeys.details(), id] as const,
}

export const useOrdersState = () => {
  const [activeTab, setActiveTab] = useState("orders")
  const [activeStatus, setActiveStatus] = useState("all")
  const [date, setDate] = useState<Date | undefined>()

  return {
    activeTab,
    setActiveTab,
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
      return response.data?.orders || [];
    },
  })
}

// Get Orders by Status Query
export function useOrdersByStatus(
  status: OrderStatus | null,
  userId?: string
) {
  const { user } = useAuthStore()
  
  // Use provided userId or get from auth store
  const orderUserId = userId || user?.id || user?._id || ""
  
  return useQuery({
    queryKey: status ? ordersKeys.byStatus(status, orderUserId) : ["orders", "byStatus", "disabled"],
    queryFn: () => {
      if (!status) throw new Error("Status is required")
      return getOrdersByStatus(status, orderUserId)
    },
    enabled: !!orderUserId && !!status,
  })
}
