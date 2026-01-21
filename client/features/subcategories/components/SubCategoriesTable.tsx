"use client";

import React from "react";
import UniTable, { 
  SelectionCell,
  SelectionHeader,
  ProductCell, 
  ActionCell, 
  ActionButton,
  Pencil,
  Trash2,
  UniTableColumn
} from "@/components/shared/UniTable";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Subcategory } from "../services/subcategory.service";
import { useToggleSubcategoryStatus } from "../hooks/useSubCategory";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SubCategoriesTableProps {
  subcategories: Subcategory[];
  onEdit: (subcategory: Subcategory) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function SubCategoriesTable({ 
  subcategories, 
  onEdit, 
  onDelete,
  isLoading 
}: SubCategoriesTableProps) {
  const t = useTranslations("SubCategories");
  const locale = useLocale();
  const { mutate: toggleStatus, isPending: isToggling } = useToggleSubcategoryStatus();

  const columns: UniTableColumn<Subcategory>[] = [
    {
      id: "selection",
      header: <SelectionHeader label={t("subcategory_id")} />,
      cell: (value, row) => (
        <SelectionCell isSelected={false} id={row._id?.slice(-6).toUpperCase() || "SUB" + row.nameEn.slice(0,3).toUpperCase()} />
      ),
    },
    {
      id: "image",
      header: t("image"),
      cell: (value, row) => (
        <ProductCell 
          image={row.image} 
          title={locale === "ar" ? row.nameAr : row.nameEn} 
          imageSize="h-10 w-10"
        />
      ),
    },
    {
      id: "name",
      header: t("name"),
      accessorKey: locale === "ar" ? "nameAr" : "nameEn",
      className: "text-content-secondary font-medium",
    },
    {
      id: "category",
      header: t("category"),
      cell: (value, row) => (
        <span className="text-content-secondary">
          {locale === "ar" ? row.categoryNameAr : row.categoryNameEn}
        </span>
      ),
    },
    {
      id: "slug",
      header: t("slug"),
      accessorKey: "slug",
      className: "text-content-tertiary",
    },
    {
      id: "priority",
      header: t("priority"),
      accessorKey: "priority",
      className: "text-content-tertiary text-center",
    },
    {
      id: "status",
      header: t("status"),
      cell: (value, row) => (
        <div className="flex items-center gap-2">
          <Switch 
            checked={row.isShow}
            onCheckedChange={() => toggleStatus(row._id)}
            disabled={isToggling}
            className="data-[state=checked]:bg-primary"
          />
          {isToggling && <Loader2 className="h-3 w-3 animate-spin text-primary" />}
        </div>
      ),
    },
    {
      id: "actions",
      header: t("action"),
      cell: (value, row) => (
        <ActionCell>
          <ActionButton 
            icon={Trash2} 
            variant="danger" 
            onClick={() => onDelete(row._id)} 
          />
          <ActionButton 
            icon={Pencil} 
            onClick={() => onEdit(row)} 
          />
        </ActionCell>
      ),
    },
  ];

  return (
    <UniTable 
      data={subcategories} 
      columns={columns} 
      enablePagination={true}
      pageSize={10}
      itemLabel={t("title")}
    />
  );
}
