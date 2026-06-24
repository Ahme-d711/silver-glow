export interface PrivacySectionItem {
  id: string;
  titleKey: string;
  introKey?: string;
  bodyKey?: string;
  listKeys?: string[];
}

export interface PrivacySectionProps {
  id: string;
  title: string;
  intro?: string;
  body?: string;
  listItems?: string[];
}

export interface PrivacyTableOfContentsProps {
  sections: { id: string; title: string }[];
  activeId?: string;
}
