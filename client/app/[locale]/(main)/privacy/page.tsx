import { PrivacyTemplate } from "@/features/main/privacy/templates/PrivacyTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Silver Glow",
  description: "How we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return <PrivacyTemplate />;
}
