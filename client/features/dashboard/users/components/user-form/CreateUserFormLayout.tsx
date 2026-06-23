"use client";

import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { UniSelect } from "@/components/shared/uni-form/UniSelect";
import { UniSwitch } from "@/components/shared/uni-form/UniSwitch";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { UseFormReturn } from "react-hook-form";
import type { UserFormValues } from "../../schemas/user.schema";
import type { UserFormTranslations } from "../../types/user-form.types";
import { userFormContainerVariants, userFormItemVariants } from "./userForm.constants";
import { UserFormAvatar } from "./UserFormAvatar";
import { UserFormActions } from "./UserFormActions";
import type { UserFormLayoutProps } from "../../types/user-form.types";

type CreateUserFormLayoutProps = Omit<UserFormLayoutProps, "form" | "children" | "onSubmit"> & {
  form: UseFormReturn<UserFormValues>;
  onSubmit: (values: UserFormValues) => void;
  t: UserFormTranslations;
};

export function CreateUserFormLayout({
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
}: CreateUserFormLayoutProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error("Form Validation Errors:", JSON.stringify(errors, null, 2));
          console.log("Current Form Values:", form.getValues());
          toast.error(tCommon("validation_error") || "Please check the form for errors");
        })}
        className="space-y-4 py-2"
      >
        <UserFormAvatar
          preview={preview}
          fileInputRef={fileInputRef}
          onImageChange={onImageChange}
          onRemoveImage={onRemoveImage}
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
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

          <motion.div variants={userFormItemVariants}>
            <UniInput
              control={form.control}
              name="email"
              label={t("email")}
              placeholder={t("email")}
              type="email"
              required
            />
          </motion.div>

          <motion.div variants={userFormItemVariants}>
            <UniInput
              control={form.control}
              name="password"
              label={t("password")}
              placeholder="••••••"
              type="password"
              required
            />
          </motion.div>

          <motion.div variants={userFormItemVariants}>
            <UniInput
              control={form.control}
              name="phone"
              label={t("phone")}
              placeholder={t("phone")}
              type="tel"
              required
            />
          </motion.div>

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
            <UniSelect
              control={form.control}
              name="gender"
              label={t("gender")}
              placeholder={t("select_gender")}
              options={[
                { label: t("male"), value: "male" },
                { label: t("female"), value: "female" },
              ]}
              required
            />
          </motion.div>

          <motion.div variants={userFormItemVariants} className="sm:col-span-2">
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

          <motion.div variants={userFormItemVariants} className="sm:col-span-2">
            <UserFormActions
              isLoading={isLoading}
              onCancel={onCancel}
              submitLabel={submitLabel}
              cancelLabel={tCommon("cancel")}
            />
          </motion.div>
        </motion.div>
      </form>
    </Form>
  );
}
