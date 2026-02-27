"use client";

import { AxiosError } from "axios";
import clientAxios from "@/lib/axios/clientAxios";
import type { Order, OrderStatus, CreateOrderPayload, UpdateOrderPayload } from "../types";
import { Pagination } from "@/types";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
}

export interface GetOrdersParams {
  status?: OrderStatus;
  userId?: string;
  driverId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

/**
 * Get all orders
 */
export async function getOrders(params?: GetOrdersParams): Promise<ServiceResponse<{ orders: Order[], pagination: Pagination }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ orders: Order[], pagination: Pagination }>>("/orders", { params });

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch orders",
      error: err.message,
    };
  }
}

/**
 * Get orders by status
 */
export async function getOrdersByStatus(
  status: OrderStatus | "all",
  userId?: string
): Promise<Order[]> {
  try {
    const params: GetOrdersParams = {};
    if (status !== "all") params.status = status;
    if (userId && userId !== "all") params.userId = userId;

    const response = await clientAxios.get<ApiResponse<{ orders: Order[] }>>("/orders", { params });
    return response.data.data.orders;
  } catch (error) {
    console.error("Failed to fetch orders by status:", error);
    return [];
  }
}

/**
 * Get single order by ID
 */
export async function getOrderById(id: string): Promise<ServiceResponse<{ order: Order }>> {
  try {
    const response = await clientAxios.get<ApiResponse<{ order: Order }>>(`/orders/${id}`);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch order",
      error: err.message,
    };
  }
}

/**
 * Update order
 */
export async function updateOrder(
  id: string,
  payload: UpdateOrderPayload
): Promise<ServiceResponse<{ order: Order }>> {
  try {
    const response = await clientAxios.patch<ApiResponse<{ order: Order }>>(`/orders/${id}`, payload);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to update order",
      error: err.message,
    };
  }
}

/**
 * Create new order
 */
export async function createOrder(payload: CreateOrderPayload): Promise<ServiceResponse<{ order: Order }>> {
  try {
    const response = await clientAxios.post<ApiResponse<{ order: Order }>>("/orders", payload);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to create order",
      error: err.message,
    };
  }
}

/**
 * Cancel order
 */
export async function cancelOrder(id: string): Promise<ServiceResponse<{ order: Order }>> {
  try {
    const response = await clientAxios.patch<ApiResponse<{ order: Order }>>(`/orders/${id}/cancel`);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to cancel order",
      error: err.message,
    };
  }
}
/**
 * Update order status
 */
export async function updateOrderStatus(
  id: string,
  status: string
): Promise<ServiceResponse<{ order: Order }>> {
  try {
    const response = await clientAxios.patch<ApiResponse<{ order: Order }>>(`/orders/${id}/status`, { status });

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    return {
      success: false,
      message: err.response?.data?.message || "Failed to update order status",
      error: err.message,
    };
  }
}
