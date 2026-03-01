import * as z from "zod";

export const getAdSchema = (t: (key: string) => string) => z.object({
  photo: z.preprocess((val) => val === "" ? undefined : val, z.union([
    z.custom<File>((val) => val instanceof File),
    z.string().min(1)
  ]).optional()),
  mobilePhoto: z.preprocess((val) => val === "" ? undefined : val, z.union([
    z.custom<File>((val) => val instanceof File),
    z.string().min(1)
  ]).optional()),
  nameAr: z.string().min(1, t("name_ar_required")),
  nameEn: z.string().min(1, t("name_en_required")),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  isShown: z.boolean(),
  priority: z.coerce.number().int(),
  link: z.string().optional(),
  productId: z.string().optional(),
});

export type AdFormValues = z.infer<ReturnType<typeof getAdSchema>>;
