import { z } from "zod";

export const subcategorySchema = z.object({
  nameAr: z.string().min(1, "Arabic name is required").max(100),
  nameEn: z.string().min(1, "English name is required").max(100),
  categoryId: z.string().min(1, "Parent category is required"),
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
  categoryId: string; // ID of the parent category
  categoryNameAr?: string;
  categoryNameEn?: string;
  image: string;
  isShow: boolean;
  createdAt: string;
  updatedAt: string;
}
