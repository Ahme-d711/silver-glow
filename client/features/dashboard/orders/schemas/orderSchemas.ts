import z from "zod";

// Form Schema
export const getOrderFormSchema = (t: (key: string) => string) => z.object({
  userId: z.string().min(1, t("customer_required")),
  items: z.array(z.object({
    productId: z.string().min(1, t("product_required")),
    name: z.string().min(1),
    price: z.coerce.number(),
    quantity: z.coerce.number().int().min(1),
    image: z.string().optional(),
    size: z.string().optional(),
  })).min(1),
  recipientName: z.string().min(1),
  recipientPhone: z.string().min(1),
  shippingAddress: z.string().min(1),
  city: z.string().min(1),
  governorate: z.string().min(1, t("governorate_required")),
  country: z.string().min(1),
  postalCode: z.string().optional(),
  paymentMethod: z.string(),
  customerNotes: z.string().optional(),
  adminNotes: z.string().optional(),
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
});