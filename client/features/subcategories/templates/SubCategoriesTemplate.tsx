"use client";

import { useRouter } from "next/navigation";
import { Plus, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import SubCategoriesTable from "../components/SubCategoriesTable";
import NoDataMsg from "@/components/shared/NoDataMsg";
import { useSubcategories, useDeleteSubcategory } from "../hooks/useSubCategory";
import { Subcategory } from "../services/subcategory.service";
import { useTranslations } from "next-intl";

export default function SubCategoriesTemplate() {
  const router = useRouter();
  const t = useTranslations("SubCategories");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const { data: subcategoriesData = [], isLoading } = useSubcategories();
  const { mutate: deleteSubcategory } = useDeleteSubcategory();

  const subcategories = subcategoriesData;

  const handleEdit = (subcategory: Subcategory) => {
    router.push(`/dashboard/subcategories/edit/${subcategory._id}`);
  };

  const actionButtons = [
    {
      label: tCommon("export"),
      icon: Download,
      variant: "outline" as const,
      className: "bg-secondary/10 text-primary border-none hover:bg-secondary/20 font-bold h-11 px-6 rounded-xl",
      onClick: () => console.log("Exporting...")
    },
    {
      label: t("add_subcategory"),
      icon: Plus,
      href: "/dashboard/subcategories/add",
      className: "bg-primary text-white font-bold hover:bg-primary/90 shadow-md active:scale-95 h-11 px-6 rounded-xl",
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        breadcrumbs={[
          { label: tNav("dashboard"), href: "/" }, 
          { label: t("title") }
        ]}
        actionButtons={actionButtons}
      />

      <div className="bg-white rounded-[24px] border border-divider overflow-hidden">
        {!isLoading && subcategories.length === 0 ? (
          <NoDataMsg 
            title={t("title")}
            description={tCommon("no_data_desc")}

            additionalMessage=""
          />
        ) : (
          <SubCategoriesTable
            subcategories={subcategories}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={(id) => deleteSubcategory(id)}
          />
        )}
      </div>
    </div>
  );
}
