import { axiosInstance } from "../../../services/api/axios";
import { OrdersResponse, SingleOrderResponse } from "../types/orders.types";

export const ordersService = {
  getOrders: async (page = 1, limit = 10) => {
    const response = await axiosInstance.get<OrdersResponse>(`/orders/my-orders?page=${page}&limit=${limit}`);
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await axiosInstance.get<SingleOrderResponse>(`/orders/${id}`);
    return response.data;
  }
};
