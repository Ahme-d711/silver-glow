import { Schema, model } from "mongoose";
import { IProduct } from "../types/product.type.js";
import { slugify } from "../utils/string.utils.js";

const ProductSchema = new Schema<IProduct>(
  {
    nameAr: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    nameEn: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
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
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    oldPrice: {
      type: Number,
      required: false,
      min: 0,
    },
    costPrice: {
      type: Number,
      required: false,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    sku: {
      type: String,
      required: false,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mainImage: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "subcategories",
      required: false,
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "brands",
      required: false,
    },
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "sections",
      required: false,
    },
    priority: {
      type: Number,
      required: true,
      default: 0,
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

ProductSchema.pre("validate", async function () {
  if (this.isModified("nameEn")) {
    const baseSlug = slugify(this.nameEn);
    let slug = baseSlug;
    let count = 0;
    
    // Check if slug already exists (excluding the current document)
    while (await model("products").findOne({ slug, _id: { $ne: this._id } })) {
      count++;
      slug = `${baseSlug}-${count}`;
    }
    
    this.slug = slug;
  }
});

ProductSchema.index({ nameAr: "text", nameEn: "text" });
ProductSchema.index({ categoryId: 1 });
ProductSchema.index({ subCategoryId: 1 });
ProductSchema.index({ brandId: 1 });
ProductSchema.index({ sectionId: 1 });
ProductSchema.index({ isShow: 1 });
ProductSchema.index({ isDeleted: 1 });
ProductSchema.index({ priority: -1 });
ProductSchema.index({ createdAt: -1 });

export const ProductModel = model<IProduct>("products", ProductSchema);
