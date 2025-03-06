import { TQuery } from '../../interface';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = (data: Partial<IUser>) => {
  return User.create(data);
};

const findAllUsersFromDb = (query: TQuery) => {
  return User.find(query);
};

export const UserService = {
  createUserIntoDb,
  findAllUsersFromDb,
};
