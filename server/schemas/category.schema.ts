import { z } from "zod";

export const createCategorySchema = z.object({
  nameAr: z.string().min(1, "Arabic name is required").max(100),
  nameEn: z.string().min(1, "English name is required").max(100),
  image: z.string().optional(),
  isShow: z.preprocess(
    (val) => val === "true" || val === true,
    z.boolean().default(true)
  ),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

export const getCategoriesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  search: z.string().optional(),
  isShow: z.preprocess(
    (val) => val === "true" ? true : val === "false" ? false : val,
    z.boolean().optional()
  ),
});
