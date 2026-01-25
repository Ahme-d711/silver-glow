import { Document, Types } from "mongoose";

export type OrderStatus = 
  | "PENDING"
  | "CONFIRMED" 
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED";

export type PaymentMethod = "COD" | "CARD" | "PAYPAL";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;

  // المنتجات داخل الطلب
  items: IOrderItem[];

  // بيانات الشحن
  recipientName: string;
  recipientPhone: string;
  shippingAddress: string;
  city: string;
  country: string;
  postalCode?: string;

  // التسعير
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;

  // الدفع
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId?: string;

  // التتبع والشحن
  trackingNumber?: string;
  shippingCompany?: string;
  shippedAt?: Date;
  deliveredAt?: Date;

  // حالة الطلب
  status: OrderStatus;

  // ملاحظات
  customerNotes?: string;
  adminNotes?: string;

  // التواريخ
  createdAt: Date;
  updatedAt: Date;
}
