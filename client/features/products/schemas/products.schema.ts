import { z } from "zod";

export const productFormSchema = z.object({
  nameAr: z.string().min(1, "الاسم بالعربية مطلوب").max(200),
  nameEn: z.string().min(1, "English name is required").max(200),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  oldPrice: z.number().min(0).optional(),
  costPrice: z.number().min(0).optional(),
  stock: z.number().int().min(0),
  sku: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().optional(),
  brandId: z.string().optional(),
  sectionId: z.string().optional(),
  priority: z.number().int().min(0),
  isShow: z.boolean(),
  mainImage: z.union([z.instanceof(File), z.string()]).optional(),
  images: z.array(z.union([z.instanceof(File), z.string()])).optional(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
