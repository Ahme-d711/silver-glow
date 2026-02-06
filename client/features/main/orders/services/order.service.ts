import clientAxios from "@/lib/axios/clientAxios";
import { Order } from "@/features/dashboard/orders/types";
import { Pagination } from "@/types";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const orderService = {
  getMyOrders: async (params?: { status?: string; page?: number; limit?: number }) => {
    const response = await clientAxios.get<ApiResponse<{ orders: Order[]; pagination: Pagination }>>(
      "/orders/my-orders",
      { params }
    );
    return response.data;
  },
};
