"use client";

import { useRouter } from "next/navigation";
import { Plus, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import SubCategoriesTable from "../components/SubCategoriesTable";
import NoDataMsg from "@/components/shared/NoDataMsg";
import { useSubcategories, useDeleteSubcategory } from "../hooks/useSubCategory";
import { Subcategory } from "../services/subcategory.service";
import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function SubCategoriesTemplate() {
  const router = useRouter();
  const t = useTranslations("SubCategories");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "deleted">("all");
  
  const { data: subcategoriesData = [], isLoading } = useSubcategories({
    isDeleted: statusFilter === "all" ? undefined : statusFilter === "deleted"
  });
  const { mutate: deleteSubcategory } = useDeleteSubcategory();

  const subcategories = subcategoriesData;

  const handleEdit = (subcategory: Subcategory) => {
    router.push(`/dashboard/subcategories/edit/${subcategory.slug}`);
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

      <div className="flex items-center justify-between">
        <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)} className="w-fit">
          <TabsList className="bg-white border border-divider h-11 p-1 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg px-6 data-[state=active]:bg-secondary/10 data-[state=active]:text-primary font-medium transition-all h-9">
              {tCommon("all")}
            </TabsTrigger>
            <TabsTrigger value="active" className="rounded-lg px-6 data-[state=active]:bg-secondary/10 data-[state=active]:text-primary font-medium transition-all h-9">
              {tCommon("active")}
            </TabsTrigger>
            <TabsTrigger value="deleted" className="rounded-lg px-6 data-[state=active]:bg-secondary/10 data-[state=active]:text-primary font-medium transition-all h-9">
              {tCommon("deleted")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

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
