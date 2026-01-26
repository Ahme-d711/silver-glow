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
import { Section } from "../types";
import { useToggleSectionStatus, useRestoreSection } from "../hooks/useSection";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Loader, Pencil, Trash2, RotateCcw } from "lucide-react";
import { ConfirmationModal } from "@/components/shared/ConfirmationModal";
import { UniTableSkeleton } from "@/components/shared/UniTableSkeleton";

interface SectionsTableProps {
  sections: Section[];
  onEdit: (section: Section) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function SectionsTable({ 
  sections, 
  onEdit, 
  onDelete,
  isLoading 
}: SectionsTableProps) {
  const t = useTranslations("Sections");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const { mutate: toggleStatus, isPending: isToggling } = useToggleSectionStatus();
  const { mutateAsync: restoreSection, isPending: isRestoring } = useRestoreSection();
  
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

  const handleDeleteClick = (section: Section) => {
    setModalConfig({
      open: true,
      title: tCommon("confirm_delete_title"),
      description: tCommon("confirm_delete_desc", { name: locale === "ar" ? section.nameAr : section.nameEn }),
      itemName: locale === "ar" ? section.nameAr : section.nameEn,
      variant: "destructive",
      action: async () => {
        onDelete(section._id);
      },
    });
  };

  const handleRestoreClick = (section: Section) => {
    setModalConfig({
      open: true,
      title: tCommon("confirm_restore_title"),
      description: tCommon("confirm_restore_desc", { name: locale === "ar" ? section.nameAr : section.nameEn }),
      itemName: locale === "ar" ? section.nameAr : section.nameEn,
      variant: "default",
      action: async () => {
        await restoreSection(section._id);
      },
    });
  };

  const columns: UniTableColumn<Section>[] = [
    {
      id: "selection",
      header: <SelectionHeader label={t("section_id")} />,
      cell: (value, row) => (
        <SelectionCell isSelected={false} id={row._id?.slice(-6).toUpperCase() || "SEC"} />
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
        data={sections} 
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
