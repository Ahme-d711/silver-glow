import { type Document, Schema, Types } from "mongoose";

export interface IProduct extends Document {
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  price: number;
  oldPrice?: number;
  costPrice?: number;
  stock: number;
  sku?: string;
  slug: string;
  mainImage: string;
  images: string[];
  categoryId: Types.ObjectId;
  subCategoryId?: Types.ObjectId;
  brandId?: Types.ObjectId;
  sectionId?: Types.ObjectId;
  priority: number;
  isShow: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
