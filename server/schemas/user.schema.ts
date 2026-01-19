import { z } from "zod";
import { USER_ROLES } from "../types/user.type.js";
import {
  nameSchema,
  emailSchema,
  passwordSchema,
  phoneSchema,
  pictureSchema,
  roleSchema,
} from "./auth-schema.js";

/**
 * Create User Schema
 */
export const createUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema.optional(),
  phone: phoneSchema,
  picture: pictureSchema,
  role: roleSchema.default("user"),
  isActive: z.boolean().optional().default(true),
  isVerified: z.boolean().optional().default(false),
  isBlocked: z.boolean().optional().default(false),
  address: z
    .string()
    .max(500, "Address must be less than 500 characters")
    .optional(),
  totalOrders: z.coerce.number().int().min(0).optional().default(0),
  totalBalance: z.coerce.number().min(0).optional().default(0),
  lastLoginAt: z.coerce.date().optional(),
  lastTransactionAt: z.coerce.date().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

/**
 * Update User Schema
 */
export const updateUserSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
  phone: phoneSchema,
  picture: pictureSchema,
  role: roleSchema.optional(),
  isActive: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  address: z
    .string()
    .max(500, "Address must be less than 500 characters")
    .optional(),
  totalOrders: z.coerce.number().int().min(0).optional(),
  totalBalance: z.coerce.number().min(0).optional(),
  lastLoginAt: z.coerce.date().optional(),
  lastTransactionAt: z.coerce.date().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

/**
 * Get Users Query Schema
 */
export const getUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  search: z.string().optional(),
  role: z.enum(USER_ROLES as unknown as [string, ...string[]]).optional(),
  isActive: z.coerce.boolean().optional(),
});

export type GetUsersQueryInput = z.infer<typeof getUsersQuerySchema>;

/**
 * Update User Block Status Schema
 */
export const updateUserBlockSchema = z.object({
  isBlocked: z.boolean(),
});

export type UpdateUserBlockInput = z.infer<typeof updateUserBlockSchema>;

/**
 * Validation helper function
 */
export function validateUserData<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> {
  return schema.parse(data);
}

/**
 * Safe validation (returns errors instead of throwing)
 */
export function safeValidateUserData<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

