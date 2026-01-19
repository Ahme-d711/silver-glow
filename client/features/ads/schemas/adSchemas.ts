import * as z from "zod"

export const adSchema = z.object({
  photo: z.any().optional(),
  name: z.string().min(1, "Name is required"),
  isShown: z.boolean(),
  note: z.string().optional(),
})

export type AdFormValues = z.infer<typeof adSchema>

// API Response Type


