import { ShopTemplate } from "@/features/main/shop/templates/ShopTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Silver Glow",
  description: "Explore our collection of premium jewelry and silver pieces.",
};

export default function ShopPage() {
  return <ShopTemplate />;
}
