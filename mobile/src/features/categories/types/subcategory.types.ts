export interface Subcategory {
  _id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  slug: string;
  image?: string;
  categoryId: string;
  priority: number;
  isShow: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubcategoriesResponse {
  success: boolean;
  message: string;
  data: {
    subcategories: Subcategory[];
  };
}
