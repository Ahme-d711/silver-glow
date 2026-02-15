import { z } from "zod";

export const getSubcategorySchema = (t: (key: string) => string) => z.object({
  nameAr: z.string().min(1, t("name_ar_required")).max(100),
  nameEn: z.string().min(1, t("name_en_required")).max(100),
  categoryId: z.string().min(1, t("category_required")),
  descriptionAr: z.string().optional().or(z.literal("")),
  descriptionEn: z.string().optional().or(z.literal("")),
  priority: z.coerce.number().int().optional().default(0),
  image: z.string().optional().or(z.literal("")),
  isShow: z.boolean().default(true),
});

const staticT = (key: string) => key;
export const subcategorySchema = getSubcategorySchema(staticT);
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
