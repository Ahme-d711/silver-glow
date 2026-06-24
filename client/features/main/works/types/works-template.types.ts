export interface WorksShowcaseItemData {
  id: string;
  image: string;
  imageAltKey: string;
  labelKey: string;
  titleKey: string;
  descriptionKey: string;
  reverse?: boolean;
}

export interface WorksShowcaseItemProps {
  image: string;
  imageAlt: string;
  label: string;
  title: string;
  description: string;
  reverse?: boolean;
}

export interface WorksStatItem {
  id: string;
  valueKey: string;
  labelKey: string;
}
