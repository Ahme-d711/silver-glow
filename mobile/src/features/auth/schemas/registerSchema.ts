import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(500, 'Name must be less than 500 characters')
      .trim(),
    email: z.string().email('Invalid email format').min(1, 'Email is required').toLowerCase().trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .max(20, 'Phone number must be less than 20 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
