import { PopulatedField, UserReference } from "@/types";

export type OrderStatus = 
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED"

export type PaymentMethod = "COD" | "CARD" | "PAYPAL"
export type PaymentStatus = "PENDING" | "PAID" | "FAILED"

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  size?: string
}

export interface Order {
  _id: string
  userId: PopulatedField<UserReference>
  
  // المنتجات داخل الطلب
  items: OrderItem[]
  
  // بيانات الشحن
  recipientName: string
  recipientPhone: string
  shippingAddress: string
  city: string
  governorate: string
  country: string
  postalCode?: string
  
  // التسعير
  subtotal: number
  shippingCost: number
  discountAmount: number
  totalAmount: number
  
  // الدفع
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  transactionId?: string
  
  // التتبع والشحن
  trackingNumber?: string
  shippingCompany?: string
  shippedAt?: string
  deliveredAt?: string
  
  // حالة الطلب
  status: OrderStatus
  
  // ملاحظات
  customerNotes?: string
  adminNotes?: string
  
  // التواريخ
  createdAt: string
  updatedAt: string
}

export interface CreateOrderPayload {
  userId: string
  items: OrderItem[]
  recipientName: string
  recipientPhone: string
  shippingAddress: string
  city: string
  governorate: string
  country: string
  postalCode?: string
  subtotal: number
  shippingCost: number
  discountAmount: number
  totalAmount: number
  paymentMethod: PaymentMethod
  paymentStatus?: PaymentStatus
  customerNotes?: string
}

export interface UpdateOrderPayload {
  status?: OrderStatus
  paymentStatus?: PaymentStatus
  trackingNumber?: string
  shippingCompany?: string
  adminNotes?: string
  recipientName?: string
  recipientPhone?: string
  shippingAddress?: string
  city?: string
  governorate?: string
  country?: string
  postalCode?: string
}
