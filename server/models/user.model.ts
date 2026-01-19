import { IUser, USER_ROLES } from '../types/user.type.js';
import { Schema, model } from "mongoose";



const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 500,
    },
    password: {
      type: String,
      required: false,
      maxlength: 255,
      select: false,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      required: true,
      default: "user",
    },
    picture: {
      type: String,
      required: false,
      trim: true,
      maxlength: 255,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
      maxlength: 20,
    },
    address: {
      type: String,
      required: false,
      trim: true,
      maxlength: 500,
    },
    totalOrders: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
    },
    totalBalance: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
    },
    lastLoginAt: {
      type: Date,
      required: false,
    },
    lastTransactionAt: {
      type: Date,
      required: false,
    },
    isBlocked: {
      type: Boolean,
      required: false,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ isActive: 1 }); // Index for filtering active users

export const UserModel = model<IUser>("users", UserSchema);


