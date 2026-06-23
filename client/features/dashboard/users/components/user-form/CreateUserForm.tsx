"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { getCreateUserSchema, UserFormValues } from "../../schemas/user.schema";
import type { SharedUserFormProps } from "../../types/user-form.types";
import { useUserPictureUpload } from "./useUserPictureUpload";
import { submitUserFormWithOptionalFile } from "./userForm.utils";
import { CreateUserFormLayout } from "./CreateUserFormLayout";

export function CreateUserForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Submit",
}: SharedUserFormProps) {
  const t = useTranslations("Users");
  const tCommon = useTranslations("Common");
  const tValidation = useTranslations("Validation");

  const form = useForm<UserFormValues>({
    resolver: zodResolver(getCreateUserSchema(tValidation)) as Resolver<UserFormValues>,
    defaultValues: {
      name: defaultValues?.name || "",
      email: (defaultValues as Partial<UserFormValues>)?.email || "",
      password: (defaultValues as Partial<UserFormValues>)?.password || "",
      phone: (defaultValues as Partial<UserFormValues>)?.phone || "",
      picture: defaultValues?.picture || "",
      gender: (defaultValues as Partial<UserFormValues>)?.gender || "male",
      role: (defaultValues?.role as UserFormValues["role"]) || "user",
      isActive: defaultValues?.isActive ?? true,
      isVerified: defaultValues?.isVerified ?? false,
      address: defaultValues?.address || "",
      totalOrders: (defaultValues as Partial<UserFormValues>)?.totalOrders ?? 0,
      totalBalance: (defaultValues as Partial<UserFormValues>)?.totalBalance ?? 0,
    },
  });

  const { preview, fileInputRef, selectedFile, handleImageChange, removeImage } =
    useUserPictureUpload(defaultValues?.picture, form.setValue);

  const handleSubmit = (values: UserFormValues) => {
    submitUserFormWithOptionalFile(values, selectedFile, onSubmit);
  };

  return (
    <CreateUserFormLayout
      form={form}
      preview={preview}
      fileInputRef={fileInputRef}
      onImageChange={handleImageChange}
      onRemoveImage={removeImage}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onCancel={onCancel}
      submitLabel={submitLabel}
      t={t}
      tCommon={tCommon}
    />
  );
}
