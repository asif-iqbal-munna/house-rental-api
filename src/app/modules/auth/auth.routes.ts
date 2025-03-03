import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateResource } from '../../middlewares/validateRequest';
import { userRegisterValidation } from './auth.validation';

const router = Router();

// Define routes
router.post(
  '/register',
  validateResource(userRegisterValidation),
  AuthController.handleRegistration,
);
router.post('/login', AuthController.handleLogin);

export const authRoutes = router;
