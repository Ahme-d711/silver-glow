import { Schema, model } from "mongoose";
import { ICategory } from "../types/category.type.js";

const CategorySchema = new Schema<ICategory>(
  {
    nameAr: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    nameEn: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    isShow: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.index({ nameAr: 1 });
CategorySchema.index({ nameEn: 1 });
CategorySchema.index({ isShow: 1 });

export const CategoryModel = model<ICategory>("categories", CategorySchema);
