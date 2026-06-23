import {
  BookOpen,
  Clock,
  MessageCircle,
  Search,
  Shield,
  ShoppingBag,
} from "lucide-react";
import type { FeatureItem } from "../types/features-template.types";

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: "fast-delivery",
    icon: Clock,
    titleKey: "fast_delivery_title",
    descriptionKey: "fast_delivery_desc",
  },
  {
    id: "secure-payments",
    icon: Shield,
    titleKey: "secure_payments_title",
    descriptionKey: "secure_payments_desc",
  },
  {
    id: "easy-returns",
    icon: ShoppingBag,
    titleKey: "easy_returns_title",
    descriptionKey: "easy_returns_desc",
  },
  {
    id: "support",
    icon: MessageCircle,
    titleKey: "support_title",
    descriptionKey: "support_desc",
  },
  {
    id: "smart-search",
    icon: Search,
    titleKey: "smart_search_title",
    descriptionKey: "smart_search_desc",
  },
  {
    id: "fashion-blog",
    icon: BookOpen,
    titleKey: "fashion_blog_title",
    descriptionKey: "fashion_blog_desc",
  },
];
