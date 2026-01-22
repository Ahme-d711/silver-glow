"use client";

import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProductForm } from "../components/ProductForm";
import { useUpdateProduct, useProductBySlug } from "../hooks/useProduct";
import { useTranslations } from "next-intl";
import { ProductFormData } from "../schemas/products.schema";
import { Loader2 } from "lucide-react";

export default function EditProductTemplate() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations("Products");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const { data: product, isLoading: isFetching } = useProductBySlug(slug);
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const handleSubmit = (values: ProductFormData | FormData) => {
    if (!product) return;
    
    updateProduct({ id: product._id, payload: values }, {
      onSuccess: (response) => {
        if (response.success) {
          router.push("/dashboard/products");
        }
      },
    });
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-content-tertiary">Product not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("edit_product")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" },
          { label: t("title"), href: "/dashboard/products" },
          { label: t("edit_product") },
        ]}
      />
      
      <ProductForm
        defaultValues={{
          nameAr: product.nameAr,
          nameEn: product.nameEn,
          descriptionAr: product.descriptionAr,
          descriptionEn: product.descriptionEn,
          price: product.price,
          oldPrice: product.oldPrice,
          costPrice: product.costPrice,
          stock: product.stock,
          sku: product.sku,
          priority: product.priority,
          isShow: product.isShow,
          categoryId: product.categoryId?._id || product.categoryId,
          subCategoryId: product.subCategoryId?._id || product.subCategoryId,
          brandId: product.brandId?._id || product.brandId,
          sectionId: product.sectionId?._id || product.sectionId,
          mainImage: product.mainImage,
          images: product.images,
        }}
        onSubmit={handleSubmit}
        isLoading={isPending}
        onCancel={() => router.back()}
        submitLabel={tCommon("save")}
        isEdit
      />
    </div>
  );
}
