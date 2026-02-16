"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";

import { settingsSchema, SettingsFormValues } from "../schemas/settingsSchema";
import { useSettings } from "../hooks/useSettings";
import { useEffect } from "react";
import UniLoading from "@/components/shared/UniLoading";

export function SettingsForm() {
  const t = useTranslations("Dashboard");
  const { settings, updateSettings, isUpdating, isLoading } = useSettings();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema) as any,
    defaultValues: {
      shippingCost: 0,
      taxRate: 0,
      freeShippingThreshold: 0,
      currency: "EGP",
    },
  });

  // Populate form when data is loaded
  useEffect(() => {
    if (settings) {
      form.reset({
        shippingCost: settings.shippingCost,
        taxRate: settings.taxRate,
        freeShippingThreshold: settings.freeShippingThreshold,
        currency: settings.currency,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-[24px] border border-divider shadow-sm">
          <div className="md:col-span-2 mb-2">
            <h3 className="text-lg font-bold text-primary">{t("shipping_and_tax")}</h3>
            <p className="text-sm text-content-secondary">
              Configure global shipping costs and tax rates applied to orders.
            </p>
          </div>

          <UniInput
            control={form.control}
            name="shippingCost"
            label={t("shipping_cost")}
            placeholder="50"
            type="number"
            min={0}
          />

          <UniInput
            control={form.control}
            name="freeShippingThreshold"
            label={t("free_shipping_threshold")}
            placeholder="1000"
            type="number"
            min={0}
            helperText="Orders above this amount will have free shipping."
          />

          <UniInput
            control={form.control}
            name="taxRate"
            label={t("tax_rate") + " (%)"}
            placeholder="14"
            type="number"
            min={0}
          />

          <UniInput
            control={form.control}
            name="currency"
            label={t("currency")}
            placeholder="EGP"
            type="text"
          />
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isUpdating}
            className="h-12 px-8 min-w-[140px] rounded-xl font-bold bg-[#1B254B] hover:bg-[#1B254B]/90"
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("saving")}...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {t("save_changes")}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
