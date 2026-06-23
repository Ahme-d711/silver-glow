import type { ReactNode, RefObject, ChangeEvent } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { useTranslations } from "next-intl";
import type { EditUserFormValues, UserFormValues } from "../schemas/user.schema";

export interface UserFormProps {
  defaultValues?: Partial<UserFormValues | EditUserFormValues>;
  onSubmit: (values: UserFormValues | EditUserFormValues | FormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  isEdit?: boolean;
}

export type SharedUserFormProps = Pick<
  UserFormProps,
  "defaultValues" | "onSubmit" | "isLoading" | "onCancel" | "submitLabel"
>;

export type UserFormTranslations = ReturnType<typeof useTranslations>;

export interface UserFormLayoutProps {
  form: UseFormReturn<EditUserFormValues>;
  preview: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onSubmit: (values: EditUserFormValues) => void;
  isLoading: boolean;
  onCancel?: () => void;
  submitLabel: string;
  t: UserFormTranslations;
  tCommon: UserFormTranslations;
  children?: ReactNode;
}

export interface UserFormAvatarProps {
  preview: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export interface UserFormActionsProps {
  isLoading: boolean;
  onCancel?: () => void;
  submitLabel: string;
  cancelLabel: string;
}
