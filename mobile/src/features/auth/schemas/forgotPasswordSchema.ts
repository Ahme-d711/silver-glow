import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  phone: z.string().min(10, 'Invalid phone number'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
