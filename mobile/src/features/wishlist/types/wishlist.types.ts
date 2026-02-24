import { Product } from "../../product/types/product.types";

export interface Wishlist {
  _id: string;
  userId: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface WishlistResponse {
  success: boolean;
  message: string;
  data: {
    wishlist: Wishlist;
  };
}

export interface ToggleWishlistResponse {
  success: boolean;
  message: string;
  data: {
    wishlist: {
      _id: string;
      userId: string;
      products: string[];
    };
  };
}
