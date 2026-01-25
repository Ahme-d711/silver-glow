import { SectionFormData } from "../schemas/sections.schema";

export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
}

export interface Section {
  _id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priority: number;
  slug: string;
  image?: string;
  isShow: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSectionPayload {
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priority?: number;
  image?: string;
  isShow?: boolean;
}

export interface UpdateSectionPayload extends Partial<CreateSectionPayload> {}

export interface GetSectionsParams {
  search?: string;
  isDeleted?: boolean;
}

export type { SectionFormData };
