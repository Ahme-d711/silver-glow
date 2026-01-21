"use client";

import React, { useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { SubCategoryForm } from "../components/SubCategoryForm";
import { useSubcategory, useUpdateSubcategory } from "../hooks/useSubCategory";
import { SubcategoryFormValues } from "../schemas/subcategory.schema";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/PageHeader";
import UniLoading from "@/components/shared/UniLoading";
import NoDataMsg from "@/components/shared/NoDataMsg";

export default function EditSubCategoryTemplate() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const t = useTranslations("SubCategories");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");

  const { data: subcategory, isLoading, error } = useSubcategory(id);
  const { mutate: updateSubcategory, isPending } = useUpdateSubcategory();

  const handleSubmit = (payload: SubcategoryFormValues | FormData) => {
    updateSubcategory(
      { id, payload },
      {
        onSuccess: () => {
          router.push("/dashboard/subcategories");
        },
      }
    );
  };

  const handleCancel = () => {
    router.back();
  };

  const defaultValues: Partial<SubcategoryFormValues> = useMemo(() => {
    if (!subcategory) return {};
    return {
      nameAr: subcategory.nameAr,
      nameEn: subcategory.nameEn,
      categoryId: subcategory.categoryId,
      image: subcategory.image,
      isShow: subcategory.isShow,
    };
  }, [subcategory]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={t("edit_subcategory")}
          breadcrumbs={[
            { label: tNav("dashboard"), href: "/" },
            { label: t("title"), href: "/dashboard/subcategories" },
            { label: t("edit_subcategory") },
          ]}
        />
        <UniLoading />
      </div>
    );
  }

  if (error || !subcategory) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={t("edit_subcategory")}
          breadcrumbs={[
            { label: tNav("dashboard"), href: "/" },
            { label: t("title"), href: "/dashboard/subcategories" },
            { label: t("edit_subcategory") },
          ]}
        />
        <NoDataMsg 
          title={tCommon("error_loading")} 
          description={tCommon("try_again_later")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("edit_subcategory")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" },
          { label: t("title"), href: "/dashboard/subcategories" },
          { label: t("edit_subcategory") },
        ]}
      />

      <SubCategoryForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isLoading={isPending}
        onCancel={handleCancel}
        submitLabel={tCommon("save")}
        isEdit={true}
      />
    </div>
  );
}
