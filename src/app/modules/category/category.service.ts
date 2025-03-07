import { Category } from './category.model';
import { ICategory } from './category.interface';
import { TQuery } from '../../interface';
const createCategoryIntoDb = (data: Partial<ICategory>) => {
  return Category.create(data);
};

const findAllCategoriesFromDb = (query: TQuery) => {
  return Category.find(query);
};

const updateCategoryIntoDb = (data: Partial<ICategory>, id: string) => {
  return Category.findByIdAndUpdate(id, data, { new: true });
};

export const CategoryService = {
  createCategoryIntoDb,
  updateCategoryIntoDb,
  findAllCategoriesFromDb,
};
