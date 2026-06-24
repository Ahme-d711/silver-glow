export interface TermsSectionItem {
  id: string;
  titleKey: string;
  introKey?: string;
  bodyKey?: string;
  listKeys?: string[];
}

export interface TermsSectionProps {
  id: string;
  title: string;
  intro?: string;
  body?: string;
  listItems?: string[];
}

export interface TermsResolvedSection {
  id: string;
  title: string;
  intro?: string;
  body?: string;
  listItems?: string[];
}

export interface TermsTableOfContentsProps {
  sections: { id: string; title: string }[];
}
