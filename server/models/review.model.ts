import { Schema, model, Types } from "mongoose";
import { IReview } from "../types/review.type.js";
import { ProductModel } from "./product.model.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *         - rating
 *       properties:
 *         id: { type: string }
 *         userId: { type: string }
 *         productId: { type: string }
 *         rating: { type: number, minimum: 1, maximum: 5 }
 *         comment: { type: string }
 */

const ReviewSchema = new Schema<IReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: false,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one review per product
ReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

// Static method to calculate average rating
ReviewSchema.statics.calculateAverageRating = async function (productId: Types.ObjectId) {
  const stats = await this.aggregate([
    {
      $match: { productId },
    },
    {
      $group: {
        _id: "$productId",
        numReviews: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await ProductModel.findByIdAndUpdate(productId, {
      numReviews: stats[0].numReviews,
      averageRating: Math.round(stats[0].averageRating * 10) / 10, // Round to 1 decimal
    });
  } else {
    await ProductModel.findByIdAndUpdate(productId, {
      numReviews: 0,
      averageRating: 0,
    });
  }
};

// Call calculateAverageRating after save
ReviewSchema.post("save", async function () {
  await (this.constructor as any).calculateAverageRating(this.productId);
});

// Call calculateAverageRating before remove (using findOneAndDelete)
ReviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await (model("reviews") as any).calculateAverageRating(doc.productId);
  }
});

// For updates (findOneAndUpdate)
ReviewSchema.post("findOneAndUpdate", async function (doc) {
    if (doc) {
      await (model("reviews") as any).calculateAverageRating(doc.productId);
    }
});

export const ReviewModel = model<IReview>("reviews", ReviewSchema);
