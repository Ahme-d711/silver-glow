"use client";

import { Control } from "react-hook-form";
import { useTranslations, useLocale } from "next-intl";
import { UniTextarea } from "@/components/shared/uni-form/UniTextarea";
import { SettingsFormValues } from "../schemas/settingsSchema";
import { cn } from "@/lib/utils";

interface PrivacySettingsProps {
  control: Control<SettingsFormValues>;
}

export function PrivacySettings({ control }: PrivacySettingsProps) {
  const t = useTranslations("Dashboard");
  const isRtl = useLocale() === "ar";

  return (
    <div className="grid grid-cols-1 gap-6 bg-white p-8 rounded-[24px] border border-divider shadow-sm">
      <div className={cn("mb-2", isRtl && "text-right")}>
        <h3 className="text-xl font-bold text-primary">{t("privacy_policy")}</h3>
        <p className="text-sm text-content-secondary">{t("privacy_policy_desc")}</p>
      </div>

      <UniTextarea
        control={control}
        name="privacyPolicyEn"
        label={t("privacy_policy_en")}
        placeholder={t("privacy_policy_en_placeholder")}
        rows={16}
        dir="ltr"
        className="md:col-span-1"
      />

      <UniTextarea
        control={control}
        name="privacyPolicyAr"
        label={t("privacy_policy_ar")}
        placeholder={t("privacy_policy_ar_placeholder")}
        rows={16}
        dir="rtl"
        className="md:col-span-1"
      />
    </div>
  );
}
