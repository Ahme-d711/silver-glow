"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { settingsSchema, SettingsFormValues } from "../schemas/settingsSchema";
import { useSettings } from "../hooks/useSettings";
import { useEffect } from "react";
import UniLoading from "@/components/shared/UniLoading";
import { SecuritySettings } from "./SecuritySettings";

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
      contactEmail: "",
      contactPhone: "",
      socialLinks: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  // Populate form when data is loaded
  useEffect(() => {
    if (settings) {
      form.reset({
        shippingCost: settings.shippingCost,
        taxRate: settings.taxRate,
        freeShippingThreshold: settings.freeShippingThreshold,
        currency: settings.currency,
        contactEmail: settings.contactEmail || "",
        contactPhone: settings.contactPhone || "",
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
      <Tabs defaultValue="shipping" className="w-full space-y-6">
          <TabsList className="bg-secondary py-2! h-12 rounded-xl mb-6">
            <TabsTrigger value="shipping" className="rounded-lg px-6 text-base h-11 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              {t("shipping_and_tax")}
            </TabsTrigger>
            <TabsTrigger value="contact" className="rounded-lg px-6 text-base h-11 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              {t("contact_info")}
            </TabsTrigger>
            <TabsTrigger value="links" className="rounded-lg px-6 text-base h-11 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Social Links
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-lg px-6 text-base h-11 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shipping" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[24px] border border-divider shadow-sm">
              <div className="md:col-span-2 mb-2">
                <h3 className="text-xl font-bold text-primary">{t("shipping_and_tax")}</h3>
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
          </TabsContent>

          <TabsContent value="contact" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[24px] border border-divider shadow-sm">
              <div className="md:col-span-2 mb-2">
                <h3 className="text-xl font-bold text-primary">{t("contact_info")}</h3>
                <p className="text-sm text-content-secondary">
                  Configure contact information displayed on the "Need Help" page.
                </p>
              </div>

              <UniInput
                control={form.control}
                name="contactEmail"
                label={t("contact_email")}
                placeholder="support@example.com"
                type="email"
              />

              <UniInput
                control={form.control}
                name="contactPhone"
                label={t("contact_phone")}
                placeholder="+20123456789"
                type="text"
              />
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 outline-none">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="links" className="space-y-6 outline-none">
            <div className="bg-white p-8 rounded-[24px] border border-divider shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-primary">Social Links</h3>
                  <p className="text-sm text-content-secondary">
                    Manage social media and contact links (Facebook, TikTok, Gmail, etc.)
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ platform: "", link: "" })}
                  className="border-primary text-primary hover:bg-primary/5 rounded-xl h-10 px-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Social Link
                </Button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-2xl border border-divider bg-slate-50/50">
                    <div className="md:col-span-5">
                      <UniInput
                        control={form.control}
                        name={`socialLinks.${index}.platform`}
                        label="Platform"
                        placeholder="e.g. TikTok"
                      />
                    </div>
                    <div className="md:col-span-6">
                      <UniInput
                        control={form.control}
                        name={`socialLinks.${index}.link`}
                        label="Link / URL"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="md:col-span-1 flex items-end justify-center pb-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
                {fields.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-divider rounded-[24px]">
                    <p className="text-content-secondary">No social links added yet.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button 
            type="button" 
            onClick={form.handleSubmit(onSubmit)}
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
    </Form>
  );
}
