import { DeliveryTemplate } from "@/features/main/delivery/templates/DeliveryTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery Details | Silver Glow",
  description: "Shipping methods, costs, and delivery estimates.",
};

export default function DeliveryPage() {
  return <DeliveryTemplate />;
}
