import { DeliveryTemplate } from "@/features/main/delivery/templates/DeliveryTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery Details | Silver Glow",
  description: "Shipping rates, packaging, and delivery info for your sterling silver jewelry orders.",
};

export default function DeliveryPage() {
  return <DeliveryTemplate />;
}
