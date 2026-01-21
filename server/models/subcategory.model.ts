import { Schema, model } from "mongoose";
import { ISubcategory } from "../types/subcategory.type.js";
import { slugify } from "../utils/string.utils.js";

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
    descriptionAr: {
      type: String,
      required: false,
      trim: true,
    },
    descriptionEn: {
      type: String,
      required: false,
      trim: true,
    },
    priority: {
      type: Number,
      required: true,
      default: 0,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
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
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

SubcategorySchema.pre("save", async function () {
  if (this.isModified("nameEn")) {
    this.slug = slugify(this.nameEn);
  }
});

SubcategorySchema.index({ nameAr: 1 });
SubcategorySchema.index({ nameEn: 1 });
SubcategorySchema.index({ slug: 1 }, { unique: true });
SubcategorySchema.index({ categoryId: 1 });
SubcategorySchema.index({ isShow: 1 });
SubcategorySchema.index({ isDeleted: 1 });
SubcategorySchema.index({ priority: -1 });

export const SubcategoryModel = model<ISubcategory>("subcategories", SubcategorySchema);
