import type { LucideIcon } from "lucide-react";

export interface SupportContactItem {
  id: string;
  icon: LucideIcon;
  titleKey: "email_title" | "phone_title" | "chat_title";
  descriptionKey: "email_desc" | "phone_desc" | "chat_desc";
  actionKey: "email_action" | "phone_action" | "chat_action";
  href?: string;
  actionType: "link" | "button";
}

export interface SupportFaqItemData {
  id: string;
  questionKey: "faq_track_question" | "faq_return_question" | "faq_shipping_question";
  answerKey: "faq_track_answer" | "faq_return_answer" | "faq_shipping_answer";
}

export interface SupportContactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  href?: string;
  actionType: "link" | "button";
  onAction?: () => void;
}

export interface SupportFaqItemProps {
  question: string;
  answer: string;
}

export interface SupportStatItem {
  id: string;
  valueKey: string;
  labelKey: string;
}
