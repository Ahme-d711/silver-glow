"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "../components/UserForm";
import { useUpdateUser } from "../hooks/useUser";
import { UserFormValues, EditUserFormValues } from "../schemas/user.schema";
import type { User } from "@/features/auth/types";
import { useTranslations } from "next-intl";

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export default function EditUserTemplate({ open, onOpenChange, user }: EditUserDialogProps) {
  const t = useTranslations("Users");
  const tCommon = useTranslations("Common");
  const { mutate: updateUser, isPending } = useUpdateUser();

  const handleSubmit = (payload: UserFormValues | EditUserFormValues | FormData) => {
    const userId = (user._id || user.id) as string;
    if (!userId) return;

    let finalPayload = payload;

    if (!(payload instanceof FormData)) {
      const cleanPayload = { ...payload };
      if (!cleanPayload.address) delete cleanPayload.address;
      finalPayload = cleanPayload;
    }

    updateUser(
      { id: userId, payload: finalPayload },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  const defaultValues: Partial<EditUserFormValues> = {
    name: user.name || "",
    role: (user.role as EditUserFormValues["role"]) || "user",
    isActive: user.isActive !== false,
    isVerified: user.isVerified as boolean || false,
    address: user.address || "",
    picture: user.picture || user.profileImage || user.photo || "",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-[24px]">
        <DialogHeader className="text-start">
          <DialogTitle className="text-2xl font-bold text-content-primary">
            {t("edit_user")}
          </DialogTitle>
        </DialogHeader>

        <UserForm
          key={(user._id || user.id) as string}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isLoading={isPending}
          onCancel={() => onOpenChange(false)}
          submitLabel={tCommon("save")}
          isEdit={true}
        />
      </DialogContent>
    </Dialog>
  );
}

