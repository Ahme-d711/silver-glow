import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { CategoryDetailsTemplate } from "@/features/main/categories/templates/CategoryDetailsTemplate";
import { getPublicCategoryBySlug } from "@/features/main/home/services/home.service";

interface CategoryPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isRtl = locale === 'ar';
  
  const response = await getCategoryBySlug(slug);
  
  if (!response.success || !response.data?.category) {
    return {
      title: "Not Found | Silver Glow",
    };
  }

  const category = response.data.category;
  const name = isRtl ? category.nameAr : category.nameEn;
  const description = isRtl ? category.descriptionAr : category.descriptionEn;
  
  return {
    title: `${name} | Silver Glow`,
    description: description || name,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  const response = await getCategoryBySlug(slug);
  
  if (!response.success || !response.data?.category) {
    notFound();
  }

  return <CategoryDetailsTemplate category={response.data.category as any} />;
}
