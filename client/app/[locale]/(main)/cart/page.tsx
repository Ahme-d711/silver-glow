import { CartTemplate } from "@/features/main/cart/templates/CartTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | Silver Glow",
  description: "View and manage items in your shopping cart.",
};

export default function CartPage() {
  return <CartTemplate />;
}
