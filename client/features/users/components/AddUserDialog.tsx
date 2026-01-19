"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateUser } from "../hooks/useUser";
import { UserForm } from "./UserForm";
import { UserFormValues } from "../schemas/user.schema";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
  const { mutate: createUser, isPending } = useCreateUser();

  const handleSubmit = (data: UserFormValues) => {
    // Clean values before sending
    const payload = {
      ...data,
      role: data.role as "admin" | "user",
      password: data.password || undefined,
      address: data.address || undefined,
    };

    createUser(
      { payload },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
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
