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
import { Eye, EyeOff } from "lucide-react"

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
  const [showPassword, setShowPassword] = React.useState(false)
  const isPassword = type === "password"

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
            <div className="relative">
            <Input
                type={isPassword && showPassword ? "text" : type}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete={autoComplete}
                className={cn("bg-white", isPassword ? "pr-10" : "", inputClassName)}
              {...field}
            />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-primary focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
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

