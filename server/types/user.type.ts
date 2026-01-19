import { type Document } from "mongoose";


export const USER_ROLES = ["admin", "user"] as const;
export type UserRole = typeof USER_ROLES[number];

export interface IUser extends Document{
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  picture?: string;
  isActive?: boolean;
  isVerified?: boolean;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  }