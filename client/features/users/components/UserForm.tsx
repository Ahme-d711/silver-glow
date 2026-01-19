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
import { Loader2, Camera, X } from "lucide-react";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { z } from "zod";
import React, { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserFormValues = z.infer<typeof createUserSchema>;

interface UserFormProps {
  defaultValues?: Partial<UserFormValues>;
  onSubmit: (values: UserFormValues, pictureFile?: File) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  isEdit?: boolean;
}

export function UserForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Submit",
  isEdit = false,
}: UserFormProps) {
  const [preview, setPreview] = useState<string | null>(defaultValues?.picture || null);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema) as unknown as Resolver<UserFormValues>,
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setSelectedFile(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    form.setValue("picture", "");
  };

  const handleSubmit = (values: UserFormValues) => {
    onSubmit(values, selectedFile);
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleSubmit, (errors) => {
          console.error("Form Validation Errors:", errors);
        })} 
        className="space-y-6 py-4"
      >
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center justify-center space-y-4 pb-4">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-divider shadow-sm">
              <AvatarImage src={preview || ""} alt="Profile preview" className="object-cover" />
              <AvatarFallback className="bg-secondary text-primary">
                <Camera className="h-10 w-10 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            
            {/* Edit/Add Icon Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-primary/90 transition-all border-2 border-white"
            >
              <Camera className="h-4 w-4" />
            </button>

            {preview && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-1 -right-1 bg-destructive text-white rounded-full p-1 shadow-md hover:bg-destructive/90 transition-colors border-2 border-white"
              >
                <X className="h-3 w-3" />
              </button>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <FormInputField
            control={form.control as unknown as Control<FieldValues>}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            required
          />
          
          {!isEdit && (
            <>
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
                required
              />
            </>
          )}

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

        <div className="flex pt-4 gap-3">
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
        </div>
      </form>
    </Form>
  );
}
