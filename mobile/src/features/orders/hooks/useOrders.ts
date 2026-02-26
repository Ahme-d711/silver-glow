import { useQuery } from "@tanstack/react-query";
import { ordersService } from "../services/orders.service";

export const useOrders = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["orders", page, limit],
    queryFn: () => ordersService.getOrders(page, limit),
  });
};

export const useOrderDetails = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => ordersService.getOrderById(id),
    enabled: !!id,
  });
};
