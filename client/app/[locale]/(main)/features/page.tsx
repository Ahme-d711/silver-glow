import { FeaturesTemplate } from "@/features/main/features/templates/FeaturesTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | Silver Glow",
  description: "Discover what makes Silver Glow the ultimate shopping destination.",
};

export default function FeaturesPage() {
  return <FeaturesTemplate />;
}
