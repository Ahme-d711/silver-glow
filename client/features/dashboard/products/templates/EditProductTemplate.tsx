"use client";

import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProductForm } from "../components/ProductForm";
import { useUpdateProduct, useProductBySlug } from "../hooks/useProduct";
import { useTranslations } from "next-intl";
import { ProductFormData } from "../schemas/products.schema";
import { FormPageSkeleton } from "@/components/shared/FormPageSkeleton";

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

  if (isFetching) return <FormPageSkeleton />;

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
          priority: product.priority,
          isShow: product.isShow,
          categoryId: typeof product.categoryId === 'object' && product.categoryId !== null ? product.categoryId._id : product.categoryId,
          subCategoryId: typeof product.subCategoryId === 'object' && product.subCategoryId !== null ? product.subCategoryId._id : product.subCategoryId,
          brandId: typeof product.brandId === 'object' && product.brandId !== null ? product.brandId._id : product.brandId,
          sectionId: typeof product.sectionId === 'object' && product.sectionId !== null ? product.sectionId._id : product.sectionId,
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
