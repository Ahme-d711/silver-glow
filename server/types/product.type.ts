import { type Document, Schema } from "mongoose";

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
  categoryId: Schema.Types.ObjectId;
  subCategoryId?: Schema.Types.ObjectId;
  brandId?: Schema.Types.ObjectId;
  sectionId?: Schema.Types.ObjectId;
  priority: number;
  isShow: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
