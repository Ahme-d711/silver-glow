import { type Document } from "mongoose";

export interface ICategory extends Document {
  nameAr: string;
  nameEn: string;
  image?: string;
  isShow: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
