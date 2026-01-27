"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import BrandsTable from "../components/BrandsTable";
import NoDataMsg from "@/components/shared/NoDataMsg";
import { useBrands, useDeleteBrand } from "../hooks/useBrand";
import { Brand } from "../types";
import { useTranslations } from "next-intl";
import { TableFilters } from "@/components/shared/TableFilters";
import { TablePageSkeleton } from "@/components/shared/TablePageSkeleton";
import { useState } from "react";

import { format } from "date-fns";
import { exportToExcel } from "@/utils/excelExport";
import { toast } from "sonner";

export default function BrandsTemplate() {
  const router = useRouter();
  const t = useTranslations("Brands");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");

  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);

  const handleExport = () => {
    if (brands.length === 0 || selectedBrands.length === 0) {
      toast.error(tCommon("no_data_to_export") || "No data to export");
      return;
    }

    const dataToExport = selectedBrands.map((brand: Brand) => ({
      [tCommon("nameAr")]: brand.nameAr,
      [tCommon("nameEn")]: brand.nameEn,
      [tCommon("priority")]: brand.priority,
      [tCommon("status")]: brand.isDeleted ? tCommon("deleted") : tCommon("active"),
      "Slug": brand.slug,
      [tCommon("date")]: brand.createdAt ? format(new Date(brand.createdAt), "dd MMM yyyy") : "-",
    }));

    exportToExcel(dataToExport, {
      filename: `Brands_${format(new Date(), "yyyy-MM-dd")}.xlsx`,
      sheetName: "Brands",
    });
  };

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: brandsData = [], isLoading } = useBrands({
    isDeleted: activeTab === "all" ? undefined : activeTab === "deleted",
    search
  });
  const { mutate: deleteBrand } = useDeleteBrand();

  if (isLoading) return <TablePageSkeleton columnCount={7} rowCount={10} />;

  const brands = brandsData;

  const handleEdit = (brand: Brand) => {
    router.push(`/dashboard/brands/edit/${brand.slug}`);
  };

  const actionButtons = [
    {
      label: tCommon("export"),
      icon: Download,
      variant: "secondary" as const,
      onClick: handleExport
    },
    {
      label: t("add_brand"),
      icon: Plus,
      href: "/dashboard/brands/add",
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

        {!isLoading && brands.length === 0 ? (
           <NoDataMsg 
             title={t("title")}
             description={tCommon("no_data_desc")}
             additionalMessage=""
           />
        ) : (
          <BrandsTable
            brands={brands}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={(id) => deleteBrand(id)}
            onSelectionChange={setSelectedBrands}
          />
        )}
      </div>
    </div>
  );
}
