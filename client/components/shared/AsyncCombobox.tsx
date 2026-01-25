"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, Loader, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";

interface AsyncComboboxProps<TItem = object> {
  value?: string;
  onValueChange: (value: string) => void;
  onSelect?: (item: TItem) => void;
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

export function AsyncCombobox<TItem = object>({
  value,
  onValueChange,
  onSelect,
  fetchData,
  placeholder = "Select item...",
  searchPlaceholder = "Search...",
  emptyMessage = "No items found.",
  renderItem,
  getItemLabel = (item) => (item as { name?: string; title?: string }).name || (item as { name?: string; title?: string }).title || "",
  getItemValue = (item) => (item as { _id?: string; id?: string })._id || (item as { _id?: string; id?: string }).id || "",
  className,
  disabled,
}: AsyncComboboxProps<TItem>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [items, setItems] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedItem = useMemo(
    () => items.find((item) => getItemValue(item) === value),
    [items, value, getItemValue]
  );

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

  // Initial load or when debounced search changes
  useEffect(() => {
    if (open) {
      loadData(debouncedSearch);
    }
  }, [debouncedSearch, open, loadData]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between rounded-xl font-normal", className)}
          disabled={disabled}
        >
          <span className="truncate">
            {selectedItem ? getItemLabel(selectedItem) : placeholder}
          </span>
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
              const isSelected = value === itemValue;
              return (
                <div
                  key={itemValue}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2.5 text-sm outline-none transition-colors hover:bg-secondary/10",
                    isSelected && "bg-secondary/20 font-medium text-primary"
                  )}
                  onClick={() => {
                    onValueChange(itemValue);
                    onSelect?.(item);
                    setOpen(false);
                    setSearch("");
                  }}
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
  );
}
