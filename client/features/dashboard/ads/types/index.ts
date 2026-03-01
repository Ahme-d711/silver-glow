export interface Ad {
  _id: string;
  id: string; // Legacy field often added by virtuals or toJSON
  photo: string;
  mobilePhoto?: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  isShown: boolean;
  priority: number;
  link?: string;
  productId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdResponse {
  success: boolean;
  message?: string;
  data?: {
    ad: Ad;
  };
}

export interface AdCard {
  id: string;
  title: string;
  image: string;
  mobileImage?: string;
  isActive: boolean;
  showOnHome: boolean;
}
