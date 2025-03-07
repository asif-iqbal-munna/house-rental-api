import { z } from 'zod';

export const createCategoryValidationSchema = z.object({
  name: z.string({
    required_error: 'Category name is required',
  }),
  description: z.string().optional(),
  image: z.string().optional(),
  status: z.boolean().optional(),
});

export const updateCategoryValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  status: z.boolean().optional(),
});

export const categoryValidation = {
  create: createCategoryValidationSchema,
  update: updateCategoryValidationSchema,
};
