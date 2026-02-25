export interface CheckoutPayload {
  recipientName: string;
  recipientPhone: string;
  shippingAddress: string;
  city: string;
  governorate: string;
  country: string;
  postalCode?: string;
  customerNotes?: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    order: {
      _id: string;
      trackingNumber: string;
      totalAmount: number;
      status: string;
      paymentStatus: string;
      createdAt: string;
    };
  };
}
