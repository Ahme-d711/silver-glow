import { WorksTemplate } from "@/features/main/works/templates/WorksTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Collections | Silver Glow",
  description: "Explore Silver Glow sterling silver jewelry collections and signature lines.",
};

export default function WorksPage() {
  return <WorksTemplate />;
}
