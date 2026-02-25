import { Product } from "../../product/types/product.types";

export interface CartItem {
  _id: string;
  productId: Product;
  quantity: number;
  size?: string;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartResponse {
  success: boolean;
  message: string;
  data: {
    cart: Cart;
  };
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  size?: string;
}

export interface UpdateCartItemPayload {
  productId: string;
  quantity: number;
  size?: string;
}
