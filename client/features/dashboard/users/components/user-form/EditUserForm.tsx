"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { getEditUserSchema, EditUserFormValues } from "../../schemas/user.schema";
import type { SharedUserFormProps } from "../../types/user-form.types";
import { useUserPictureUpload } from "./useUserPictureUpload";
import { submitUserFormWithOptionalFile } from "./userForm.utils";
import { UserFormLayout } from "./UserFormLayout";

export function EditUserForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Submit",
}: SharedUserFormProps) {
  const t = useTranslations("Users");
  const tCommon = useTranslations("Common");
  const tValidation = useTranslations("Validation");

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(getEditUserSchema(tValidation)) as Resolver<EditUserFormValues>,
    defaultValues: {
      name: defaultValues?.name || "",
      picture: defaultValues?.picture || "",
      role: (defaultValues?.role as EditUserFormValues["role"]) || "user",
      isActive: defaultValues?.isActive ?? true,
      isVerified: defaultValues?.isVerified ?? false,
      address: defaultValues?.address || "",
    },
  });

  const { preview, fileInputRef, selectedFile, handleImageChange, removeImage } =
    useUserPictureUpload(defaultValues?.picture, form.setValue);

  const handleSubmit = (values: EditUserFormValues) => {
    submitUserFormWithOptionalFile(values, selectedFile, onSubmit);
  };

  return (
    <UserFormLayout
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
