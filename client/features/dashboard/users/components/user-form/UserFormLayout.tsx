"use client";

import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { UniSelect } from "@/components/shared/uni-form/UniSelect";
import { UniSwitch } from "@/components/shared/uni-form/UniSwitch";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { UserFormLayoutProps } from "../../types/user-form.types";
import { userFormContainerVariants, userFormItemVariants } from "./userForm.constants";
import { UserFormAvatar } from "./UserFormAvatar";
import { UserFormActions } from "./UserFormActions";

export function UserFormLayout({
  form,
  preview,
  fileInputRef,
  onImageChange,
  onRemoveImage,
  onSubmit,
  isLoading,
  onCancel,
  submitLabel,
  t,
  tCommon,
  children,
}: UserFormLayoutProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error("Form Validation Errors:", JSON.stringify(errors, null, 2));
          console.log("Current Form Values:", form.getValues());
          toast.error(tCommon("validation_error") || "Please check the form for errors");
        })}
        className="space-y-6 py-4"
      >
        <UserFormAvatar
          preview={preview}
          fileInputRef={fileInputRef}
          onImageChange={onImageChange}
          onRemoveImage={onRemoveImage}
        />

        <motion.div
          className="grid grid-cols-1 gap-6"
          variants={userFormContainerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={userFormItemVariants}>
            <UniInput
              control={form.control}
              name="name"
              label={t("name")}
              placeholder={t("name")}
              required
            />
          </motion.div>

          {children}

          <motion.div variants={userFormItemVariants}>
            <UniSelect
              control={form.control}
              name="role"
              label={t("role")}
              placeholder={t("select_role")}
              options={[
                { label: t("user"), value: "user" },
                { label: t("admin"), value: "admin" },
              ]}
              required
            />
          </motion.div>

          <motion.div variants={userFormItemVariants}>
            <UniInput
              control={form.control}
              name="address"
              label={t("address")}
              placeholder={t("address")}
            />
          </motion.div>

          <motion.div variants={userFormItemVariants}>
            <UniSwitch
              control={form.control}
              name="isActive"
              label={t("is_active")}
              disabled={isLoading}
            />
          </motion.div>

          <motion.div variants={userFormItemVariants}>
            <UniSwitch
              control={form.control}
              name="isVerified"
              label={t("is_verified")}
              disabled={isLoading}
            />
          </motion.div>

          <UserFormActions
            isLoading={isLoading}
            onCancel={onCancel}
            submitLabel={submitLabel}
            cancelLabel={tCommon("cancel")}
          />
        </motion.div>
      </form>
    </Form>
  );
}
