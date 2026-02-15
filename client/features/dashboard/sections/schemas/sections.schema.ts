import { z } from "zod";

export const getSectionFormSchema = (t: (key: string) => string) => z.object({
  nameAr: z.string().min(1, t("name_ar_required")).max(100),
  nameEn: z.string().min(1, t("name_en_required")).max(100),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  priority: z.coerce.number().int().min(0).default(0),
  isShow: z.boolean().default(true),
});

const staticT = (key: string) => key;
export const sectionFormSchema = getSectionFormSchema(staticT);
export type SectionFormData = z.infer<typeof sectionFormSchema>;
