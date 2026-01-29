import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(1, { message: "Phone number is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }).max(500),
    email: z.string().email("Invalid email format").min(1, "Email is required").max(500),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(20)
      .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, "Invalid phone number format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(255)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    gender: z.enum(["male", "female"]).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const verifyPhoneSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  code: z
    .string()
    .min(4, "Verification code must be at least 4 digits")
    .max(6, "Verification code must be at most 6 digits")
    .regex(/^\d+$/, "Verification code must be numeric"),
});

export type VerifyPhoneFormValues = z.infer<typeof verifyPhoneSchema>;
