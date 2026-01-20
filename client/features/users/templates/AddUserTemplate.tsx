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
import { UserFormValues } from "../schemas/user.schema";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddUserTemplate({ open, onOpenChange }: AddUserDialogProps) {
  const { mutate: createUser, isPending } = useCreateUser();

  const handleSubmit = (payload: UserFormValues | FormData) => {
    let finalPayload = payload;

    // If it's not FormData, clean values before sending
    if (!(payload instanceof FormData)) {
      const cleanPayload = { ...payload };
      if (!cleanPayload.password) delete cleanPayload.password;
      if (!cleanPayload.address) delete cleanPayload.address;
      finalPayload = cleanPayload;
    }

    createUser({ payload: finalPayload }, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-content-primary">Add New User</DialogTitle>
        </DialogHeader>

        <UserForm
          onSubmit={handleSubmit}
          isLoading={isPending}
          onCancel={() => onOpenChange(false)}
          submitLabel="Create User"
        />
      </DialogContent>
    </Dialog>
  );
}
