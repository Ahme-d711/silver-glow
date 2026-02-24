export interface Ad {
  _id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  photo: string;
  isShown: boolean;
  priority: number;
  link?: string;
  productId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdsResponse {
  success: boolean;
  message: string;
  data: {
    ads: Ad[];
    pagination: {
      limit: number;
      page: number;
      pages: number;
      total: number;
    };
  };
}
