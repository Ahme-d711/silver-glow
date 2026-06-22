import { z } from "zod";

/**
 * Common validation patterns (mirrored from server)
 */
export const USER_ROLES = ["admin", "user"] as const;

export const emailSchema = (t: (key: string) => string) => z
  .string()
  .min(1, t("email_required"))
  .email(t("email_invalid"))
  .max(500, t("email_too_long"))
  .toLowerCase()
  .trim();

export const passwordSchema = (t: (key: string) => string) => z
  .string()
  .min(6, t("password_min"))
  .max(255, t("password_max"))
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    t("password_regex")
  );

export const nameSchema = (t: (key: string) => string) => z
  .string()
  .min(1, t("name_required"))
  .max(500, t("name_too_long"))
  .trim();

export const phoneSchema = (t: (key: string) => string) => z
  .string()
  .min(1, t("phone_required"))
  .max(20, t("phone_too_long"))
  .regex(
    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
    t("phone_invalid")
  );

export const pictureSchema = (t: (key: string) => string) => z
  .string()
  .max(500, t("picture_too_long"))
  .optional()
  .or(z.literal(""));

export const roleSchema = (t: (key: string) => string) => z.enum(USER_ROLES, {
  message: t("role_invalid"),
});

/**
 * Create User Schema (Exactly like server)
 */
export const getCreateUserSchema = (t: (key: string) => string) => z.object({
  name: nameSchema(t),
  email: emailSchema(t),
  password: passwordSchema(t).optional().or(z.literal("")),
  phone: phoneSchema(t),
  picture: pictureSchema(t),
  role: roleSchema(t).default("user"),
  isActive: z.boolean().optional().default(true),
  isVerified: z.boolean().optional().default(false),
  address: z
    .string()
    .max(500, t("address_too_long"))
    .optional(),
  totalOrders: z.coerce.number().int().min(0).optional().default(0),
  totalBalance: z.coerce.number().min(0).optional().default(0),
  lastLoginAt: z.coerce.date().optional(),
  lastTransactionAt: z.coerce.date().optional(),
});

/**
 * Edit User Schema (admin edit — no phone/password)
 */
export const getEditUserSchema = (t: (key: string) => string) => z.object({
  name: nameSchema(t),
  picture: pictureSchema(t).optional(),
  role: roleSchema(t).optional(),
  isActive: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  address: z
    .string()
    .max(500, t("address_too_long"))
    .optional(),
});

/**
 * Type for the form values - derived from the schema
 * We use a static version for the type definition
 */
const staticT = (key: string) => key;
export const createUserSchema = getCreateUserSchema(staticT);
export const editUserSchema = getEditUserSchema(staticT);
export type UserFormValues = z.infer<typeof createUserSchema>;
export type EditUserFormValues = z.infer<typeof editUserSchema>;

/**
 * Get Users Query Schema
 */
export const getUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  search: z.string().optional(),
  role: z.enum(USER_ROLES as unknown as [string, ...string[]]).optional(),
  isActive: z.preprocess((val) => val === "true" ? true : val === "false" ? false : val, z.boolean().optional()),
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
