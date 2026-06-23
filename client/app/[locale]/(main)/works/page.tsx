import { WorksTemplate } from "@/features/main/works/templates/WorksTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Works | Silver Glow",
  description: "Explore our latest collections and creative projects.",
};

export default function WorksPage() {
  return <WorksTemplate />;
}
