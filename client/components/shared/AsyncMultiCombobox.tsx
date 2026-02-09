"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, Loader, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { Badge } from "@/components/ui/badge";

interface AsyncMultiComboboxProps<TItem = object> {
  value?: string[];
  onValueChange: (value: string[]) => void;
  onSelect?: (items: TItem[]) => void;
  fetchData: (search: string) => Promise<TItem[]>;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  renderItem?: (item: TItem) => React.ReactNode;
  getItemLabel?: (item: TItem) => string;
  getItemValue?: (item: TItem) => string;
  className?: string;
  disabled?: boolean;
}

export function AsyncMultiCombobox<TItem = object>({
  value = [],
  onValueChange,
  onSelect,
  fetchData,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  emptyMessage = "No items found.",
  renderItem,
  getItemLabel = (item) => {
    const record = item as Record<string, unknown>;
    return (record.name as string) || (record.title as string) || (record.nameEn as string) || "";
  },
  getItemValue = (item) => {
    const record = item as Record<string, unknown>;
    return (record._id as string) || (record.id as string) || "";
  },
  className,
  disabled,
}: AsyncMultiComboboxProps<TItem>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [items, setItems] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<TItem[]>([]);

  const loadData = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const data = await fetchData(query);
      setItems(data || []);
    } catch (error) {
      console.error("Failed to fetch combobox data:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    if (open) {
      loadData(debouncedSearch);
    }
  }, [debouncedSearch, open, loadData]);

  // Handle initial values or external value changes
  useEffect(() => {
    const fetchSelectedItems = async () => {
      if (value.length > 0 && selectedItems.length === 0) {
        // This is a bit tricky since we don't have a getByIdApi here.
        // For now, we'll rely on items being populated via fetchData
        // Or passed in. In a real scenario, we might need a separate way 
        // to resolve IDs to Labels if they aren't in the current result set.
      }
    };
    fetchSelectedItems();
  }, [value]);

  const toggleItem = (item: TItem) => {
    const id = getItemValue(item);
    const newValue = value.includes(id)
      ? value.filter((v) => v !== id)
      : [...value, id];
    
    onValueChange(newValue);
    
    if (value.includes(id)) {
      setSelectedItems(prev => prev.filter(i => getItemValue(i) !== id));
    } else {
      setSelectedItems(prev => [...prev, item]);
    }
  };

  const removeItem = (id: string) => {
    const newValue = value.filter((v) => v !== id);
    onValueChange(newValue);
    setSelectedItems(prev => prev.filter(i => getItemValue(i) !== id));
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between rounded-xl font-normal h-auto min-h-12 py-2", className)}
            disabled={disabled}
          >
            <div className="flex flex-wrap gap-1.5 flex-1 items-center">
              {value.length > 0 && selectedItems.length > 0 ? (
                selectedItems.map((item) => (
                  <Badge 
                    key={getItemValue(item)}
                    variant="secondary"
                    className="pl-2 pr-1 py-0.5 rounded-md bg-secondary/30 text-primary border-none flex items-center gap-1 z-50 pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span className="text-[10px] sm:text-xs">{getItemLabel(item)}</span>
                    <div
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(getItemValue(item));
                      }}
                      className="hover:bg-primary/20 rounded-full p-0.5 cursor-pointer flex items-center justify-center"
                    >
                      <X className="h-3 w-3" />
                    </div>
                  </Badge>
                ))
              ) : (
                <span className="truncate text-content-tertiary">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-2xl overflow-hidden border-divider shadow-xl">
          <div className="flex items-center border-b px-3 border-divider">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex h-11 w-full border-none bg-transparent py-3 text-sm outline-none ring-0 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto p-1 scrollbar-thin">
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : items.length === 0 ? (
              <div className="py-6 text-center text-sm text-content-tertiary">
                {emptyMessage}
              </div>
            ) : (
              items.map((item) => {
                const itemValue = getItemValue(item);
                const isSelected = value.includes(itemValue);
                return (
                  <div
                    key={itemValue}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2.5 text-sm outline-none transition-colors hover:bg-secondary/10",
                      isSelected && "bg-secondary/20 font-medium text-primary"
                    )}
                    onClick={() => toggleItem(item)}
                  >
                    <div className="flex-1 truncate">
                      {renderItem ? renderItem(item) : getItemLabel(item)}
                    </div>
                    {isSelected && (
                      <Check className="ml-2 h-4 w-4 shrink-0 opacity-100" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
