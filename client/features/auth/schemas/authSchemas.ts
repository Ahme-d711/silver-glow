import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(1, { message: "Phone number is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
