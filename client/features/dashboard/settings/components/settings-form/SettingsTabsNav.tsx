import { useTranslations } from "next-intl";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SETTINGS_TABS } from "./settingsTabs.constants";

type SettingsTabsNavProps = {
  displayTabs?: typeof SETTINGS_TABS | typeof SETTINGS_TABS[number][];
};

export function SettingsTabsNav({
  displayTabs = SETTINGS_TABS,
}: SettingsTabsNavProps) {
  const t = useTranslations("Dashboard");

  return (
    <TabsList
      dir="ltr"
      className="h-14 px-2 rounded-xl mb-6 w-full justify-start"
    >
      {displayTabs.map((tab) => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          className="rounded-lg px-6 text-base h-11 data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-sm"
        >
          {t(tab.labelKey)}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
