"use client";

import {
  UniTable,
  Column,
  Action,
  UniTableFilters,
} from "@/components/shared/UniTable";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Product } from "../types";
import { useToggleProductStatus, useRestoreProduct } from "../hooks/useProduct";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getImageUrl } from "@/utils/image.utils";

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductsTable({
  products,
  isLoading,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  const t = useTranslations("Products");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const { mutate: toggleStatus } = useToggleProductStatus();
  const { mutate: restoreProduct } = useRestoreProduct();

  const columns: Column<Product>[] = [
    {
      header: t("image"),
      accessor: "mainImage",
      render: (value, product) => (
        <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-divider">
          <Image
            src={getImageUrl(value as string)}
            alt={locale === "ar" ? product.nameAr : product.nameEn}
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      header: t("name"),
      accessor: "nameEn",
      render: (_, product) => (
        <div className="flex flex-col">
          <span className="font-medium text-content-primary">
            {locale === "ar" ? product.nameAr : product.nameEn}
          </span>
          <span className="text-xs text-content-tertiary">{product.sku || "No SKU"}</span>
        </div>
      ),
    },
    {
      header: tCommon("category"),
      accessor: "categoryId",
      render: (value: any) => (
        <span className="text-sm">
          {value ? (locale === "ar" ? value.nameAr : value.nameEn) : "-"}
        </span>
      ),
    },
    {
      header: tCommon("price"),
      accessor: "price",
      render: (value) => (
        <span className="font-bold text-primary">
          {value as number} {tCommon("currency")}
        </span>
      ),
    },
    {
      header: tCommon("stock"),
      accessor: "stock",
      render: (value) => (
        <Badge variant={ (value as number) > 0 ? "secondary" : "destructive" } className="rounded-md">
          {value as number}
        </Badge>
      ),
    },
    {
      header: tCommon("status"),
      accessor: "isShow",
      render: (value, product) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={value as boolean}
            onCheckedChange={() => toggleStatus(product._id)}
            disabled={product.isDeleted}
          />
          <Badge
            variant={value ? "success" : "secondary"}
            className={cn(
              "rounded-md",
              value ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
            )}
          >
            {value ? tCommon("active") : tCommon("inactive")}
          </Badge>
        </div>
      ),
    },
  ];

  const actions: Action<Product>[] = [
    {
      label: tCommon("edit"),
      onClick: onEdit,
      show: (product) => !product.isDeleted,
    },
    {
      label: product => product.isDeleted ? tCommon("restore") : tCommon("delete"),
      onClick: (product) => product.isDeleted ? restoreProduct(product._id) : onDelete(product._id),
      variant: product => product.isDeleted ? "default" : "destructive",
    },
  ];

  return (
    <UniTable
      data={products}
      columns={columns}
      actions={actions}
      isLoading={isLoading}
    />
  );
}
