import { type Document, type Schema } from "mongoose";

export interface ISubcategory extends Document {
  nameAr: string;
  nameEn: string;
  categoryId: Schema.Types.ObjectId;
  image?: string;
  isShow: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
