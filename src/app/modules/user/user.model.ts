import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel, UserRole } from './user.interface';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel, IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.TENANT, UserRole.LANDLORD],
      default: UserRole.TENANT,
    },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.checkUserExistByEmail = async function (
  email: string,
): Promise<IUser | null> {
  return await User.findOne({ email });
};

userSchema.statics.checkUserExistById = async function (
  id: string,
): Promise<IUser | null> {
  return await User.findOne({ _id: id });
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
});

export const User = model<IUser, UserModel>('User', userSchema);
