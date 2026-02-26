import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(500, 'Name must be less than 500 characters')
    .trim()
    .optional(),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .max(20, 'Phone number must be less than 20 characters')
    .optional(),
  gender: z.enum(['male', 'female']).optional(),
  address: z
    .string()
    .max(500, 'Address must be less than 500 characters')
    .optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
