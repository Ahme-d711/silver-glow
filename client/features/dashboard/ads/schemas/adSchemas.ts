import * as z from "zod";

export const adSchema = z.object({
  photo: z.preprocess((val) => val === "" ? undefined : val, z.union([
    z.custom<File>((val) => val instanceof File),
    z.string().min(1)
  ]).optional()),
  nameAr: z.string().min(1, "Name (AR) is required"),
  nameEn: z.string().min(1, "Name (EN) is required"),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  isShown: z.boolean(),
  priority: z.coerce.number().int(),
  link: z.string().optional(),
  productId: z.string().optional(),
});

export type AdFormValues = z.infer<typeof adSchema>;
