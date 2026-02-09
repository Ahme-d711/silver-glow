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
  onValueChange?: (value: string) => void;
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
  onValueChange,
}: UniSelectProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-1.5", className)} id={name}>
          {label && (
            <FormLabel className={cn("text-base text-content-secondary cursor-pointer", labelClassName)}>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <Select 
            onValueChange={(val) => {
              field.onChange(val);
              onValueChange?.(val);
            }} 
            defaultValue={field.value} 
            value={field.value}
          >
            <FormControl>
              <SelectTrigger
                disabled={disabled}
                className={cn(
                  "h-12 rounded-xl border-divider/50 focus:border-primary px-4 shadow-none bg-white w-full",
                  triggerClassName
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="rounded-xl border-divider" position="popper">
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
