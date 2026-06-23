"use client";

import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { BrandForm } from "../components/BrandForm";
import { useUpdateBrand, useBrandBySlug } from "../hooks/useBrand";
import { useTranslations } from "next-intl";
import { BrandFormData } from "../types";
import { FormPageSkeleton } from "@/components/shared/FormPageSkeleton";
import { PageErrorState } from "@/components/shared/PageErrorState";

export default function EditBrandTemplate() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations("Brands");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const { data: brand, isLoading: isFetching } = useBrandBySlug(slug);
  const { mutate: updateBrand, isPending } = useUpdateBrand();

  const handleSubmit = (values: BrandFormData | FormData) => {
    if (!brand) return;
    
    updateBrand({ id: brand._id, payload: values }, {
      onSuccess: (response) => {
        if (response.success) {
          router.push("/dashboard/brands");
        }
      },
    });
  };

  if (isFetching) return <FormPageSkeleton />;

  if (!brand) {
    return (
      <PageErrorState
        variant="not-found"
        backHref="/dashboard/brands"
        backLabel={t("title")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("edit_brand")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/dashboard" },
          { label: t("title"), href: "/dashboard/brands" },
          { label: t("edit_brand") },
        ]}
      />
      
      <BrandForm
        defaultValues={{
          nameAr: brand.nameAr,
          nameEn: brand.nameEn,
          descriptionAr: brand.descriptionAr,
          descriptionEn: brand.descriptionEn,
          priority: brand.priority,
          isShow: brand.isShow,
          logo: brand.logo,
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
