"use client";

import React from "react";
import { HeaderContext, CellContext } from "@tanstack/react-table"
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
import { Loader, Pencil, Trash2, RotateCcw } from "lucide-react";
import { ConfirmationModal } from "@/components/shared/ConfirmationModal";
import { UniTableSkeleton } from "@/components/shared/UniTableSkeleton";
import { useState } from "react";

interface SubCategoriesTableProps {
  subcategories: Subcategory[];
  onEdit: (subcategory: Subcategory) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  onSelectionChange?: (selectedRows: Subcategory[]) => void;
}

export default function SubCategoriesTable({ 
  subcategories, 
  onEdit, 
  onDelete,
  isLoading,
  onSelectionChange
}: SubCategoriesTableProps) {
  const t = useTranslations("SubCategories");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const { mutate: toggleStatus, isPending: isToggling } = useToggleSubcategoryStatus();
  const { mutateAsync: restoreSubcategory, isPending: isRestoring } = useRestoreSubcategory();

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

  const handleDeleteClick = (subcategory: Subcategory) => {
    setModalConfig({
      open: true,
      title: tCommon("confirm_delete_title"),
      description: tCommon("confirm_delete_desc", { name: locale === "ar" ? subcategory.nameAr : subcategory.nameEn }),
      itemName: locale === "ar" ? subcategory.nameAr : subcategory.nameEn,
      variant: "destructive",
      action: async () => {
        onDelete(subcategory._id);
      },
    });
  };

  const handleRestoreClick = (subcategory: Subcategory) => {
    setModalConfig({
      open: true,
      title: tCommon("confirm_restore_title"),
      description: tCommon("confirm_restore_desc", { name: locale === "ar" ? subcategory.nameAr : subcategory.nameEn }),
      itemName: locale === "ar" ? subcategory.nameAr : subcategory.nameEn,
      variant: "default",
      action: async () => {
        await restoreSubcategory(subcategory._id);
      },
    });
  };

  const columns: UniTableColumn<Subcategory>[] = [
    {
      id: "selection",
      header: (props: HeaderContext<Subcategory, any>) => (
        <SelectionHeader 
          label={t("subcategory_id")} 
          checked={props.table.getIsAllPageRowsSelected()}
          indeterminate={props.table.getIsSomePageRowsSelected()}
          onChange={(val) => props.table.toggleAllPageRowsSelected(val)}
        />
      ),
      cell: (value, row, props: CellContext<Subcategory, any>) => (
        <SelectionCell 
          checked={props.row.getIsSelected()} 
          onChange={(val) => props.row.toggleSelected(val)}
          id={row._id?.slice(-6).toUpperCase() || "SUB" + row.nameEn.slice(0,3).toUpperCase()} 
        />
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
    return <UniTableSkeleton columnCount={7} rowCount={10} />;
  }

  return (
    <>
      <UniTable 
        data={subcategories} 
        columns={columns} 
        enablePagination={true}
        pageSize={10}
        itemLabel={t("title")}
        onSelectionChange={React.useCallback((rows: Subcategory[]) => {
          onSelectionChange?.(rows)
        }, [onSelectionChange])}
        getRowId={(row) => row._id}
        showSelection={true}
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
