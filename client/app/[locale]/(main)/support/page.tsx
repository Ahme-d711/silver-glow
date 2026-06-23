import { SupportTemplate } from "@/features/main/support/templates/SupportTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Support | Silver Glow",
  description: "Get help with your orders, returns, and product questions.",
};

export default function SupportPage() {
  return <SupportTemplate />;
}
