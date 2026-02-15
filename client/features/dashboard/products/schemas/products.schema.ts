import { z } from "zod";

export const getProductFormSchema = (t: (key: string) => string) => z.object({
  nameAr: z.string().min(1, t("name_ar_required")).max(200),
  nameEn: z.string().min(1, t("name_en_required")).max(200),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  price: z.coerce.number().min(0, t("price_positive")),
  oldPrice: z.coerce.number().min(0).optional(),
  costPrice: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().int().min(0).optional(),
  categoryId: z.string().min(1, t("category_required")),
  subCategoryId: z.string().optional(),
  brandId: z.string().optional(),
  sectionIds: z.array(z.string()).default([]),
  sizes: z.array(z.object({
    size: z.string().min(1, t("size_required")),
    stock: z.coerce.number().min(0),
    price: z.coerce.number().min(0),
    oldPrice: z.coerce.number().min(0).optional(),
    costPrice: z.coerce.number().min(0).optional(),
  })).optional().default([]),
  priority: z.coerce.number().int().min(0),
  isShow: z.boolean(),
  mainImage: z.union([z.instanceof(File), z.string()]).optional(),
  images: z.array(z.union([z.instanceof(File), z.string()])).optional(),
});

// For type inference, we use a version without translations
const staticT = (key: string) => key;
export const productFormSchema = getProductFormSchema(staticT);
export type ProductFormData = z.infer<typeof productFormSchema>;
