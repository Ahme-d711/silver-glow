"use client";

import { useForm, Resolver, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  getCreateUserSchema,
  UserFormValues,
  EditUserFormValues,
} from "../../schemas/user.schema";
import type { SharedUserFormProps } from "../../types/user-form.types";
import { useUserPictureUpload } from "./useUserPictureUpload";
import { submitUserFormWithOptionalFile } from "./userForm.utils";
import { UserFormLayout } from "./UserFormLayout";
import { CreateUserFormFields } from "./CreateUserFormFields";

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
    <UserFormLayout
      form={form as unknown as UseFormReturn<EditUserFormValues>}
      preview={preview}
      fileInputRef={fileInputRef}
      onImageChange={handleImageChange}
      onRemoveImage={removeImage}
      onSubmit={handleSubmit as (values: EditUserFormValues) => void}
      isLoading={isLoading}
      onCancel={onCancel}
      submitLabel={submitLabel}
      t={t}
      tCommon={tCommon}
    >
      <CreateUserFormFields control={form.control} t={t} />
    </UserFormLayout>
  );
}
