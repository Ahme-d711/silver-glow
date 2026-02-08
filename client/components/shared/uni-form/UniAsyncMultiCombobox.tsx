"use client";

import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AsyncMultiCombobox } from "../AsyncMultiCombobox";
import { cn } from "@/lib/utils";

interface UniAsyncMultiComboboxProps<TItem = object, TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  fetchData: (search: string) => Promise<TItem[]>;
  onSelect?: (items: TItem[]) => void;
  getItemLabel?: (item: TItem) => string;
  getItemValue?: (item: TItem) => string;
  className?: string;
  cbClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
}

export function UniAsyncMultiCombobox<TItem = object, TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  fetchData,
  onSelect,
  getItemLabel,
  getItemValue,
  className,
  cbClassName,
  labelClassName,
  disabled = false,
  required = false,
  helperText,
}: UniAsyncMultiComboboxProps<TItem, TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-1.5 flex flex-col", className)} id={name}>
          {label && (
            <FormLabel className={cn("text-base text-content-secondary mb-0 cursor-pointer", labelClassName)}>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <AsyncMultiCombobox
              value={field.value || []}
              onValueChange={field.onChange}
              onSelect={onSelect}
              fetchData={fetchData}
              placeholder={placeholder}
              searchPlaceholder={searchPlaceholder}
              emptyMessage={emptyMessage}
              getItemLabel={getItemLabel}
              getItemValue={getItemValue}
              className={cn("h-auto min-h-12 border-divider/50 focus:border-primary shadow-none bg-white", cbClassName)}
              disabled={disabled}
            />
          </FormControl>
          {helperText && (
            <p className="text-xs text-content-tertiary">
              {helperText}
            </p>
          )}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
