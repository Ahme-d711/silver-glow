import { Schema, model } from "mongoose";
import { ISubcategory } from "../types/subcategory.type.js";

const SubcategorySchema = new Schema<ISubcategory>(
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
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
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

SubcategorySchema.index({ nameAr: 1 });
SubcategorySchema.index({ nameEn: 1 });
SubcategorySchema.index({ categoryId: 1 });
SubcategorySchema.index({ isShow: 1 });

export const SubcategoryModel = model<ISubcategory>("subcategories", SubcategorySchema);
