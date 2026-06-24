import { Gem, ShieldCheck, Sparkles } from "lucide-react";
import { ABOUT_IMAGES } from "./about.images";
import type { AboutStoryBlockData, AboutStatItem, AboutValueItem } from "../types/about-template.types";

export const ABOUT_STORY_BLOCKS: AboutStoryBlockData[] = [
  {
    id: "mission",
    image: ABOUT_IMAGES.collection,
    titleKey: "mission_title",
    bodyKey: "mission_body",
  },
  {
    id: "history",
    image: ABOUT_IMAGES.craft,
    titleKey: "history_title",
    bodyKey: "history_body",
    reverse: true,
  },
];

export const ABOUT_VALUE_ITEMS: AboutValueItem[] = [
  {
    id: "sterling",
    icon: Gem,
    titleKey: "quality_title",
    descriptionKey: "quality_desc",
  },
  {
    id: "craft",
    icon: Sparkles,
    titleKey: "craft_title",
    descriptionKey: "craft_desc",
  },
  {
    id: "trust",
    icon: ShieldCheck,
    titleKey: "trust_title",
    descriptionKey: "trust_desc",
  },
];

export const ABOUT_STATS: AboutStatItem[] = [
  { id: "silver", valueKey: "stat_silver_value", labelKey: "stat_silver_label" },
  { id: "pieces", valueKey: "stat_pieces_value", labelKey: "stat_pieces_label" },
  { id: "since", valueKey: "stat_since_value", labelKey: "stat_since_label" },
];
