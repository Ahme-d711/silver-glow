"use client";

import { useForm, useFieldArray, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import { Form } from "@/components/ui/form";
import { settingsSchema, SettingsFormValues } from "../schemas/settingsSchema";
import { useSettings } from "../hooks/useSettings";
import UniLoading from "@/components/shared/UniLoading";
import {
  SETTINGS_TABS,
  SETTINGS_TABS_WITH_GLOBAL_SAVE,
} from "./settings-form/settingsTabs.constants";
import { SettingsFormTabs } from "./settings-form/SettingsFormTabs";
import { SettingsSaveActions } from "./settings-form/SettingsSaveActions";

export function SettingsForm() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const displayTabs = isRtl ? [...SETTINGS_TABS].reverse() : SETTINGS_TABS;
  const { settings, updateSettings, isUpdating, isLoading } = useSettings();
  const [activeTab, setActiveTab] = useState("shipping");

  const showGlobalSave = SETTINGS_TABS_WITH_GLOBAL_SAVE.includes(
    activeTab as (typeof SETTINGS_TABS_WITH_GLOBAL_SAVE)[number],
  );

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema) as Resolver<SettingsFormValues>,
    defaultValues: {
      shippingCost: 0,
      taxRate: 0,
      freeShippingThreshold: 0,
      currency: "EGP",
      contactEmail: "",
      contactPhone: "",
      termsConditionsAr: "",
      termsConditionsEn: "",
      socialLinks: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        shippingCost: settings.shippingCost,
        taxRate: settings.taxRate,
        freeShippingThreshold: settings.freeShippingThreshold,
        currency: settings.currency,
        contactEmail: settings.contactEmail || "",
        contactPhone: settings.contactPhone || "",
        termsConditionsAr: settings.termsConditionsAr || "",
        termsConditionsEn: settings.termsConditionsEn || "",
        socialLinks: settings.socialLinks || [],
      });
    }
  }, [settings, form]);

  async function onSubmit(data: SettingsFormValues) {
    await updateSettings(data);
  }

  if (isLoading) {
    return <UniLoading />;
  }

  return (
    <Form {...form}>
      <SettingsFormTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        displayTabs={displayTabs}
        control={form.control}
        fields={fields}
        append={append}
        remove={remove}
      />

      {showGlobalSave && (
        <SettingsSaveActions
          isUpdating={isUpdating}
          onSave={form.handleSubmit(onSubmit)}
        />
      )}
    </Form>
  );
}
