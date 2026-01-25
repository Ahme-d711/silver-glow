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
}

export interface Order {
  _id: string
  userId: any // To handle populated user object or ID string
  
  // المنتجات داخل الطلب
  items: OrderItem[]
  
  // بيانات الشحن
  recipientName: string
  recipientPhone: string
  shippingAddress: string
  city: string
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

