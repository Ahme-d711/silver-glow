export interface HomeReview {
  _id: string;
  userId: {
    _id: string;
    name: string;
    picture?: string;
  };
  productId: {
    _id: string;
    nameEn: string;
    nameAr: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}
