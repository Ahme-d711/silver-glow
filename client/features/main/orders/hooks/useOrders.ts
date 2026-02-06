import { useQuery } from "@tanstack/react-query";
import { orderService } from "../services/order.service";

export const useMyOrders = (params?: { status?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["orders", "my-orders", params],
    queryFn: () => orderService.getMyOrders(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
