"use client";

import { useTranslations } from "next-intl";
import { ABOUT_MAIN_SECTIONS } from "../../constants/about.constants";
import { AboutSection } from "./AboutSection";
import { AboutValuesSection } from "./AboutValuesSection";

export function AboutContent() {
  const t = useTranslations("About");
  const [mission, history] = ABOUT_MAIN_SECTIONS;

  return (
    <div className="space-y-8">
      <AboutSection title={t(mission.titleKey)} body={t(mission.bodyKey)} />
      <AboutValuesSection />
      <AboutSection title={t(history.titleKey)} body={t(history.bodyKey)} />
    </div>
  );
}
