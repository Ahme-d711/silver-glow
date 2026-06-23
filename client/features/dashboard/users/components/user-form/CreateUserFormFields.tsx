"use client";

import { motion } from "framer-motion";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import type { CreateUserFormFieldsProps } from "../../types/user-form.types";
import { userFormItemVariants } from "./userForm.constants";

export function CreateUserFormFields({ control, t }: CreateUserFormFieldsProps) {
  return (
    <>
      <motion.div variants={userFormItemVariants}>
        <UniInput
          control={control}
          name="email"
          label={t("email")}
          placeholder={t("email")}
          type="email"
          required
        />
      </motion.div>
      <motion.div variants={userFormItemVariants}>
        <UniInput
          control={control}
          name="password"
          label={t("password")}
          placeholder="••••••"
          type="password"
          required
        />
      </motion.div>
      <motion.div variants={userFormItemVariants}>
        <UniInput
          control={control}
          name="phone"
          label={t("phone")}
          placeholder={t("phone")}
          type="tel"
          required
        />
      </motion.div>
    </>
  );
}
