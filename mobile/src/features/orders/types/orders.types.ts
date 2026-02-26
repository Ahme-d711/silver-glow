import { Product } from "../../product/types/product.types";

export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED";
export type PaymentMethod = "COD" | "CARD" | "PAYPAL" | "WALLET";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export interface OrderItem {
  productId: Product;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  recipientName: string;
  recipientPhone: string;
  shippingAddress: string;
  city: string;
  governorate: string;
  country: string;
  postalCode?: string;
  subtotal: number;
  shippingCost: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  customerNotes?: string;
  adminNotes?: string;
  trackingNumber?: string;
  shippingCompany?: string;
  shippedAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  data: {
    orders: Order[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export interface SingleOrderResponse {
  success: boolean;
  message: string;
  data: {
    order: Order;
  };
}
