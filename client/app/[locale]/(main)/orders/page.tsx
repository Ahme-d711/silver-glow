import { OrdersTemplate } from "@/features/main/orders/templates/OrdersTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Silver Glow",
  description: "View and track your jewelry orders.",
};

export default function OrdersPage() {
  return <OrdersTemplate />;
}
