import { AboutTemplate } from "@/features/main/about/templates/AboutTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Silver Glow",
  description: "Discover Silver Glow — authentic sterling silver jewelry crafted with elegance and lasting quality.",
};

export default function AboutPage() {
  return <AboutTemplate />;
}
