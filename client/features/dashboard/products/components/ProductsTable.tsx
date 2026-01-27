"use client";

import UniTable, {
  SelectionCell,
  SelectionHeader,
  ProductCell,
  ActionCell,
  ActionButton,
  UniTableColumn,
} from "@/components/shared/UniTable";
import UniLoading from "@/components/shared/UniLoading";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Product } from "../types";
import { useToggleProductStatus, useRestoreProduct } from "../hooks/useProduct";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Pencil, Trash2, RotateCcw } from "lucide-react";
import { ConfirmationModal } from "@/components/shared/ConfirmationModal";
import { UniTableSkeleton } from "@/components/shared/UniTableSkeleton";
import { useState } from "react";

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onSelectionChange?: (selectedRows: Product[]) => void;
}

export default function ProductsTable({
  products,
  isLoading,
  onEdit,
  onDelete,
  onSelectionChange
}: ProductsTableProps) {
  const t = useTranslations("Products");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const { mutate: toggleStatus } = useToggleProductStatus();
  const { mutateAsync: restoreProduct } = useRestoreProduct();

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

  const handleDeleteClick = (product: Product) => {
    setModalConfig({
      open: true,
      title: tCommon("confirm_delete_title"),
      description: tCommon("confirm_delete_desc", {
        name: locale === "ar" ? product.nameAr : product.nameEn,
      }),
      itemName: locale === "ar" ? product.nameAr : product.nameEn,
      variant: "destructive",
      action: async () => {
        onDelete(product._id);
      },
    });
  };

  const handleRestoreClick = (product: Product) => {
    setModalConfig({
      open: true,
      title: tCommon("confirm_restore_title"),
      description: tCommon("confirm_restore_desc", {
        name: locale === "ar" ? product.nameAr : product.nameEn,
      }),
      itemName: locale === "ar" ? product.nameAr : product.nameEn,
      variant: "default",
      action: async () => {
        await restoreProduct(product._id);
      },
    });
  };

  const columns: UniTableColumn<Product>[] = [
    {
      id: "selection",
      header: <SelectionHeader label={t("product_id")} />,
      cell: (_, row) => (
        <SelectionCell checked={false} id={row._id?.slice(-6).toUpperCase()} />
      ),
    },
    {
      id: "product",
      header: t("product"),
      cell: (_, row) => (
        <ProductCell
          image={row.mainImage}
          title={locale === "ar" ? row.nameAr : row.nameEn}
          subtitle={row.sku || "No SKU"}
          className={cn(row.isDeleted && "opacity-50 grayscale")}
        />
      ),
    },
    {
      id: "category",
      header: tCommon("category"),
      cell: (_, row) => {
        const category = row.categoryId;
        return (
          <span className="text-sm text-content-secondary">
            {typeof category === 'object' && category !== null
              ? locale === "ar"
                ? category.nameAr || category.nameEn
                : category.nameEn || category.nameAr
              : "-"}
          </span>
        );
      },
    },
    {
      id: "brand",
      header: tCommon("brand"),
      cell: (_, row) => {
        const brand = row.brandId;
        return (
          <span className="text-sm text-content-secondary">
            {typeof brand === 'object' && brand !== null
              ? locale === "ar"
                ? brand.nameAr || brand.nameEn
                : brand.nameEn || brand.nameAr
              : "-"}
          </span>
        );
      },
    },
    {
      id: "subCategory",
      header: tCommon("subCategory"),
      cell: (_, row) => {
        const subCategory = row.subCategoryId;
        return (
          <span className="text-sm text-content-secondary">
            {typeof subCategory === 'object' && subCategory !== null
              ? locale === "ar"
                ? subCategory.nameAr || subCategory.nameEn
                : subCategory.nameEn || subCategory.nameAr
              : "-"}
          </span>
        );
      },
    },
    {
      id: "section",
      header: tCommon("section"),
      cell: (_, row) => {
        const section = row.sectionId;
        return (
          <span className="text-sm text-content-secondary">
            {typeof section === 'object' && section !== null
              ? locale === "ar"
                ? section.nameAr || section.nameEn
                : section.nameEn || section.nameAr
              : "-"}
          </span>
        );
      },
    },
    {
      id: "price",
      header: tCommon("price"),
      cell: (_, row) => (
        <span className="font-bold text-primary">
          {row.price} {tCommon("currency")}
        </span>
      ),
    },
    {
      id: "stock",
      header: tCommon("stock"),
      cell: (_, row) => (
        <Badge
          variant={row.stock > 0 ? "secondary" : "destructive"}
          className="rounded-md"
        >
          {row.stock}
        </Badge>
      ),
    },
    {
      id: "status",
      header: tCommon("status"),
      cell: (_, row) => (
          <Switch
            checked={row.isShow}
            onCheckedChange={() => toggleStatus(row._id)}
            disabled={row.isDeleted}
            className="data-[state=checked]:bg-primary"
          />
      ),
    },
    {
      id: "actions",
      header: tCommon("action"),
      cell: (_, row) => (
        <ActionCell>
          {row.isDeleted ? (
            <ActionButton
              icon={RotateCcw}
              onClick={() => handleRestoreClick(row)}
            />
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
    return <UniLoading message={tCommon("loading")} />;
  }

  if (isLoading) {
    return <UniTableSkeleton columnCount={8} rowCount={10} />;
  }

  return (
    <>
      <UniTable
        data={products}
        columns={columns}
        enablePagination={true}
        pageSize={10}
        itemLabel={t("title")}
        onSelectionChange={onSelectionChange}
        getRowId={(row) => row._id}
      />

      <ConfirmationModal
        open={modalConfig.open}
        onOpenChange={(open) => setModalConfig((prev) => ({ ...prev, open }))}
        title={modalConfig.title}
        description={modalConfig.description}
        itemName={modalConfig.itemName}
        onConfirm={modalConfig.action}
        variant={modalConfig.variant}
        confirmText={
          modalConfig.variant === "destructive"
            ? tCommon("delete")
            : tCommon("restore")
        }
        cancelText={tCommon("cancel")}
      />
    </>
  );
}
