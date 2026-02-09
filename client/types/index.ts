
export * from "./api.types";
export * from "./common.types";

export type PopulatedField<T> = T | string;

// Reusable types for items with bilingual names
export interface BilingualItem {
  nameAr: string;
  nameEn: string;
}

export interface BilingualItemWithId extends BilingualItem {
  _id: string;
}

// Reference types for populated fields
export * from "./error.types";
