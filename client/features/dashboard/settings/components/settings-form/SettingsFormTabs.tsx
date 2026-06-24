import { Control, UseFieldArrayAppend, UseFieldArrayRemove, FieldArrayWithId } from "react-hook-form";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { SettingsFormValues } from "../../schemas/settingsSchema";
import { SecuritySettings } from "../SecuritySettings";
import { PhoneSettings } from "../PhoneSettings";
import { TermsSettings } from "../TermsSettings";
import { PrivacySettings } from "../PrivacySettings";
import { SettingsTabsNav } from "./SettingsTabsNav";
import { ShippingSettingsTab } from "./ShippingSettingsTab";
import { ContactSettingsTab } from "./ContactSettingsTab";
import { SocialLinksSettingsTab } from "./SocialLinksSettingsTab";
import { SETTINGS_TABS } from "./settingsTabs.constants";

type SettingsFormTabsProps = {
  activeTab: string;
  onTabChange: (value: string) => void;
  displayTabs: typeof SETTINGS_TABS | (typeof SETTINGS_TABS)[number][];
  control: Control<SettingsFormValues>;
  fields: FieldArrayWithId<SettingsFormValues, "socialLinks", "id">[];
  append: UseFieldArrayAppend<SettingsFormValues, "socialLinks">;
  remove: UseFieldArrayRemove;
};

export function SettingsFormTabs({
  activeTab,
  onTabChange,
  displayTabs,
  control,
  fields,
  append,
  remove,
}: SettingsFormTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full space-y-6">
      <SettingsTabsNav displayTabs={displayTabs} />

      <ShippingSettingsTab control={control} />
      <ContactSettingsTab control={control} />
      <SocialLinksSettingsTab
        control={control}
        fields={fields}
        append={append}
        remove={remove}
      />

      <TabsContent value="terms" className="space-y-6 outline-none">
        <TermsSettings control={control} />
      </TabsContent>

      <TabsContent value="privacy" className="space-y-6 outline-none">
        <PrivacySettings control={control} />
      </TabsContent>

      <TabsContent value="security" className="space-y-6 outline-none">
        <SecuritySettings />
      </TabsContent>

      <TabsContent value="phone" className="space-y-6 outline-none">
        <PhoneSettings />
      </TabsContent>
    </Tabs>
  );
}
