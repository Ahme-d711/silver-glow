"use client";

import * as React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface UniSelectOption {
  label: string;
  value: string;
}

interface UniSelectProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  options: UniSelectOption[];
  className?: string;
  triggerClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
}

export function UniSelect<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder = "Select an option",
  options,
  className,
  triggerClassName,
  labelClassName,
  disabled = false,
  required = false,
  helperText,
}: UniSelectProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-1.5", className)}>
          {label && (
            <FormLabel className={cn("text-base text-content-secondary cursor-pointer", labelClassName)}>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
            <FormControl>
              <SelectTrigger
                disabled={disabled}
                className={cn(
                  "h-12 rounded-xl border-divider/50 focus:border-primary px-4 shadow-none bg-white",
                  triggerClassName
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="rounded-xl border-divider">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="rounded-lg">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
