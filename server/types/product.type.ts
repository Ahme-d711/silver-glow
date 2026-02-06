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
  sizes?: { size: string; stock: number }[]; // Updated to support stock per size
  categoryId: Types.ObjectId;
  subCategoryId?: Types.ObjectId;
  brandId?: Types.ObjectId;
  sectionIds: Types.ObjectId[];
  priority: number;
  isShow: boolean;
  isDeleted: boolean;
  averageRating: number;
  numReviews: number;
  createdAt?: Date;
  updatedAt?: Date;
}
