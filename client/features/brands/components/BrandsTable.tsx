"use client";

import React, { useState } from "react";
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
import { Brand } from "../services/brand.service";
import { useToggleBrandStatus, useRestoreBrand } from "../hooks/useBrand";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Loader2, Pencil, Trash2, RotateCcw } from "lucide-react";
import { ConfirmationModal } from "@/components/shared/ConfirmationModal";

interface BrandsTableProps {
  brands: Brand[];
  onEdit: (brand: Brand) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function BrandsTable({ 
  brands, 
  onEdit, 
  onDelete,
  isLoading 
}: BrandsTableProps) {
  const t = useTranslations("Brands");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const { mutate: toggleStatus, isPending: isToggling } = useToggleBrandStatus();
  const { mutateAsync: restoreBrand, isPending: isRestoring } = useRestoreBrand();
  
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

  const handleDeleteClick = (brand: Brand) => {
    setModalConfig({
      open: true,
      title: tCommon("confirm_delete_title"),
      description: tCommon("confirm_delete_desc", { name: locale === "ar" ? brand.nameAr : brand.nameEn }),
      itemName: locale === "ar" ? brand.nameAr : brand.nameEn,
      variant: "destructive",
      action: async () => {
        onDelete(brand._id);
      },
    });
  };

  const handleRestoreClick = (brand: Brand) => {
    setModalConfig({
      open: true,
      title: tCommon("confirm_restore_title"),
      description: tCommon("confirm_restore_desc", { name: locale === "ar" ? brand.nameAr : brand.nameEn }),
      itemName: locale === "ar" ? brand.nameAr : brand.nameEn,
      variant: "default",
      action: async () => {
        await restoreBrand(brand._id);
      },
    });
  };

  const columns: UniTableColumn<Brand>[] = [
    {
      id: "selection",
      header: <SelectionHeader label={t("brand_id")} />,
      cell: (value, row) => (
        <SelectionCell isSelected={false} id={row._id?.slice(-6).toUpperCase() || "BRAND"} />
      ),
    },
    {
      id: "logo",
      header: t("logo"),
      cell: (value, row) => (
        <ProductCell 
          image={row.logo} 
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

  return (
    <>
      <UniTable 
        data={brands} 
        columns={columns} 
        enablePagination={true}
        pageSize={10}
        itemLabel={t("title")}
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
