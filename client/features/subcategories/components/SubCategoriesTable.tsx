"use client";

import React from "react";
import UniTable, { 
  SelectionCell,
  SelectionHeader,
  ProductCell, 
  ActionCell, 
  ActionButton,
  UniTableColumn
} from "@/components/shared/UniTable";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Subcategory } from "../services/subcategory.service";
import { useToggleSubcategoryStatus, useRestoreSubcategory } from "../hooks/useSubCategory";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Loader2, Pencil, Trash2, RotateCcw } from "lucide-react";

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
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const { mutate: toggleStatus, isPending: isToggling } = useToggleSubcategoryStatus();
  const { mutate: restoreSubcategory, isPending: isRestoring } = useRestoreSubcategory();

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
          className={cn(row.isDeleted && "opacity-50 grayscale")}
        />
      ),
    },
    {
      id: "name",
      header: t("name"),
      cell: (value, row) => (
        <div className="flex items-center gap-2">
          <span className="text-content-secondary font-medium">
            {locale === "ar" ? row.nameAr : row.nameEn}
          </span>
          {row.isDeleted && (
            <Badge variant="destructive" className="text-[10px] h-4 px-1">
              {tCommon("deleted")}
            </Badge>
          )}
        </div>
      ),
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
            disabled={isToggling || row.isDeleted}
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
          {row.isDeleted ? (
            <div className={cn(isRestoring && "opacity-50 pointer-events-none")}>
              <ActionButton 
                icon={RotateCcw} 
                onClick={() => restoreSubcategory(row._id)} 
              />
            </div>
          ) : (
            <>
              <ActionButton 
                icon={Trash2} 
                variant="danger" 
                onClick={() => onDelete(row._id)} 
              />
              <ActionButton 
                icon={Pencil} 
                onClick={() => onEdit(row)} 
              />
            </>
          )}
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
