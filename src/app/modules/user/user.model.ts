import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, IUserMethods, UserModel, UserRole } from './user.interface';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
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

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
});

const userModel = model<IUser, UserModel>('User', userSchema);

export default userModel;
