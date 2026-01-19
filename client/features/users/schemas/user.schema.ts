import { z } from "zod";

/**
 * Common validation patterns (mirrored from server)
 */
export const USER_ROLES = ["admin", "user"] as const;

export const emailSchema = z
  .string()
  .email("Invalid email format")
  .min(1, "Email is required")
  .max(500, "Email must be less than 500 characters")
  .toLowerCase()
  .trim();

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(255, "Password must be less than 255 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  );

export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(500, "Name must be less than 500 characters")
  .trim();

export const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .max(20, "Phone number must be less than 20 characters")
  .regex(
    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
    "Invalid phone number format"
  );

export const pictureSchema = z
  .string()
  .url("Picture must be a valid URL")
  .max(255, "Picture URL must be less than 255 characters")
  .optional()
  .or(z.literal(""));

export const roleSchema = z.enum(USER_ROLES as unknown as [string, ...string[]], {
  message: `Role must be one of: ${USER_ROLES.join(", ")}`,
});

/**
 * Create User Schema (Exactly like server)
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

/**
 * Update User Schema (Exactly like server)
 */
export const updateUserSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
  phone: phoneSchema.optional(),
  picture: pictureSchema.optional(),
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

/**
 * Type for the form values - derived from the schema
 */
export type UserFormValues = z.infer<typeof createUserSchema>;

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

/**
 * Update User Block Status Schema
 */
export const updateUserBlockSchema = z.object({
  isBlocked: z.boolean(),
});

/**
 * Validation helper functions
 */
export function validateUserData<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> {
  return schema.parse(data);
}

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
