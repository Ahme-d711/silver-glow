import { z } from "zod";

export const securitySchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters" })
      .max(255)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number"
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });

export type SecurityFormValues = z.infer<typeof securitySchema>;
