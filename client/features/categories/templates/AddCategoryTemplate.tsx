"use client";

import { useRouter } from "next/navigation";
import { CategoryForm } from "../components/CategoryForm";
import { useCreateCategory } from "../hooks/useCategory";
import { CategoryFormValues } from "../schemas/category.schema";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/PageHeader";

export default function AddCategoryTemplate() {
  const router = useRouter();
  const t = useTranslations("Categories");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  const { mutate: createCategory, isPending } = useCreateCategory();

  const handleSubmit = (payload: CategoryFormValues | FormData) => {
    createCategory(payload, {
      onSuccess: () => {
        router.push("/dashboard/categories");
      },
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("add_category")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" },
          { label: t("title"), href: "/dashboard/categories" },
          { label: t("add_category") },
        ]}
      />

      <CategoryForm
        onSubmit={handleSubmit}
        isLoading={isPending}
        onCancel={handleCancel}
        submitLabel={tCommon("create")}
      />
    </div>
  );
}
