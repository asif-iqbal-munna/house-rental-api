/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

// Enum for User Roles
export enum UserRole {
  ADMIN = 'admin',
  TENANT = 'tenant',
  LANDLORD = 'landlord',
}

// User Schema Definition
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  fullName(): string;
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
