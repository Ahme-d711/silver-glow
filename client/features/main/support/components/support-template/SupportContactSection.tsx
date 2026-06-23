"use client";

import { useTranslations } from "next-intl";
import { SUPPORT_CONTACTS } from "../../constants/support.constants";
import { SupportContactCard } from "./SupportContactCard";

export function SupportContactSection() {
  const t = useTranslations("Support");

  return (
    <section className="grid md:grid-cols-3 gap-8">
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
    </section>
  );
}
