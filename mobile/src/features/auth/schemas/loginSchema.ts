import { z } from 'zod';

export const loginSchema = z.object({
  phone: z
    .string({ message: 'Phone number is required' })
    .min(1, 'Phone number is required')
    .max(20, 'Phone number must be less than 20 characters')
    .trim(),
  password: z.string({ message: 'Password is required' }).min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
