"use client";

import type { UserFormProps } from "../../types/user-form.types";
import { CreateUserForm } from "./CreateUserForm";
import { EditUserForm } from "./EditUserForm";

export function UserForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Submit",
  isEdit = false,
}: UserFormProps) {
  if (isEdit) {
    return (
      <EditUserForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        isLoading={isLoading}
        onCancel={onCancel}
        submitLabel={submitLabel}
      />
    );
  }

  return (
    <CreateUserForm
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      isLoading={isLoading}
      onCancel={onCancel}
      submitLabel={submitLabel}
    />
  );
}
