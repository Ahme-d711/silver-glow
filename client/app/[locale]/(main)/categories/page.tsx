import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CategoriesTemplate } from "@/features/main/categories/templates/CategoriesTemplate";

interface CategoriesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CategoriesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Navigation" });
  
  return {
    title: `${t("categories")} | Silver Glow`,
    description: t("categories")
  };
}

export default function CategoriesPage() {
  return <CategoriesTemplate />;
}
