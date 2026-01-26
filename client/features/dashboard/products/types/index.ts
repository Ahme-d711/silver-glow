import { PopulatedField, CategoryReference, SubCategoryReference, BrandReference, SectionReference, Pagination } from "@/types";

export interface Product {
    _id: string;
    nameAr: string;
    nameEn: string;
    descriptionAr?: string;
    descriptionEn?: string;
    price: number;
    oldPrice?: number;
    costPrice?: number;
    stock: number;
    sku?: string;
    slug: string;
    mainImage: string;
    images: string[];
    categoryId: PopulatedField<CategoryReference>;
    subCategoryId?: PopulatedField<SubCategoryReference>;
    brandId?: PopulatedField<BrandReference>;
    sectionId?: PopulatedField<SectionReference>;
    priority: number;
    isShow: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductPayload {
    nameAr: string;
    nameEn: string;
    descriptionAr?: string;
    descriptionEn?: string;
    price: number;
    oldPrice?: number;
    costPrice?: number;
    stock?: number;
    sku?: string;
    categoryId: string;
    subCategoryId?: string;
    brandId?: string;
    sectionId?: string;
    priority?: number;
    isShow?: boolean;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {}

export interface GetProductsParams {
    search?: string;
    categoryId?: string;
    subCategoryId?: string;
    brandId?: string;
    sectionId?: string;
    isDeleted?: boolean;
    isShow?: boolean;
    page?: number;
    limit?: number;
}

export interface ServiceResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: unknown;
}

// Re-export Pagination for convenience
export type { Pagination };
