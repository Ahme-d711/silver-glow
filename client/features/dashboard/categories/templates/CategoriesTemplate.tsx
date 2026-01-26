"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import CategoriesTable from "../components/CategoriesTable";
import NoDataMsg from "@/components/shared/NoDataMsg";
import { useCategories, useDeleteCategory } from "../hooks/useCategory";
import { Category } from "../services/category.service";
import { useTranslations } from "next-intl";
import { TableFilters } from "@/components/shared/TableFilters";
import { TablePageSkeleton } from "@/components/shared/TablePageSkeleton";
import { useState } from "react";

export default function CategoriesTemplate() {
  const router = useRouter();
  const t = useTranslations("Categories");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: categoriesData = [], isLoading } = useCategories({
    isDeleted: activeTab === "all" ? undefined : activeTab === "deleted",
    search
  });
  const { mutate: deleteCategory } = useDeleteCategory();

  if (isLoading) return <TablePageSkeleton columnCount={6} rowCount={10} />;

  const categories = categoriesData;

  const handleEdit = (category: Category) => {
    router.push(`/dashboard/categories/edit/${category.slug}`);
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
      label: t("add_category"),
      icon: Plus,
      href: "/dashboard/categories/add",
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
        <TableFilters
          tabs={[
            { label: tCommon("all"), value: "all" },
            { label: tCommon("active"), value: "active" },
            { label: tCommon("deleted"), value: "deleted" },
          ]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {!isLoading && categories.length === 0 ? (
           <NoDataMsg 
             title={t("title")}
             description={tCommon("no_data_desc")}
             additionalMessage=""
           />
        ) : (
          <CategoriesTable
            categories={categories}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={(id) => deleteCategory(id)}
          />
        )}
      </div>
    </div>
  );
}
