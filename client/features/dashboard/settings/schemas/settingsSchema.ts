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
  socialLinks: z
    .array(
      z.object({
        platform: z.string().min(1, { message: "Platform name is required" }),
        link: z.string().min(1, { message: "Link is required" }),
      })
    )
    .optional()
    .default([]),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
