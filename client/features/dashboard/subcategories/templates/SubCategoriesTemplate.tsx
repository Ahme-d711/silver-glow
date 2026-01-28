"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import SubCategoriesTable from "../components/SubCategoriesTable";
import NoDataMsg from "@/components/shared/NoDataMsg";
import { useSubcategories, useDeleteSubcategory } from "../hooks/useSubCategory";
import { Subcategory } from "../services/subcategory.service";
import { useTranslations } from "next-intl";
import { TableFilters } from "@/components/shared/TableFilters";
import { TablePageSkeleton } from "@/components/shared/TablePageSkeleton";
import { useState } from "react";
import { toast } from "sonner";

import { format } from "date-fns";
import { exportToExcel } from "@/utils/excelExport";

export default function SubCategoriesTemplate() {
  const router = useRouter();
  const t = useTranslations("SubCategories");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");

  const [selectedSubcategories, setSelectedSubcategories] = useState<Subcategory[]>([]);

  const handleExport = () => {
    if (subcategories.length === 0 || selectedSubcategories.length === 0) {
      toast.error(tCommon("no_data_to_export") || "No data to export");
      return;
    }

    const dataToExport = selectedSubcategories.map((sub: Subcategory) => ({
      [tCommon("name_ar")]: sub.nameAr,
      [tCommon("name_en")]: sub.nameEn,
      [tCommon("priority")]: sub.priority,
      [t("category")]: typeof sub.categoryId === "object" ? (sub.categoryId as any).nameEn : "-",
      [tCommon("status")]: sub.isDeleted ? tCommon("deleted") : tCommon("active"),
      "Slug": sub.slug,
      [tCommon("date")]: sub.createdAt ? format(new Date(sub.createdAt), "dd MMM yyyy") : "-",
    }));

    exportToExcel(dataToExport, {
      filename: `SubCategories_${format(new Date(), "yyyy-MM-dd")}.xlsx`,
      sheetName: "SubCategories",
    });
  };

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: subcategoriesData = [], isLoading } = useSubcategories({
    isDeleted: activeTab === "all" ? undefined : activeTab === "deleted",
    search
  });
  const { mutate: deleteSubcategory } = useDeleteSubcategory();

  if (isLoading) return <TablePageSkeleton columnCount={7} rowCount={10} />;

  const subcategories = subcategoriesData;

  const handleEdit = (subcategory: Subcategory) => {
    router.push(`/dashboard/subcategories/edit/${subcategory.slug}`);
  };

  const actionButtons = [
    {
      label: tCommon("export"),
      icon: Download,
      variant: "secondary" as const,
      onClick: handleExport
    },
    {
      label: t("add_subcategory"),
      icon: Plus,
      href: "/dashboard/subcategories/add",
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
            onSelectionChange={setSelectedSubcategories}
          />
        )}
      </div>
    </div>
  );
}
