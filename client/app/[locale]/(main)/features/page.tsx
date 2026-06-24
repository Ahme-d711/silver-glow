import { FeaturesTemplate } from "@/features/main/features/templates/FeaturesTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | Silver Glow",
  description: "Discover the Silver Glow experience — authentic sterling silver, fast delivery, and premium shopping.",
};

export default function FeaturesPage() {
  return <FeaturesTemplate />;
}
