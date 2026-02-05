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
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface UniSwitchProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
}

export function UniSwitch<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  className,
  labelClassName,
  disabled = false,
  required = false,
  helperText,
}: UniSwitchProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-row items-center justify-between gap-4 p-4 border border-divider/50 rounded-xl bg-white", className)} id={name}>
          <FormLabel className={cn("text-base text-primary font-semibold cursor-pointer flex-1", labelClassName)}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <div className="flex flex-col items-end gap-1">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
                className="data-[state=checked]:bg-primary"
              />
            </FormControl>
            {helperText && (
              <p className="text-xs text-content-tertiary">
                {helperText}
              </p>
            )}
            <FormMessage className="text-xs" />
          </div>
        </FormItem>
      )}
    />
  );
}
