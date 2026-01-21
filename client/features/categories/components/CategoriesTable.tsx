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
import { Category } from "../services/category.service";
import { useToggleCategoryStatus } from "../hooks/useCategory";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface CategoriesTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function CategoriesTable({ 
  categories, 
  onEdit, 
  onDelete,
  isLoading 
}: CategoriesTableProps) {
  const t = useTranslations("Categories");
  const locale = useLocale();
  const { mutate: toggleStatus, isPending: isToggling } = useToggleCategoryStatus();

  const columns: UniTableColumn<Category>[] = [
    {
      id: "selection",
      header: <SelectionHeader label={t("category_id")} />,
      cell: (value, row) => (
        <SelectionCell isSelected={false} id={row._id?.slice(-6).toUpperCase() || "302012"} />
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
      id: "subcategories",
      header: t("subcategories_count"),
      cell: (value, row) => (
        <span className="text-content-secondary font-medium block text-center">
          {row.subcategoriesCount || 0}
        </span>
      ),
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
      data={categories} 
      columns={columns} 
      enablePagination={true}
      pageSize={10}
      itemLabel={t("title")}
    />
  );
}

