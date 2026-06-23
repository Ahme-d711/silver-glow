import type { AboutSectionItem, AboutValueItem } from "../types/about-template.types";

export const ABOUT_MAIN_SECTIONS: AboutSectionItem[] = [
  {
    id: "mission",
    titleKey: "mission_title",
    bodyKey: "mission_body",
  },
  {
    id: "history",
    titleKey: "history_title",
    bodyKey: "history_body",
  },
];

export const ABOUT_VALUE_ITEMS: AboutValueItem[] = [
  {
    id: "quality",
    titleKey: "quality_title",
    descriptionKey: "quality_desc",
  },
  {
    id: "sustainability",
    titleKey: "sustainability_title",
    descriptionKey: "sustainability_desc",
  },
];
