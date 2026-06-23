import { Control } from "react-hook-form";
import { useTranslations, useLocale } from "next-intl";
import { TabsContent } from "@/components/ui/tabs";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { SettingsFormValues } from "../../schemas/settingsSchema";
import { SettingsSectionHeader } from "./SettingsSectionHeader";

type ShippingSettingsTabProps = {
  control: Control<SettingsFormValues>;
};

export function ShippingSettingsTab({ control }: ShippingSettingsTabProps) {
  const t = useTranslations("Dashboard");
  const isRtl = useLocale() === "ar";

  return (
    <TabsContent value="shipping" className="space-y-6 outline-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[24px] border border-divider shadow-sm">
        <SettingsSectionHeader
          title={t("shipping_and_tax")}
          description={t("shipping_and_tax_desc")}
          isRtl={isRtl}
        />

        <UniInput
          control={control}
          name="shippingCost"
          label={t("shipping_cost")}
          placeholder="50"
          type="number"
          min={0}
        />

        <UniInput
          control={control}
          name="freeShippingThreshold"
          label={t("free_shipping_threshold")}
          placeholder="1000"
          type="number"
          min={0}
          helperText={t("free_shipping_helper")}
        />

        <UniInput
          control={control}
          name="taxRate"
          label={`${t("tax_rate")} (%)`}
          placeholder="14"
          type="number"
          min={0}
        />

        <UniInput
          control={control}
          name="currency"
          label={t("currency")}
          placeholder="EGP"
          type="text"
        />
      </div>
    </TabsContent>
  );
}
