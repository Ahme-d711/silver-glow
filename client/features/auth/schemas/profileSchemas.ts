import { z } from "zod"

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  gender: z.enum(["male", "female"]).optional(),
  image: z.file().optional(), // File object for upload
})

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>

// API Response Type
export interface UpdatedUser {
  id: string
  name: string
  phone: string
  gender?: string
  type: string
  profileImage: string
  active: boolean
  verifiedPhone: boolean
  createdAt: string
  walletBalance: number
}

