import type { PrivacySectionItem } from "../types/privacy-template.types";

export const PRIVACY_LAST_UPDATED = "2026-03-30";

export const PRIVACY_SECTIONS: PrivacySectionItem[] = [
  {
    id: "controller",
    titleKey: "section_controller_title",
    bodyKey: "section_controller_body",
  },
  {
    id: "scope",
    titleKey: "section_scope_title",
    bodyKey: "section_scope_body",
  },
  {
    id: "collect",
    titleKey: "section_collect_title",
    introKey: "section_collect_intro",
    listKeys: [
      "section_collect_list_1",
      "section_collect_list_2",
      "section_collect_list_3",
      "section_collect_list_4",
      "section_collect_list_5",
    ],
  },
  {
    id: "sources",
    titleKey: "section_sources_title",
    bodyKey: "section_sources_body",
  },
  {
    id: "purposes",
    titleKey: "section_purposes_title",
    introKey: "section_purposes_intro",
    listKeys: [
      "section_purposes_list_1",
      "section_purposes_list_2",
      "section_purposes_list_3",
      "section_purposes_list_4",
      "section_purposes_list_5",
    ],
  },
  {
    id: "sharing",
    titleKey: "section_sharing_title",
    introKey: "section_sharing_intro",
    listKeys: [
      "section_sharing_list_1",
      "section_sharing_list_2",
      "section_sharing_list_3",
      "section_sharing_list_4",
    ],
    bodyKey: "section_sharing_body",
  },
  {
    id: "retention",
    titleKey: "section_retention_title",
    bodyKey: "section_retention_body",
  },
  {
    id: "security",
    titleKey: "section_security_title",
    bodyKey: "section_security_body",
  },
  {
    id: "rights",
    titleKey: "section_rights_title",
    introKey: "section_rights_intro",
    listKeys: [
      "section_rights_list_1",
      "section_rights_list_2",
      "section_rights_list_3",
      "section_rights_list_4",
      "section_rights_list_5",
      "section_rights_list_6",
    ],
    bodyKey: "section_rights_body",
  },
  {
    id: "cookies",
    titleKey: "section_cookies_title",
    introKey: "section_cookies_intro",
    listKeys: [
      "section_cookies_list_1",
      "section_cookies_list_2",
      "section_cookies_list_3",
    ],
    bodyKey: "section_cookies_body",
  },
  {
    id: "children",
    titleKey: "section_children_title",
    bodyKey: "section_children_body",
  },
  {
    id: "changes",
    titleKey: "section_changes_title",
    bodyKey: "section_changes_body",
  },
  {
    id: "contact",
    titleKey: "section_contact_title",
    bodyKey: "section_contact_body",
  },
];
