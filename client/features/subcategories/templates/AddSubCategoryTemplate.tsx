"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SubCategoryForm } from "../components/SubCategoryForm";
import { useCreateSubcategory } from "../hooks/useSubCategory";
import { SubcategoryFormValues } from "../schemas/subcategory.schema";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/PageHeader";

export default function AddSubCategoryTemplate() {
  const router = useRouter();
  const t = useTranslations("SubCategories");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  const { mutate: createSubcategory, isPending } = useCreateSubcategory();

  const handleSubmit = (payload: SubcategoryFormValues | FormData) => {
    createSubcategory(payload, {
      onSuccess: () => {
        router.push("/dashboard/subcategories");
      },
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("add_subcategory")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" },
          { label: t("title"), href: "/dashboard/subcategories" },
          { label: t("add_subcategory") },
        ]}
      />

      <SubCategoryForm
        onSubmit={handleSubmit}
        isLoading={isPending}
        onCancel={handleCancel}
        submitLabel={tCommon("create")}
      />
    </div>
  );
}
