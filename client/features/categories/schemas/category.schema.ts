import { z } from "zod";

export const categorySchema = z.object({
  nameAr: z.string().min(1, "Arabic name is required").max(100),
  nameEn: z.string().min(1, "English name is required").max(100),
  descriptionAr: z.string().optional().or(z.literal("")),
  descriptionEn: z.string().optional().or(z.literal("")),
  priority: z.number().int().optional().default(0),
  image: z.string().optional().or(z.literal("")),
  isShow: z.boolean().default(true),
});

export const updateCategorySchema = categorySchema.partial();

export type CategoryFormValues = z.infer<typeof categorySchema>;

export interface Category {
  _id: string;
  id?: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priority: number;
  slug: string;
  subcategoriesCount?: number;
  image: string;
  isShow: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
