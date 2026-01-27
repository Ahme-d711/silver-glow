"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import SectionsTable from "../components/SectionsTable";
import NoDataMsg from "@/components/shared/NoDataMsg";
import { useSections, useDeleteSection } from "../hooks/useSection";
import { Section } from "../types";
import { useTranslations } from "next-intl";
import { TableFilters } from "@/components/shared/TableFilters";
import { TablePageSkeleton } from "@/components/shared/TablePageSkeleton";
import { useState } from "react";
import { toast } from "sonner";

import { format } from "date-fns";
import { exportToExcel } from "@/utils/excelExport";

export default function SectionsTemplate() {
  const router = useRouter();
  const t = useTranslations("Sections");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");

  const [selectedSections, setSelectedSections] = useState<Section[]>([]);

  const handleExport = () => {
    if (sectionsData.length === 0 || selectedSections.length === 0) {
      toast.error(tCommon("no_data_to_export") || "No data to export");
      return;
    }

    const dataToExport = selectedSections.map((section: Section) => ({
      [tCommon("nameAr")]: section.nameAr,
      [tCommon("nameEn")]: section.nameEn,
      [tCommon("priority")]: section.priority,
      [tCommon("status")]: section.isDeleted ? tCommon("deleted") : tCommon("active"),
      "Slug": section.slug,
      [tCommon("date")]: section.createdAt ? format(new Date(section.createdAt), "dd MMM yyyy") : "-",
    }));

    exportToExcel(dataToExport, {
      filename: `Sections_${format(new Date(), "yyyy-MM-dd")}.xlsx`,
      sheetName: "Sections",
    });
  };

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: sectionsData = [], isLoading } = useSections({
    isDeleted: activeTab === "all" ? undefined : activeTab === "deleted",
    search
  });
  const { mutate: deleteSection } = useDeleteSection();

  if (isLoading) return <TablePageSkeleton columnCount={7} rowCount={10} />;

  const sections = sectionsData;

  const handleEdit = (section: Section) => {
    router.push(`/dashboard/sections/edit/${section.slug}`);
  };

  const actionButtons = [
    {
      label: tCommon("export"),
      icon: Download,
      variant: "secondary" as const,
      onClick: handleExport
    },
    {
      label: t("add_section"),
      icon: Plus,
      href: "/dashboard/sections/add",
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

        {!isLoading && sections.length === 0 ? (
           <NoDataMsg 
             title={t("title")}
             description={tCommon("no_data_desc")}
             additionalMessage=""
           />
        ) : (
          <SectionsTable
            sections={sections}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={(id) => deleteSection(id)}
            onSelectionChange={setSelectedSections}
          />
        )}
      </div>
    </div>
  );
}
