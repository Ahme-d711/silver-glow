"use client";

import { useRouter } from "next/navigation";
import { Plus, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import SubCategoriesTable from "../components/SubCategoriesTable";
import { useSubcategories, useDeleteSubcategory } from "../hooks/useSubCategory";
import { Subcategory } from "../services/subcategory.service";
import { useTranslations } from "next-intl";

export default function SubCategoriesTemplate() {
  const router = useRouter();
  const t = useTranslations("SubCategories");
  const tCommon = useTranslations("Common");
  
  const { data: subcategoriesData = [], isLoading } = useSubcategories();
  const { mutate: deleteSubcategory } = useDeleteSubcategory();

  // Mock data for initial demonstration
  const mockSubcategories: Subcategory[] = [
    {
      _id: "702012sub1",
      nameAr: "خواتم فضة",
      nameEn: "Silver Rings",
      categoryId: "cat1",
      categoryNameAr: "مجوهرات",
      categoryNameEn: "Jewelry",
      image: "",
      isShow: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "702012sub2",
      nameAr: "سلاسل ذهب",
      nameEn: "Gold Chains",
      categoryId: "cat2",
      categoryNameAr: "مجوهرات",
      categoryNameEn: "Jewelry",
      image: "",
      isShow: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  const subcategories = subcategoriesData.length > 0 ? subcategoriesData : mockSubcategories;

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
          { label: tCommon("dashboard"), href: "/" }, 
          { label: t("title") }
        ]}
        actionButtons={actionButtons}
      />

      <div className="bg-white rounded-[24px] border border-divider overflow-hidden">
        <SubCategoriesTable
          subcategories={subcategories}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={(id) => deleteSubcategory(id)}
        />
      </div>
    </div>
  );
}
