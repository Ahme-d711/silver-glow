import { type Document, type Schema } from "mongoose";

export interface ISubcategory extends Document {
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  priority: number;
  slug: string;
  categoryId: Schema.Types.ObjectId;
  image?: string;
  isShow: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
