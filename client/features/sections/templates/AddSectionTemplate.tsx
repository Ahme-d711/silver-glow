"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionForm } from "../components/SectionForm";
import { useCreateSection } from "../hooks/useSection";
import { useTranslations } from "next-intl";
import { SectionFormData } from "../types";

export default function AddSectionTemplate() {
  const router = useRouter();
  const t = useTranslations("Sections");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const { mutate: createSection, isPending } = useCreateSection();

  const handleSubmit = (values: SectionFormData | FormData) => {
    createSection(values, {
      onSuccess: (response) => {
        if (response.success) {
          router.push("/dashboard/sections");
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("add_section")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" },
          { label: t("title"), href: "/dashboard/sections" },
          { label: t("add_section") },
        ]}
      />
      
      <SectionForm
        onSubmit={handleSubmit}
        isLoading={isPending}
        onCancel={() => router.back()}
        submitLabel={tCommon("save")}
      />
    </div>
  );
}
