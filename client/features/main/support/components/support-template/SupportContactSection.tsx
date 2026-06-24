"use client";

import { useTranslations } from "next-intl";
import { SUPPORT_CONTACTS } from "../../constants/support.constants";
import { SupportContactCard } from "./SupportContactCard";

export function SupportContactSection() {
  const t = useTranslations("Support");

  return (
    <section className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          {t("contact_title")}
        </h2>
        <p className="text-content-secondary leading-relaxed">{t("contact_desc")}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {SUPPORT_CONTACTS.map((contact) => (
          <SupportContactCard
            key={contact.id}
            icon={contact.icon}
            title={t(contact.titleKey)}
            description={t(contact.descriptionKey)}
            actionLabel={t(contact.actionKey)}
            href={contact.href}
            actionType={contact.actionType}
          />
        ))}
      </div>
    </section>
  );
}
