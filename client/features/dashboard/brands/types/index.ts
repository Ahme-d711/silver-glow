import { BrandFormData } from "../schemas/brands.schema";

export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
}

export interface Brand {
  _id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priority: number;
  slug: string;
  logo?: string;
  isShow: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBrandPayload {
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priority?: number;
  logo?: string;
  isShow?: boolean;
}

export interface UpdateBrandPayload extends Partial<CreateBrandPayload> {}

export interface GetBrandsParams {
  search?: string;
  isDeleted?: boolean;
}

export type { BrandFormData };
