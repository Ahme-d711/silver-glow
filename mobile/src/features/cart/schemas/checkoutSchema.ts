import { z } from 'zod';

export const checkoutSchema = z.object({
  recipientName: z.string().min(1, 'Recipient name is required').max(500, 'Name is too long'),
  recipientPhone: z.string().min(1, 'Phone number is required').max(20, 'Phone is too long'),
  shippingAddress: z.string().min(1, 'Shipping address is required').max(500, 'Address is too long'),
  city: z.string().min(1, 'City is required').max(100, 'City is too long'),
  governorate: z.string().min(1, 'Governorate is required').max(100, 'Governorate is too long'),
  country: z.string().default('Egypt'),
  postalCode: z.string().optional(),
  customerNotes: z.string().max(500, 'Notes are too long').optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
