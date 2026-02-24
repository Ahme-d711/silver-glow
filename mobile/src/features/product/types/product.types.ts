export interface Section {
  _id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  image?: string;
  isShow: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  price: number;
  oldPrice?: number;
  stock: number;
  slug: string;
  mainImage: string;
  images: string[];
  categoryId: string;
  subCategoryId?: string;
  brandId?: string;
  sectionIds: string[];
  averageRating?: number;
  numReviews?: number;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export interface SectionsResponse {
  success: boolean;
  message: string;
  data: {
    sections: Section[];
  };
}

export interface GetProductsParams {
  search?: string;
  categoryId?: string;
  subCategoryId?: string;
  sectionIds?: string[];
  page?: number;
  limit?: number;
  isShow?: boolean;
  sort?: string;
}
