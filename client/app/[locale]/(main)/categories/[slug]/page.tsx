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
  
  const category = await getPublicCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: "Not Found | Silver Glow",
    };
  }
  const name = isRtl ? category.nameAr : category.nameEn;
  const description = isRtl ? category.descriptionAr : category.descriptionEn;
  
  return {
    title: `${name} | Silver Glow`,
    description: description || name,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  const category = await getPublicCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  return <CategoryDetailsTemplate category={category} />;
}
