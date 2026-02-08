"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { CategoryDetailsTemplate } from "@/features/main/categories/templates/CategoryDetailsTemplate";
import { getPublicCategoryBySlug } from "@/features/main/home/services/home.service";
import { useEffect, useState } from "react";
import { Category } from "@/features/dashboard/categories/services/category.service";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategory() {
      setLoading(true);
      const data = await getPublicCategoryBySlug(slug);
      setCategory(data);
      setLoading(false);
      
      if (!data) {
        notFound();
      }
    }
    
    fetchCategory();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-40 pb-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary rounded w-64 mb-8" />
            <div className="h-12 bg-secondary rounded w-96 mb-12" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-4/5 bg-secondary rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    notFound();
  }

  return <CategoryDetailsTemplate category={category} />;
}
