"use client";

import { useState, useEffect } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface SizeStock {
  size: string;
  stock: number;
  price: number;
  oldPrice?: number;
  costPrice?: number;
}

interface SizeStockListProps {
  value?: SizeStock[];
  onChange: (value: SizeStock[]) => void;
}

export function SizeStockList({ value = [], onChange }: SizeStockListProps) {
  const t = useTranslations("Products");
  const tCommon = useTranslations("Common");
  const items = value || [];

  const handleAdd = () => {
    const newItems = [...items, { size: "", stock: 0, price: 0, oldPrice: 0, costPrice: 0 }];
    onChange(newItems);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleChange = (index: number, field: keyof SizeStock, val: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: val };
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">{t("sizes_title")}</Label>
        <Button
          type="button"
          onClick={handleAdd}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {t("add_size")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-2xl bg-neutral-50/50 relative group">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white border shadow-sm text-destructive hover:text-white hover:bg-destructive opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={() => handleRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{t("size_label")}</Label>
                <Input
                  value={item.size}
                  onChange={(e) => handleChange(index, "size", e.target.value)}
                  placeholder={t("size_placeholder")}
                  className="h-10 rounded-xl border-divider focus:ring-primary/20"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{t("stock_label")}</Label>
                <Input
                  type="number"
                  min="0"
                  value={item.stock}
                  onChange={(e) => handleChange(index, "stock", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className="h-10 rounded-xl border-divider focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{t("price_label")}</Label>
                <Input
                  type="number"
                  min="0"
                  value={item.price}
                  onChange={(e) => handleChange(index, "price", parseFloat(e.target.value) || 0)}
                  placeholder={tCommon("price")}
                  className="h-10 rounded-xl border-divider focus:ring-primary/20"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{tCommon("old_price")}</Label>
                <Input
                  type="number"
                  min="0"
                  value={item.oldPrice}
                  onChange={(e) => handleChange(index, "oldPrice", parseFloat(e.target.value) || 0)}
                  placeholder={tCommon("price")}
                  className="h-10 rounded-xl border-divider focus:ring-primary/20"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{tCommon("cost_price")}</Label>
                <Input
                  type="number"
                  min="0"
                  value={item.costPrice}
                  onChange={(e) => handleChange(index, "costPrice", parseFloat(e.target.value) || 0)}
                  placeholder={tCommon("price")}
                  className="h-10 rounded-xl border-divider focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
            {tCommon("no_data_desc")}
          </div>
        )}
      </div>
    </div>
  );
}
