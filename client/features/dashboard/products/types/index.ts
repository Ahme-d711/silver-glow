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
    sizes?: { 
        size: string; 
        stock: number;
        price: number;
        oldPrice?: number;
        costPrice?: number;
    }[];
    categoryId: PopulatedField<CategoryReference>;
    subCategoryId?: PopulatedField<SubCategoryReference>;
    brandId?: PopulatedField<BrandReference>;
    sectionIds: PopulatedField<SectionReference>[];
    priority: number;
    isShow: boolean;
    isDeleted: boolean;
    averageRating?: number;
    numReviews?: number;
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
    sizes?: { 
        size: string; 
        stock: number;
        price: number;
        oldPrice?: number;
        costPrice?: number;
    }[];
    categoryId: string;
    subCategoryId?: string;
    brandId?: string;
    sectionIds: string[];
    priority?: number;
    isShow?: boolean;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {}

export interface GetProductsParams {
    search?: string;
    categoryId?: string;
    subCategoryId?: string;
    brandId?: string;
    sectionIds?: string[];
    isDeleted?: boolean;
    isShow?: boolean;
    page?: number;
    limit?: number;
    sort?: string;
    categorySlug?: string;
}

export interface ServiceResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: unknown;
}

// Re-export Pagination for convenience
export type { Pagination };
