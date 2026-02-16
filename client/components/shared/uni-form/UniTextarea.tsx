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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface UniTextareaProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  rows?: number;
  readOnly?: boolean;
}

export function UniTextarea<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder = "",
  className,
  textareaClassName,
  labelClassName,
  disabled = false,
  required = false,
  helperText,
  rows = 4,
  readOnly,
}: UniTextareaProps<TFieldValues>) {
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
          <FormControl>
            <Textarea
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              readOnly={readOnly}
                className={cn(
                  "min-h-[100px] rounded-xl border-divider/50 focus:border-primary px-4 shadow-none bg-white resize-none",
                  textareaClassName
                )}
                {...field}
                value={field.value ?? ""}
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
