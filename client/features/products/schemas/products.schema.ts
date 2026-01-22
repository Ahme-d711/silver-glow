import { z } from "zod";

export const productFormSchema = z.object({
  nameAr: z.string().min(1, "الاسم بالعربية مطلوب").max(200),
  nameEn: z.string().min(1, "English name is required").max(200),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be positive"),
  oldPrice: z.coerce.number().min(0).optional(),
  costPrice: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().int().min(0).default(0),
  sku: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().optional(),
  brandId: z.string().optional(),
  sectionId: z.string().optional(),
  priority: z.coerce.number().int().min(0).default(0),
  isShow: z.boolean().default(true),
  mainImage: z.any().optional(),
  images: z.any().array().optional(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
