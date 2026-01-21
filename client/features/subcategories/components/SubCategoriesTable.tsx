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
import { Subcategory } from "../services/subcategory.service";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

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
      id: "status",
      header: t("status"),
      cell: (value, row) => (
        <Badge 
          className={cn(
            "rounded-lg px-3 py-1 font-medium",
            row.isShow 
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100 border-none" 
              : "bg-red-50 text-red-600 hover:bg-red-100 border-none"
          )}
        >
          {row.isShow ? t("view") : t("not_view")}
        </Badge>
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
