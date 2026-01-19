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
import { UserFormValues } from "../schemas/user.schema";
import type { User } from "@/features/auth/types";

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export default function EditUserTemplate({ open, onOpenChange, user }: EditUserDialogProps) {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const handleSubmit = (data: UserFormValues, pictureFile?: File) => {
    const userId = (user._id || user.id) as string;
    if (!userId) return;

    // Clean values before sending
    const payload = {
      ...data,
      role: data.role as "admin" | "user",
      password: data.password || undefined,
      address: data.address || undefined,
    };

    updateUser(
      { id: userId, payload, pictureFile },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  // Convert User to UserFormValues format
  const defaultValues: Partial<UserFormValues> = {
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    role: (user.role as UserFormValues["role"]) || "user",
    isActive: user.isActive !== false,
    isVerified: user.isVerified as boolean || false,
    address: user.address || "",
    totalOrders: user.totalOrders || 0,
    totalBalance: user.totalBalance || 0,
    picture: user.profileImage || "",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-content-primary">Edit User Profile</DialogTitle>
        </DialogHeader>

        <UserForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isLoading={isPending}
          onCancel={() => onOpenChange(false)}
          submitLabel="Save Changes"
          isEdit={true}
        />
      </DialogContent>
    </Dialog>
  );
}
