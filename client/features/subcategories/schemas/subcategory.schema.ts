import { z } from "zod";

export const subcategorySchema = z.object({
  nameAr: z.string().min(1, "Arabic name is required").max(100),
  nameEn: z.string().min(1, "English name is required").max(100),
  categoryId: z.string().min(1, "Parent category is required"),
  descriptionAr: z.string().optional().or(z.literal("")),
  descriptionEn: z.string().optional().or(z.literal("")),
  priority: z.coerce.number().int().optional().default(0),
  image: z.string().optional().or(z.literal("")),
  isShow: z.boolean().default(true),
});

export const updateSubcategorySchema = subcategorySchema.partial();

export type SubcategoryFormValues = z.infer<typeof subcategorySchema>;

export interface Subcategory {
  _id: string;
  id?: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priority: number;
  slug: string;
  categoryId: string; // ID of the parent category
  categoryNameAr?: string;
  categoryNameEn?: string;
  image: string;
  isShow: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
