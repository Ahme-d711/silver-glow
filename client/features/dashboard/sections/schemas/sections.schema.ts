import { z } from "zod";

export const sectionFormSchema = z.object({
  nameAr: z.string().min(1, "الاسم بالعربية مطلوب").max(100),
  nameEn: z.string().min(1, "English name is required").max(100),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  priority: z.coerce.number().int().min(0).default(0),
  isShow: z.boolean().default(true),
});

export type SectionFormData = z.infer<typeof sectionFormSchema>;
