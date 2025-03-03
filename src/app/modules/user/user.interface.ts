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

export interface UserModel extends Model<IUser> {
  checkUserExistByEmail(email: string): Promise<IUser | null>;
  checkUserExistById(id: string): Promise<IUser | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
}
