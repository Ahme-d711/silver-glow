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
    categoryId: any; // Will be populated
    subCategoryId?: any;
    brandId?: any;
    sectionId?: any;
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
