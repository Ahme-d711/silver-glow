import { z } from 'zod';

export const verifySchema = z.object({
  phone: z.string().min(10, 'Invalid phone number'),
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

export type VerifyFormData = z.infer<typeof verifySchema>;

export const resendSchema = z.object({
  phone: z.string().min(10, 'Invalid phone number'),
});

export type ResendFormData = z.infer<typeof resendSchema>;
