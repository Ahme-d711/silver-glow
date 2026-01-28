import { Order } from "@/features/dashboard/orders/types";

export interface DashboardSummary {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  newUsersLast30Days: number;
}

export interface MonthlyRevenueData {
  _id: {
    year: number;
    month: number;
  };
  revenue: number;
  orders: number;
}

export interface DashboardStats {
  summary: DashboardSummary;
  ordersByStatus: { [key: string]: number };
  charts: {
    ordersByCategory: { name: string; value: number }[];
    monthlyRevenue: MonthlyRevenueData[];
    ordersByGovernorate: { name: string; value: number }[];
  };
  recentOrders: Order[];
}
