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
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface UniCheckboxProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
}

export function UniCheckbox<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  className,
  labelClassName,
  disabled = false,
  required = false,
  helperText,
}: UniCheckboxProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-row items-center space-x-3 space-y-0 p-1", className)}>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className="h-5 w-5 rounded border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
            />
          </FormControl>
          <div className="grid gap-1.5 leading-none">
            {label && (
              <FormLabel className={cn("text-base font-semibold text-content-primary cursor-pointer", labelClassName)}>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>
            )}
            {helperText && (
              <p className="text-xs text-content-tertiary">
                {helperText}
              </p>
            )}
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
