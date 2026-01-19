"use client"

import * as React from "react"
import { Control, FieldPath, FieldValues } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FormInputFieldProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: string
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  className?: string
  inputClassName?: string
  labelClassName?: string
  disabled?: boolean
  required?: boolean
  helperText?: string
  autoComplete?: string
}

export function FormInputField<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder = "",
  type = "text",
  className,
  inputClassName,
  labelClassName,
  disabled = false,
  required = false,
  helperText,
  autoComplete,
}: FormInputFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className={cn("text-primary", labelClassName)}>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete={autoComplete}
              className={cn("bg-white", inputClassName)}
              {...field}
            />
          </FormControl>
          {helperText && (
            <div className="text-xs text-primary/60">
              {helperText}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

