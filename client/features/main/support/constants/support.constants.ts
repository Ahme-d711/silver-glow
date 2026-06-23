import { Mail, MessageCircle, Phone } from "lucide-react";
import type { SupportContactItem, SupportFaqItemData } from "../types/support-template.types";

export const SUPPORT_CONTACTS: SupportContactItem[] = [
  {
    id: "email",
    icon: Mail,
    titleKey: "email_title",
    descriptionKey: "email_desc",
    actionKey: "email_action",
    href: "mailto:support@silverglow.com",
    actionType: "link",
  },
  {
    id: "phone",
    icon: Phone,
    titleKey: "phone_title",
    descriptionKey: "phone_desc",
    actionKey: "phone_action",
    href: "tel:+201018939831",
    actionType: "link",
  },
  {
    id: "chat",
    icon: MessageCircle,
    titleKey: "chat_title",
    descriptionKey: "chat_desc",
    actionKey: "chat_action",
    actionType: "button",
  },
];

export const SUPPORT_FAQ_ITEMS: SupportFaqItemData[] = [
  {
    id: "track-order",
    questionKey: "faq_track_question",
    answerKey: "faq_track_answer",
  },
  {
    id: "return-policy",
    questionKey: "faq_return_question",
    answerKey: "faq_return_answer",
  },
  {
    id: "international-shipping",
    questionKey: "faq_shipping_question",
    answerKey: "faq_shipping_answer",
  },
];
