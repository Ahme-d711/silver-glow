"use client";

import { useTranslations } from "next-intl";
import { ABOUT_STORY_BLOCKS } from "../../constants/about.constants";
import { AboutStoryBlock } from "./AboutStoryBlock";

export function AboutStorySection() {
  const t = useTranslations("About");

  return (
    <section className="space-y-20 md:space-y-28">
      {ABOUT_STORY_BLOCKS.map((block) => (
        <AboutStoryBlock
          key={block.id}
          image={block.image}
          imageAlt={t(`${block.id}_image_alt`)}
          title={t(block.titleKey)}
          body={t(block.bodyKey)}
          reverse={block.reverse}
        />
      ))}
    </section>
  );
}
