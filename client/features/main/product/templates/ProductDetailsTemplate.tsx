"use client";

import { useProduct } from "@/features/main/home/hooks/useHome";
import { ProductGallery } from "../components/ProductGallery";
import { ProductInfo } from "../components/ProductInfo";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";
import MainFooter from "@/components/MainFooter";
import MainNavbar from "@/components/MainNavbar";
import { cn } from "@/lib/utils";

interface ProductDetailsTemplateProps {
  slug: string;
}

export const ProductDetailsTemplate: React.FC<ProductDetailsTemplateProps> = ({ slug }) => {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const isRtl = locale === "ar";

  console.log("slug", slug);
  
  const { data: product, isLoading, isError } = useProduct(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex gap-2">
            <div className="h-4 w-4 rounded-full bg-primary animate-bounce decoration-75"></div>
            <div className="h-4 w-4 rounded-full bg-primary animate-bounce decoration-100"></div>
            <div className="h-4 w-4 rounded-full bg-primary animate-bounce decoration-150"></div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-primary">{t("Product not found")}</h1>
        <Link href="/shop" className="text-primary underline hover:text-primary/80">
          {t("Return to Shop")}
        </Link>
      </div>
    );
  }

  const images = [product.mainImage, ...product.images];

  return (
    <>
      <MainNavbar />
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-content-secondary mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              {t("Home") || "Home"}
            </Link>
            <ChevronRight className={cn("w-4 h-4", isRtl && "rotate-180")} />
            <Link href="/shop" className="hover:text-primary transition-colors">
              {t("Shop") || "Shop"}
            </Link>
            <ChevronRight className={cn("w-4 h-4", isRtl && "rotate-180")} />
            <span className="text-primary font-medium truncate max-w-[200px]">
              {isRtl ? product.nameAr : product.nameEn}
            </span>
          </nav>

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
            {/* Gallery */}
            <ProductGallery 
              images={images} 
              name={isRtl ? product.nameAr : product.nameEn} 
            />

            {/* Info */}
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

