import { z } from "zod";

export const settingsSchema = z.object({
  shippingCost: z.coerce
    .number()
    .min(0, { message: "Shipping cost must be a positive number" }),
  taxRate: z.coerce
    .number()
    .min(0, { message: "Tax rate must be a positive number" })
    .max(100, { message: "Tax rate cannot exceed 100%" }),
  freeShippingThreshold: z.coerce
    .number()
    .min(0, { message: "Free shipping threshold must be a positive number" }),
  currency: z.string().min(1, { message: "Currency is required" }),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
