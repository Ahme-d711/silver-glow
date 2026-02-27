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
  contactEmail: z.string().email({ message: "Invalid email format" }).optional().or(z.literal("")),
  contactPhone: z.string().optional().or(z.literal("")),
  facebookLink: z.string().url({ message: "Invalid URL format" }).optional().or(z.literal("")).or(z.string().startsWith("facebook.com")).or(z.string().startsWith("https://facebook.com")),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
