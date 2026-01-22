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

  const columns: UniTableColumn<Product>[] = [
    {
      id: "selection",
      header: <SelectionHeader label={t("product_id")} />,
      cell: (_, row) => (
        <SelectionCell isSelected={false} id={row._id?.slice(-6).toUpperCase()} />
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
            {category
              ? locale === "ar"
                ? category.nameAr
                : category.nameEn
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
        <div className="flex items-center gap-2">
          <Switch
            checked={row.isShow}
            onCheckedChange={() => toggleStatus(row._id)}
            disabled={row.isDeleted}
            className="data-[state=checked]:bg-primary"
          />
          <Badge
            variant={row.isShow ? "secondary" : "outline"}
            className={cn(
              "rounded-md border-transparent",
              row.isShow
                ? "bg-green-100 text-green-700 hover:bg-green-100"
                : "bg-gray-100 text-gray-700 hover:bg-gray-100"
            )}
          >
            {row.isShow ? tCommon("active") : tCommon("inactive")}
          </Badge>
        </div>
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
              onClick={() => restoreProduct(row._id)}
            />
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

  if (isLoading) {
    return <UniLoading message={tCommon("loading")} />;
  }

  return (
    <UniTable
      data={products}
      columns={columns}
      enablePagination={true}
      pageSize={10}
      itemLabel={t("title")}
    />
  );
}
