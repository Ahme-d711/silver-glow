"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "../components/UserForm";
import { useCreateUser } from "../hooks/useUser";
import { UserFormValues, EditUserFormValues } from "../schemas/user.schema";
import { useTranslations } from "next-intl";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddUserTemplate({ open, onOpenChange }: AddUserDialogProps) {
  const t = useTranslations("Users");
  const tCommon = useTranslations("Common");
  const { mutate: createUser, isPending } = useCreateUser();

  const handleSubmit = (payload: UserFormValues | EditUserFormValues | FormData) => {
    if (payload instanceof FormData) {
      createUser({ payload }, {
        onSuccess: () => onOpenChange(false),
      });
      return;
    }

    const cleanPayload = { ...payload } as UserFormValues;
    if (!cleanPayload.password) delete cleanPayload.password;
    if (!cleanPayload.address) delete cleanPayload.address;

    createUser({ payload: cleanPayload }, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[820px] max-h-[92vh] overflow-y-auto bg-white rounded-[24px] p-6 sm:p-8">
        <DialogHeader className="text-start">
          <DialogTitle className="text-2xl font-bold text-content-primary">
            {t("add_user")}
          </DialogTitle>
        </DialogHeader>

        <UserForm
          onSubmit={handleSubmit}
          isLoading={isPending}
          onCancel={() => onOpenChange(false)}
          submitLabel={tCommon("create")}
        />
      </DialogContent>
    </Dialog>
  );
}

