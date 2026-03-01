import React from "react";
import { Control, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { UniSelect } from "@/components/shared/uni-form/UniSelect";
import { UniAsyncCombobox } from "@/components/shared/uni-form/UniAsyncCombobox";
import { Product } from "@/features/dashboard/products/types";
import { SectionHeader } from "./SectionHeader";

interface ItemsSectionProps {
  form: UseFormReturn<any>;
  fields: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
  t: (key: string) => string;
  tCommon: (key: string) => string;
  selectedProducts: Record<string, Product>;
  handleProductSelect: (index: number, product: Product) => void;
  handleSizeSelect: (index: number, size: string) => void;
  fetchProducts: (search: string) => Promise<Product[]>;
  isEdit?: boolean;
}

export function ItemsSection({
  form,
  fields,
  append,
  remove,
  t,
  tCommon,
  selectedProducts,
  handleProductSelect,
  handleSizeSelect,
  fetchProducts,
  isEdit,
}: ItemsSectionProps) {
  const watchItems = form.watch("items");

  return (
    <div className="space-y-4">
      <SectionHeader title={t("order_items")}>
        {!isEdit && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ productId: "", name: "", price: 0, quantity: 1, image: "", size: "" })}
            className="rounded-xl border-primary text-primary hover:bg-primary/5"
          >
            <Plus className="h-4 w-4 me-2" />
            {t("add_item")}
          </Button>
        )}
      </SectionHeader>

      <div className="space-y-4">
        {fields.map((field, index) => {
          const productId = watchItems[index]?.productId;
          const selectedProduct = selectedProducts[productId];
          const currentSize = watchItems[index]?.size;

          return (
            <div key={field.id} className="p-6 border border-divider/50 rounded-3xl space-y-6 bg-gray-50/30">
              <div className="flex items-center justify-between border-b border-divider/50 pb-4">
                <h4 className="font-bold text-primary">{t("item")} {index + 1}</h4>
                {fields.length > 1 && !isEdit && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-error hover:text-error/80 hover:bg-error/10 rounded-xl"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <UniAsyncCombobox
                  control={form.control}
                  name={`items.${index}.productId`}
                  label={t("product")}
                  onSelect={(product: Product) => handleProductSelect(index, product)}
                  fetchData={fetchProducts}
                  placeholder={t("select_product")}
                  searchPlaceholder={tCommon("search")}
                  emptyMessage={tCommon("no_data")}
                  getItemLabel={(product: Product) => product.nameAr || product.nameEn}
                  disabled={isEdit}
                  required
                />

                <UniInput
                  control={form.control}
                  name={`items.${index}.name`}
                  label={t("product_name")}
                  placeholder={t("enter_product_name")}
                  readOnly
                  required
                />

                {/* Size Selection */}
                {(selectedProduct?.sizes?.length || 0) > 0 || currentSize ? (
                  <UniSelect
                    control={form.control}
                    name={`items.${index}.size`}
                    label={t("size") || "Size"}
                    options={
                      selectedProduct?.sizes?.map(s => ({
                        label: `${s.size} (${s.price} ${tCommon("currency")})`,
                        value: s.size
                      })) || (currentSize ? [{ label: currentSize, value: currentSize }] : [])
                    }
                    onValueChange={(val: string) => handleSizeSelect(index, val)}
                    placeholder={t("select_size") || "Select Size"}
                    required={!!(selectedProduct?.sizes?.length)}
                    disabled={isEdit || !(selectedProduct?.sizes?.length)}
                  />
                ) : (
                  <div className="hidden lg:block"></div>
                )}

                <UniInput
                  control={form.control}
                  name={`items.${index}.price`}
                  label={t("price")}
                  type="number"
                  step="0.01"
                  placeholder={`0.00 ${tCommon("currency")}`}
                  readOnly
                  required
                />

                <UniInput
                  control={form.control}
                  name={`items.${index}.quantity`}
                  label={t("quantity")}
                  type="number"
                  min="1"
                  placeholder="1"
                  disabled={isEdit}
                  required
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
