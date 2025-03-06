import { z } from 'zod';
import { UserRole } from '../user/user.interface';

export const userRegisterValidation = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
  role: z
    .enum([UserRole.TENANT, UserRole.LANDLORD], {
      message: 'Invalid role value',
    })
    .default(UserRole.TENANT),
});
export const userLoginValidation = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});
