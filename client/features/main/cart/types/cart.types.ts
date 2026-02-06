export interface CartItem {
  id: string; // productId + size
  productId: string;
  nameEn: string;
  nameAr: string;
  price: number;
  mainImage: string;
  size: string;
  quantity: number;
  stock: number;
  isSynced?: boolean;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setItems: (items: CartItem[]) => void;
  clearCart: () => void;
}
