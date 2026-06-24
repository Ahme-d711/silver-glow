import { CartItem } from "../types/cart.types";

export type PopulatedCartItem = {
  productId: {
    _id: string;
    nameEn: string;
    nameAr: string;
    price: number;
    mainImage: string;
    stock: number;
    sizes?: Array<{ size: string; stock: number; price: number }>;
  } | null;
  size?: string;
  quantity: number;
};

export const mapCartItems = (items: PopulatedCartItem[]): CartItem[] =>
  items
    .filter((item) => item.productId)
    .map((item) => {
      const product = item.productId!;
      const selectedSizeData =
        item.size && product.sizes
          ? product.sizes.find((s) => s.size === item.size)
          : null;

      return {
        id: `${product._id}-${item.size || "nosize"}`,
        productId: product._id,
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        price: selectedSizeData?.price ?? product.price,
        mainImage: product.mainImage,
        size: item.size || "N/A",
        quantity: item.quantity,
        stock: selectedSizeData?.stock ?? product.stock,
      };
    });

export const getSubtotal = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

export const getTotalItems = (items: CartItem[]) => items.length;
