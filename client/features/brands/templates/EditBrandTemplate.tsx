"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { BrandForm } from "../components/BrandForm";
import { useUpdateBrand, useBrandBySlug } from "../hooks/useBrand";
import { useTranslations } from "next-intl";
import { BrandFormData } from "../schemas/brands.schema";
import { Loader2 } from "lucide-react";

interface EditBrandTemplateProps {
  slug: string;
}

export default function EditBrandTemplate({ slug }: EditBrandTemplateProps) {
  const router = useRouter();
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

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-content-tertiary">Brand not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("edit_brand")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" },
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
