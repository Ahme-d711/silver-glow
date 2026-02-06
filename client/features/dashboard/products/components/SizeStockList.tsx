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
}

interface SizeStockListProps {
  value?: SizeStock[];
  onChange: (value: SizeStock[]) => void;
}

export function SizeStockList({ value = [], onChange }: SizeStockListProps) {
  const t = useTranslations("Common");
  const items = value || [];

  const handleAdd = () => {
    const newItems = [...items, { size: "", stock: 0 }];
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
        <Label className="text-base font-semibold">Sizes & Stock</Label>
        <Button
          type="button"
          onClick={handleAdd}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Size
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-end gap-3 p-3 border rounded-lg bg-neutral-50/50">
            <div className="flex-1 space-y-1">
              <Label className="text-xs text-muted-foreground">Size</Label>
              <Input
                value={item.size}
                onChange={(e) => handleChange(index, "size", e.target.value)}
                placeholder="e.g. 5.0, S, M"
                className="h-9"
              />
            </div>
            <div className="flex-1 space-y-1">
              <Label className="text-xs text-muted-foreground">Stock</Label>
              <Input
                type="number"
                min="0"
                value={item.stock}
                onChange={(e) => handleChange(index, "stock", parseInt(e.target.value) || 0)}
                className="h-9"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => handleRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
            No sizes added yet. Click "Add Size" to start.
          </div>
        )}
      </div>
    </div>
  );
}
