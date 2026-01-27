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
import { Category } from "../services/category.service";
import { useToggleCategoryStatus, useRestoreCategory } from "../hooks/useCategory";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Loader, Pencil, Trash2, RotateCcw } from "lucide-react";
import { ConfirmationModal } from "@/components/shared/ConfirmationModal";
import { UniTableSkeleton } from "@/components/shared/UniTableSkeleton";
import { useState } from "react";

interface CategoriesTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  onSelectionChange?: (selectedRows: Category[]) => void;
}

export default function CategoriesTable({ 
  categories, 
  onEdit, 
  onDelete,
  isLoading,
  onSelectionChange
}: CategoriesTableProps) {
  const t = useTranslations("Categories");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const { mutate: toggleStatus, isPending: isToggling } = useToggleCategoryStatus();
  const { mutateAsync: restoreCategory, isPending: isRestoring } = useRestoreCategory();
  
  const [modalConfig, setModalConfig] = useState<{
    open: boolean;
    title: string;
    description: string;
    action: () => Promise<void>;
    itemName: string;
    variant: "default" | "destructive";
  }>({
    open: false,
    title: "",
    description: "",
    action: async () => {},
    itemName: "",
    variant: "default",
  });

  const handleDeleteClick = (category: Category) => {
    setModalConfig({
      open: true,
      title: tCommon("confirm_delete_title"),
      description: tCommon("confirm_delete_desc", { name: locale === "ar" ? category.nameAr : category.nameEn }),
      itemName: locale === "ar" ? category.nameAr : category.nameEn,
      variant: "destructive",
      action: async () => {
        onDelete(category._id);
      },
    });
  };

  const handleRestoreClick = (category: Category) => {
    setModalConfig({
      open: true,
      title: tCommon("confirm_restore_title"),
      description: tCommon("confirm_restore_desc", { name: locale === "ar" ? category.nameAr : category.nameEn }),
      itemName: locale === "ar" ? category.nameAr : category.nameEn,
      variant: "default",
      action: async () => {
        await restoreCategory(category._id);
      },
    });
  };

  const columns: UniTableColumn<Category>[] = [
    {
      id: "selection",
      header: <SelectionHeader label={t("category_id")} />,
      cell: (value, row) => (
        <SelectionCell checked={false} id={row._id?.slice(-6).toUpperCase() || "302012"} />
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
            disabled={isToggling || row.isDeleted}
            className="data-[state=checked]:bg-primary"
          />
          {isToggling && <Loader className="h-3 w-3 animate-spin text-primary" />}
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
                onClick={() => handleRestoreClick(row)} 
              />
            </div>
          ) : (
            <>
              <ActionButton 
                icon={Trash2} 
                variant="danger" 
                onClick={() => handleDeleteClick(row)} 
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

  if (isLoading) {
    return <UniTableSkeleton columnCount={6} rowCount={10} />;
  }

  return (
    <>
      <UniTable 
        data={categories} 
        columns={columns} 
        enablePagination={true}
        pageSize={10}
        itemLabel={t("title")}
        onSelectionChange={onSelectionChange}
        getRowId={(row) => row._id}
      />
      
      <ConfirmationModal
        open={modalConfig.open}
        onOpenChange={(open) => setModalConfig(prev => ({ ...prev, open }))}
        title={modalConfig.title}
        description={modalConfig.description}
        itemName={modalConfig.itemName}
        onConfirm={modalConfig.action}
        variant={modalConfig.variant}
        confirmText={modalConfig.variant === "destructive" ? tCommon("delete") : tCommon("restore")}
        cancelText={tCommon("cancel")}
      />
    </>
  );
}
