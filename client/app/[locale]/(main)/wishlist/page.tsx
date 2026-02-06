import { WishlistTemplate } from "@/features/main/wishlist/templates/WishlistTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist | Silver Glow",
  description: "View and manage your favorite products.",
};

export default function WishlistPage() {
  return <WishlistTemplate />;
}
