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
import { useLocale } from "next-intl";

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
  const isRtl = useLocale() === "ar";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-1.5", isRtl && "text-right", className)} id={name}>
          {label && (
            <FormLabel
              className={cn(
                "text-base text-content-secondary cursor-pointer",
                isRtl && "block w-full text-right",
                labelClassName,
              )}
            >
              {label}
              {required && <span className="text-destructive ms-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              readOnly={readOnly}
              dir={isRtl ? "rtl" : undefined}
                className={cn(
                  "min-h-[100px] rounded-xl border-divider/50 focus:border-primary px-4 shadow-none bg-white resize-none",
                  isRtl && "text-right",
                  textareaClassName
                )}
                {...field}
                value={field.value ?? ""}
              />
          </FormControl>
          {helperText && (
            <p className={cn("text-xs text-content-tertiary", isRtl && "text-right")}>
              {helperText}
            </p>
          )}
          <FormMessage className={cn("text-xs", isRtl && "text-right")} />
        </FormItem>
      )}
    />
  );
}
