"use client";

import { useProduct } from "@/features/main/home/hooks/useHome";
import { ProductGallery } from "../components/ProductGallery";
import { ProductInfo } from "../components/ProductInfo";
import { ReviewsTab } from "../components/ReviewsTab";
import { BestsellerProductsSection } from "../components/BestsellerProductsSection";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { StorefrontPageHeader } from "@/components/shared/StorefrontPageHeader";
import MainNavbar from "@/components/MainNavbar";

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
  const productName = isRtl ? product.nameAr : product.nameEn;

  return (
    <>
      <MainNavbar />
      <div className="min-h-screen bg-background pt-38 pb-20">
        <div className="container max-w-7xl mx-auto px-4">
          <StorefrontPageHeader
            title={productName}
            breadcrumbs={[
              { label: t("home") || "Home", href: "/" },
              { label: t("title") || "Shop", href: "/shop" },
              { label: productName },
            ]}
            className="mb-10"
          />

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

          {/* Customer Reviews */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-primary mb-6">
              {t("Reviews") || "Customer Reviews"} ({product.numReviews || 0})
            </h2>
            <ReviewsTab productId={product._id} />
          </div>
        </div>

        {/* Bestseller Products Section */}
        <BestsellerProductsSection />
      </div>
    </>
  );
};

