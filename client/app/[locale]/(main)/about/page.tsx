import { AboutTemplate } from "@/features/main/about/templates/AboutTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Silver Glow",
  description: "Learn more about Silver Glow and our commitment to premium quality fashion.",
};

export default function AboutPage() {
  return <AboutTemplate />;
}
