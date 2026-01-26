"use client";

import { useForm, Control, FieldValues, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { UniSelect } from "@/components/shared/uni-form/UniSelect";
import { UniSwitch } from "@/components/shared/uni-form/UniSwitch";
import { Button } from "@/components/ui/button";
import { Loader, Camera, X } from "lucide-react";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { z } from "zod";
import React, { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/utils/image.utils";
import { useTranslations } from "next-intl";

type UserFormValues = z.infer<typeof createUserSchema>;

interface UserFormProps {
  defaultValues?: Partial<UserFormValues>;
  onSubmit: (values: UserFormValues | FormData) => void;
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
  const t = useTranslations("Users");
  const tCommon = useTranslations("Common");
  
  const initialPreview = getImageUrl(defaultValues?.picture);

  const [preview, setPreview] = useState<string | null>(initialPreview);
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
    if (selectedFile) {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        // Skip picture field if we have a new file, and skip empty values
        if (key !== "picture" && value !== undefined && value !== null && value !== "") {
          formData.append(key, String(value));
        }
      });
      formData.append("picture", selectedFile);
      onSubmit(formData);
    } else {
      onSubmit(values);
    }
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
          <UniInput
            control={form.control}
            name="name"
            label={t("name")}
            placeholder={t("name")}
            required
          />
          
          {!isEdit && (
            <>
              <UniInput
                control={form.control}
                name="email"
                label={t("email")}
                placeholder={t("email")}
                type="email"
                required
              />
              <UniInput
                control={form.control}
                name="password"
                label={t("password")}
                placeholder="••••••"
                type="password"
                required
              />
            </>
          )}

          {isEdit && (
            <UniInput
              control={form.control}
              name="password"
              label={t("password")}
              placeholder="••••••"
              type="password"
            />
          )}

          <UniInput
            control={form.control}
            name="phone"
            label={t("phone")}
            placeholder="+20..."
            type="tel"
            required
          />

          <UniSelect
            control={form.control}
            name="role"
            label={t("role")}
            placeholder={t("select_role")}
            options={[
              { label: t("user"), value: "user" },
              { label: t("admin"), value: "admin" },
              { label: t("employee"), value: "employee" },
            ]}
            required
          />

          <UniInput
            control={form.control}
            name="address"
            label={t("address")}
            placeholder={t("address")}
          />

          <UniSwitch
            control={form.control}
            name="isActive"
            label={t("is_active")}
            disabled={isLoading}
          />

          <UniSwitch
            control={form.control}
            name="isVerified"
            label={t("is_verified")}
            disabled={isLoading}
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
              {tCommon("cancel")}
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-white hover:bg-primary/90 rounded-xl h-11 px-8 cursor-pointer"
          >
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
        </div>
      </form>
    </Form>
  );
}

