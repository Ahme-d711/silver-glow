"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionForm } from "../components/SectionForm";
import { useUpdateSection, useSectionBySlug } from "../hooks/useSection";
import { useTranslations } from "next-intl";
import { SectionFormData } from "../schemas/sections.schema";
import { Loader2 } from "lucide-react";

interface EditSectionTemplateProps {
  slug: string;
}

export default function EditSectionTemplate({ slug }: EditSectionTemplateProps) {
  const router = useRouter();
  const t = useTranslations("Sections");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const { data: section, isLoading: isFetching } = useSectionBySlug(slug);
  const { mutate: updateSection, isPending } = useUpdateSection();

  const handleSubmit = (values: SectionFormData | FormData) => {
    if (!section) return;
    
    updateSection({ id: section._id, payload: values }, {
      onSuccess: (response) => {
        if (response.success) {
          router.push("/dashboard/sections");
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

  if (!section) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-content-tertiary">Section not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("edit_section")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" },
          { label: t("title"), href: "/dashboard/sections" },
          { label: t("edit_section") },
        ]}
      />
      
      <SectionForm
        defaultValues={{
          nameAr: section.nameAr,
          nameEn: section.nameEn,
          descriptionAr: section.descriptionAr,
          descriptionEn: section.descriptionEn,
          priority: section.priority,
          isShow: section.isShow,
          image: section.image,
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
