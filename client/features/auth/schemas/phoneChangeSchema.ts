import { z } from "zod";

export const phoneChangeRequestSchema = z.object({
  newPhone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9]{8,15}$/, "Invalid phone number"),
});

export const phoneChangeConfirmSchema = phoneChangeRequestSchema.extend({
  code: z
    .string()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d+$/, "Verification code must be numeric"),
});

export type PhoneChangeRequestValues = z.infer<typeof phoneChangeRequestSchema>;
export type PhoneChangeConfirmValues = z.infer<typeof phoneChangeConfirmSchema>;
