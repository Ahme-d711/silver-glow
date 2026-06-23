import {
  Control,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  FieldArrayWithId,
} from "react-hook-form";
import { useTranslations, useLocale } from "next-intl";
import { Plus, Trash2 } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UniInput } from "@/components/shared/uni-form/UniInput";
import { cn } from "@/lib/utils";
import { SettingsFormValues } from "../../schemas/settingsSchema";

type SocialLinksSettingsTabProps = {
  control: Control<SettingsFormValues>;
  fields: FieldArrayWithId<SettingsFormValues, "socialLinks", "id">[];
  append: UseFieldArrayAppend<SettingsFormValues, "socialLinks">;
  remove: UseFieldArrayRemove;
};

export function SocialLinksSettingsTab({
  control,
  fields,
  append,
  remove,
}: SocialLinksSettingsTabProps) {
  const t = useTranslations("Dashboard");
  const isRtl = useLocale() === "ar";

  return (
    <TabsContent value="links" className="space-y-6 outline-none">
      <div className="bg-white p-8 rounded-[24px] border border-divider shadow-sm">
        <div
          className={cn(
            "flex justify-between items-center mb-6 gap-4",
            isRtl && "flex-row-reverse",
          )}
        >
          <div className={cn(isRtl && "text-right")}>
            <h3 className="text-xl font-bold text-primary">{t("social_links")}</h3>
            <p className="text-sm text-content-secondary">{t("social_links_desc")}</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ platform: "", link: "" })}
            className="border-primary text-primary hover:bg-primary/5 rounded-xl h-10 px-4"
          >
            <Plus className="w-4 h-4 me-2" />
            {t("add_social_link")}
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-2xl border border-divider bg-slate-50/50"
            >
              <div className="md:col-span-5">
                <UniInput
                  control={control}
                  name={`socialLinks.${index}.platform`}
                  label={t("platform")}
                  placeholder={t("platform_placeholder")}
                />
              </div>
              <div className="md:col-span-6">
                <UniInput
                  control={control}
                  name={`socialLinks.${index}.link`}
                  label={t("link_url")}
                  placeholder={t("link_url_placeholder")}
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
              <p className="text-content-secondary">{t("no_social_links")}</p>
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
}
