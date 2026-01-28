import { Schema, model } from "mongoose";
import { IWishlist } from "../types/wishlist.type.js";

const WishlistSchema = new Schema<IWishlist>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

WishlistSchema.index({ userId: 1 });

export const WishlistModel = model<IWishlist>("wishlists", WishlistSchema);
