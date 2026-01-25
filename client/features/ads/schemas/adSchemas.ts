import * as z from "zod";

export const adSchema = z.object({
  photo: z.any().refine((file) => !!file, { message: "Photo is required" }),
  nameAr: z.string().min(1, "Name (AR) is required"),
  nameEn: z.string().min(1, "Name (EN) is required"),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  isShown: z.boolean().default(true),
  priority: z.coerce.number().int().optional().default(0),
  link: z.string().optional(),
  productId: z.string().optional(),
});

export type AdFormValues = z.infer<typeof adSchema>;
