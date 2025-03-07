import { Router } from 'express';
import { CategoryController } from './category.controller';
import { AuthGuard } from '../../middlewares/authGuard';
import { UserRole } from '../user/user.interface';
import { validateResource } from '../../middlewares/validateRequest';
import {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
} from './category.validation';

const router = Router();

// Define routes
router.post(
  '/',
  AuthGuard([UserRole.ADMIN]),
  validateResource(createCategoryValidationSchema),
  CategoryController.handleCreateCategory,
);
router.put(
  '/:_id',
  AuthGuard([UserRole.ADMIN]),
  validateResource(updateCategoryValidationSchema),
  CategoryController.updateCreateCategory,
);
router.get('/', CategoryController.getAllCategories);

export const categoryRoutes = router;
