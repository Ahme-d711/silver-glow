"use client";

import { useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { CategoryForm } from "../components/CategoryForm";
import { useCategory, useUpdateCategory } from "../hooks/useCategory";
import { CategoryFormValues } from "../schemas/category.schema";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/PageHeader";
import UniLoading from "@/components/shared/UniLoading";
import NoDataMsg from "@/components/shared/NoDataMsg";

export default function EditCategoryTemplate() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const t = useTranslations("Categories");
  const tCommon = useTranslations("Common");

  const { data: category, isLoading, error } = useCategory(id);
  const { mutate: updateCategory, isPending } = useUpdateCategory();

  const handleSubmit = (payload: CategoryFormValues | FormData) => {
    updateCategory(
      { id, payload },
      {
        onSuccess: () => {
          router.push("/dashboard/categories");
        },
      }
    );
  };

  const handleCancel = () => {
    router.back();
  };

  const defaultValues: Partial<CategoryFormValues> = useMemo(() => {
    if (!category) return {};
    return {
      nameAr: category.nameAr,
      nameEn: category.nameEn,
      image: category.image,
      isShow: category.isShow,
    };
  }, [category]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={t("edit_category")}
          breadcrumbs={[
            { label: tCommon("dashboard"), href: "/" },
            { label: t("title"), href: "/dashboard/categories" },
            { label: t("edit_category") },
          ]}
        />
        <UniLoading />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={t("edit_category")}
          breadcrumbs={[
            { label: tCommon("dashboard"), href: "/" },
            { label: t("title"), href: "/dashboard/categories" },
            { label: t("edit_category") },
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
        title={t("edit_category")}
        breadcrumbs={[
          { label: tCommon("dashboard"), href: "/" },
          { label: t("title"), href: "/dashboard/categories" },
          { label: t("edit_category") },
        ]}
      />

      <div className="bg-white rounded-3xl p-6 border border-divider max-w-2xl mx-auto shadow-sm">
        <CategoryForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isLoading={isPending}
          onCancel={handleCancel}
          submitLabel={tCommon("save")}
          isEdit={true}
        />
      </div>
    </div>
  );
}
