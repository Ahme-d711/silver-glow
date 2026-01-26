import { LucideIcon } from 'lucide-react';

/**
 * Type for Lucide React icons
 */
export type IconType = LucideIcon;

/**
 * Generic type for MongoDB populated fields
 * Can be either an ID string or the populated object
 */
export type PopulatedField<T> = string | T;

/**
 * Props for Recharts custom label components
 */
export interface ChartLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
  value?: number;
  index?: number;
}

/**
 * Category reference (can be populated or just ID)
 */
export interface CategoryReference {
  _id: string;
  nameAr: string;
  nameEn: string;
}

/**
 * SubCategory reference (can be populated or just ID)
 */
export interface SubCategoryReference {
  _id: string;
  nameAr: string;
  nameEn: string;
}

/**
 * Brand reference (can be populated or just ID)
 */
export interface BrandReference {
  _id: string;
  nameAr: string;
  nameEn: string;
  logo?: string;
}

/**
 * Section reference (can be populated or just ID)
 */
export interface SectionReference {
  _id: string;
  nameAr: string;
  nameEn: string;
}

/**
 * User reference (can be populated or just ID)
 */
export interface UserReference {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  picture?: string;
}
