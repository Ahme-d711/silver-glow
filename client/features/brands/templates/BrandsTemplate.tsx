"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import BrandsTable from "../components/BrandsTable";
import NoDataMsg from "@/components/shared/NoDataMsg";
import { useBrands, useDeleteBrand } from "../hooks/useBrand";
import { Brand } from "../services/brand.service";
import { useTranslations } from "next-intl";
import { TableFilters } from "@/components/shared/TableFilters";
import { useState } from "react";

export default function BrandsTemplate() {
  const router = useRouter();
  const t = useTranslations("Brands");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: brandsData = [], isLoading } = useBrands({
    isDeleted: activeTab === "all" ? undefined : activeTab === "deleted",
    search
  });
  const { mutate: deleteBrand } = useDeleteBrand();

  const brands = brandsData;

  const handleEdit = (brand: Brand) => {
    router.push(`/dashboard/brands/edit/${brand.slug}`);
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
      label: t("add_brand"),
      icon: Plus,
      href: "/dashboard/brands/add",
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
          />
        )}
      </div>
    </div>
  );
}
