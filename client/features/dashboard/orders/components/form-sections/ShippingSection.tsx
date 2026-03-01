import React from "react";
import { Control } from "react-hook-form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { UniTextarea } from "@/components/shared/uni-form/UniTextarea";
import { UniAsyncCombobox } from "@/components/shared/uni-form/UniAsyncCombobox";
import { BilingualItem } from "@/types";
import { SectionHeader } from "./SectionHeader";

interface ShippingSectionProps {
  control: Control<any>;
  t: (key: string) => string;
  tCommon: (key: string) => string;
}

export function ShippingSection({
  control,
  t,
  tCommon,
}: ShippingSectionProps) {
  return (
    <div className="space-y-4">
      <SectionHeader title={t("shipping_info")} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UniInput
          control={control}
          name="recipientName"
          label={t("recipient_name")}
          placeholder={t("enter_recipient_name")}
          required
        />

        <UniInput
          control={control}
          name="recipientPhone"
          label={t("recipient_phone")}
          placeholder={tCommon("phone_placeholder") || "+1234567890"}
          required
        />
      </div>

      <UniTextarea
        control={control}
        name="shippingAddress"
        label={t("shipping_address")}
        placeholder={t("enter_full_address")}
        rows={3}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UniInput
          control={control}
          name="city"
          label={t("city")}
          placeholder={t("enter_city")}
          required
        />

        <UniAsyncCombobox
          control={control}
          name="governorate"
          label={t("governorate")}
          fetchData={async (search) => {
            const { EGYPT_GOVERNORATES } = await import("@/constants/governorates");
            return EGYPT_GOVERNORATES.filter((g) => 
              g.nameAr.includes(search) || 
              g.nameEn.toLowerCase().includes(search.toLowerCase())
            );
          }}
          placeholder={t("select_governorate")}
          searchPlaceholder={tCommon("search")}
          emptyMessage={tCommon("no_data")}
          getItemLabel={(g: BilingualItem) => {
            // Using a simple check for locale since we can't easily access useLocale here without passing it
            // but we can check if it's browser-only or pass it as prop if needed.
            // For now, let's assume it can be handled inside the component or passed.
            const locale = typeof window !== 'undefined' ? window.localStorage.getItem("NEXT_LOCALE") || "ar" : "ar";
            return locale === "ar" ? g.nameAr : g.nameEn;
          }}
          getItemValue={(g: BilingualItem) => g.nameEn}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UniInput
          control={control}
          name="country"
          label={t("country")}
          placeholder={t("enter_country")}
          required
        />

        <UniInput
          control={control}
          name="postalCode"
          label={t("postal_code")}
          placeholder={tCommon("postal_code_placeholder") || "12345"}
        />
      </div>
    </div>
  );
}
