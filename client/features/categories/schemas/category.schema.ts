import { z } from "zod";

export const categorySchema = z.object({
  nameAr: z.string().min(1, "Arabic name is required").max(100),
  nameEn: z.string().min(1, "English name is required").max(100),
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
  image: string;
  isShow: boolean;
  createdAt: string;
  updatedAt: string;
}
