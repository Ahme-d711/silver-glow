import { TermsTemplate } from "@/features/main/terms/templates/TermsTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Silver Glow",
  description:
    "Terms governing your use of the Silver Glow website and purchase of sterling silver jewelry.",
};

export default function TermsPage() {
  return <TermsTemplate />;
}
