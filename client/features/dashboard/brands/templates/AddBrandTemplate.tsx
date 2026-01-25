"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { BrandForm } from "../components/BrandForm";
import { useCreateBrand } from "../hooks/useBrand";
import { useTranslations } from "next-intl";
import { BrandFormData } from "../types";

export default function AddBrandTemplate() {
  const router = useRouter();
  const t = useTranslations("Brands");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const { mutate: createBrand, isPending } = useCreateBrand();

  const handleSubmit = (values: BrandFormData | FormData) => {
    createBrand(values, {
      onSuccess: (response) => {
        if (response.success) {
          router.push("/dashboard/brands");
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("add_brand")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" },
          { label: t("title"), href: "/dashboard/brands" },
          { label: t("add_brand") },
        ]}
      />
      
      <BrandForm
        onSubmit={handleSubmit}
        isLoading={isPending}
        onCancel={() => router.back()}
        submitLabel={tCommon("save")}
      />
    </div>
  );
}
