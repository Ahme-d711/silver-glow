import { Schema, model } from "mongoose";
import { ICategory } from "../types/category.type.js";
import { slugify } from "../utils/string.utils.js";

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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CategorySchema.virtual("subcategoriesCount", {
  ref: "subcategories",
  localField: "_id",
  foreignField: "categoryId",
  count: true,
  match: { isDeleted: false },
});

CategorySchema.pre("save", async function () {
  if (this.isModified("nameEn")) {
    this.slug = slugify(this.nameEn);
  }
});

CategorySchema.index({ nameAr: 1 });
CategorySchema.index({ nameEn: 1 });
CategorySchema.index({ slug: 1 }, { unique: true });
CategorySchema.index({ isShow: 1 });
CategorySchema.index({ isDeleted: 1 });
CategorySchema.index({ priority: -1 });

export const CategoryModel = model<ICategory>("categories", CategorySchema);
