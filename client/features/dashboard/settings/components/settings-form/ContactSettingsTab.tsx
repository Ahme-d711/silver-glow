import { Control } from "react-hook-form";
import { useTranslations, useLocale } from "next-intl";
import { TabsContent } from "@/components/ui/tabs";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { SettingsFormValues } from "../../schemas/settingsSchema";
import { SettingsSectionHeader } from "./SettingsSectionHeader";

type ContactSettingsTabProps = {
  control: Control<SettingsFormValues>;
};

export function ContactSettingsTab({ control }: ContactSettingsTabProps) {
  const t = useTranslations("Dashboard");
  const isRtl = useLocale() === "ar";

  return (
    <TabsContent value="contact" className="space-y-6 outline-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[24px] border border-divider shadow-sm">
        <SettingsSectionHeader
          title={t("contact_info")}
          description={t("contact_info_desc")}
          isRtl={isRtl}
        />

        <UniInput
          control={control}
          name="contactEmail"
          label={t("contact_email")}
          placeholder="support@example.com"
          type="email"
        />

        <UniInput
          control={control}
          name="contactPhone"
          label={t("contact_phone")}
          placeholder="+20123456789"
          type="text"
        />
      </div>
    </TabsContent>
  );
}
