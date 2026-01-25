"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProductForm } from "../components/ProductForm";
import { useCreateProduct } from "../hooks/useProduct";
import { useTranslations } from "next-intl";
import { ProductFormData } from "../schemas/products.schema";

export default function AddProductTemplate() {
  const router = useRouter();
  const t = useTranslations("Products");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const { mutate: createProduct, isPending } = useCreateProduct();

  const handleSubmit = (values: ProductFormData | FormData) => {
    createProduct(values, {
      onSuccess: (response) => {
        if (response.success) {
          router.push("/dashboard/products");
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("add_product")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" },
          { label: t("title"), href: "/dashboard/products" },
          { label: t("add_product") },
        ]}
      />
      
      <ProductForm
        onSubmit={handleSubmit}
        isLoading={isPending}
        onCancel={() => router.back()}
        submitLabel={tCommon("save")}
      />
    </div>
  );
}
