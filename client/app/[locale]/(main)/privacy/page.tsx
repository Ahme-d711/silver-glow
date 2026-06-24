import { PrivacyTemplate } from "@/features/main/privacy/templates/PrivacyTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Silver Glow",
  description:
    "How Silver Glow collects, uses, retains, and protects your personal data under applicable Egyptian law.",
};

export default function PrivacyPage() {
  return <PrivacyTemplate />;
}
