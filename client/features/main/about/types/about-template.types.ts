export interface AboutSectionItem {
  id: string;
  titleKey: string;
  bodyKey: string;
}

export interface AboutValueItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
}

export interface AboutSectionProps {
  title: string;
  body: string;
}

export interface AboutValueCardProps {
  title: string;
  description: string;
}
