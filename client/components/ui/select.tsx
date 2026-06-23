"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { useLocale } from "next-intl"

import { cn } from "@/lib/utils"

function useSelectDirection() {
  const locale = useLocale()
  return locale === "ar" ? "rtl" : "ltr"
}

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  const direction = useSelectDirection()
  const isRtl = direction === "rtl"

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      dir={direction}
      className={cn(
        "border-divider/80 bg-white text-content-primary data-[placeholder]:text-content-tertiary relative flex h-12! w-fit items-center rounded-xl border px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 outline-none hover:border-primary/30 hover:bg-primary/[0.03] focus-visible:border-primary/40 focus-visible:ring-[3px] focus-visible:ring-primary/15 data-[state=open]:border-primary/40 data-[state=open]:bg-primary/[0.04] data-[state=open]:ring-[3px] data-[state=open]:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:hover:bg-input/50 data-[size=default]:h-9 data-[size=sm]:h-8 [&_[data-slot=select-value]]:line-clamp-1 [&_[data-slot=select-value]]:block [&_[data-slot=select-value]]:w-full [&_[data-slot=select-value]]:min-w-0 [&_[data-slot=select-value]]:pe-8 [&_[data-slot=select-value]]:text-start [&_svg]:pointer-events-none [&_svg]:absolute [&_svg]:end-3 [&_svg]:top-1/2 [&_svg]:-translate-y-1/2 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:text-content-tertiary [&_svg]:transition-transform [&_svg]:duration-200 data-[state=open]:[&_svg]:rotate-180 data-[state=open]:[&_svg]:text-primary",
        isRtl && "[&_[data-slot=select-value]]:text-right",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const direction = useSelectDirection()
  const isRtl = direction === "rtl"

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        dir={direction}
        className={cn(
          "bg-white text-content-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[10rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl border border-divider/70 shadow-[0_16px_48px_-16px_rgba(25,44,86,0.22)] backdrop-blur-xl",
          isRtl && "text-right",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1.5 data-[side=left]:-translate-x-1.5 data-[side=right]:translate-x-1.5 data-[side=top]:-translate-y-1.5",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-2 space-y-0.5",
            position === "popper" &&
              "w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  const isRtl = useSelectDirection() === "rtl"

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-2 rounded-xl py-2.5 ps-3.5 pe-10 text-sm font-medium text-content-secondary outline-none transition-colors duration-200 select-none hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary data-[highlighted]:bg-primary/5 data-[highlighted]:text-primary data-[state=checked]:bg-primary/10 data-[state=checked]:font-semibold data-[state=checked]:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        isRtl && "text-right",
        className
      )}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="absolute end-2.5 flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-3.5 stroke-[2.5]" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
