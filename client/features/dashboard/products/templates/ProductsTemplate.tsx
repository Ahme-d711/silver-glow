"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import ProductsTable from "../components/ProductsTable";
import NoDataMsg from "@/components/shared/NoDataMsg";
import { useProducts, useDeleteProduct } from "../hooks/useProduct";
import { Product } from "../types";
import { useTranslations } from "next-intl";
import { TableFilters } from "@/components/shared/TableFilters";
import { TablePageSkeleton } from "@/components/shared/TablePageSkeleton";
import { useState } from "react";
import { toast } from "sonner";

import { format } from "date-fns";
import { exportToExcel } from "@/utils/excelExport";
import { CategoryReference, BrandReference } from "@/types";

export default function ProductsTemplate() {
  const router = useRouter();
  const t = useTranslations("Products");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleExport = () => {
    if (products.length === 0 || selectedProducts.length === 0) {
      toast.error(tCommon("no_data_to_export") || "No data to export");
      return;
    }

    const dataToExport = selectedProducts.map((product: Product) => {
      const category = typeof product.categoryId === "object" ? (product.categoryId as CategoryReference).nameEn : "-";
      const brand = typeof product.brandId === "object" ? (product.brandId as BrandReference).nameEn : "-";

      return {
        [tCommon("name_ar")]: product.nameAr,
        [tCommon("name_en")]: product.nameEn,
        [t("price")]: product.price,
        [tCommon("category")]: category,
        [tCommon("brand")]: brand,
        [tCommon("status")]: product.isDeleted ? tCommon("deleted") : tCommon("active"),
        [tCommon("date")]: product.createdAt ? format(new Date(product.createdAt), "dd MMM yyyy") : "-",
      };
    });

    exportToExcel(dataToExport, {
      filename: `Products_${format(new Date(), "yyyy-MM-dd")}.xlsx`,
      sheetName: "Products",
    });
  };

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: products = [], isLoading } = useProducts({
    isDeleted: activeTab === "all" ? undefined : activeTab === "deleted",
    search
  });
  const { mutate: deleteProduct } = useDeleteProduct();

  if (isLoading) return <TablePageSkeleton columnCount={8} rowCount={10} />;

  const handleEdit = (product: Product) => {
    router.push(`/dashboard/products/edit/${product.slug}`);
  };

  const actionButtons = [
    {
      label: tCommon("export"),
      icon: Download,
      variant: "secondary" as const,
      onClick: handleExport
    },
    {
      label: t("add_product"),
      icon: Plus,
      href: "/dashboard/products/add",
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

        {!isLoading && products.length === 0 ? (
           <NoDataMsg 
             title={t("title")}
             description={tCommon("no_data_desc")}
             additionalMessage=""
           />
        ) : (
          <ProductsTable
            products={products}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={(id) => deleteProduct(id)}
            onSelectionChange={setSelectedProducts}
          />
        )}
      </div>
    </div>
  );
}
