"use client";

import { useForm, Control, FieldValues, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/shared/FormInputField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { createUserSchema as userSchema } from "../schemas/user.schema";
import { z } from "zod";

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  defaultValues?: Partial<UserFormValues>;
  onSubmit: (values: UserFormValues) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
}

export function UserForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Submit",
}: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema) as unknown as Resolver<UserFormValues>,
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      password: defaultValues?.password || "",
      phone: defaultValues?.phone || "",
      picture: defaultValues?.picture || "",
      role: (defaultValues?.role as UserFormValues["role"]) || "user",
      isActive: defaultValues?.isActive ?? true,
      isVerified: defaultValues?.isVerified ?? false,
      isBlocked: defaultValues?.isBlocked ?? false,
      address: defaultValues?.address || "",
      totalOrders: defaultValues?.totalOrders ?? 0,
      totalBalance: defaultValues?.totalBalance ?? 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <FormInputField
            control={form.control as unknown as Control<FieldValues>}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            required
          />
          <FormInputField
            control={form.control as unknown as Control<FieldValues>}
            name="email"
            label="Email Address"
            placeholder="john@example.com"
            type="email"
            required
          />
          <FormInputField
            control={form.control as unknown as Control<FieldValues>}
            name="password"
            label="Password"
            placeholder="••••••"
            type="password"
            required={!defaultValues} // Only required for new users
          />
          <FormInputField
            control={form.control as unknown as Control<FieldValues>}
            name="phone"
            label="Phone Number"
            placeholder="+20..."
            type="tel"
            required
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">User Role <span className="text-destructive ml-1">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white border-divider rounded-xl h-11 w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-divider rounded-xl" position="popper">
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormInputField
            control={form.control as unknown as Control<FieldValues>}
            name="address"
            label="Address (Optional)"
            placeholder="Street name, City..."
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between gap-4 space-y-0">
                <FormLabel className="text-base text-primary font-semibold">Active Status</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isVerified"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between gap-4 space-y-0">
                <FormLabel className="text-base text-primary font-semibold">Verified Phone</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />

        <div className="flex justify-end pt-4 gap-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="rounded-xl h-11 px-6 cursor-pointer"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-white hover:bg-primary/90 rounded-xl h-11 px-8 cursor-pointer"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
