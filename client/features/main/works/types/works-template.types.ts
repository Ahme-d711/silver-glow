export interface WorksShowcaseItemData {
  id: string;
  labelKey: string;
  titleKey: string;
  descriptionKey: string;
  imageKey: string;
  reverse?: boolean;
}

export interface WorksShowcaseItemProps {
  label: string;
  title: string;
  description: string;
  imagePlaceholder: string;
  reverse?: boolean;
}
