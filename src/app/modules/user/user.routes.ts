import { Router } from 'express';
import { UserController } from './user.controller';
import { AuthGuard } from '../../middlewares/authGuard';
import { UserRole } from './user.interface';

const router = Router();

router.get('/', AuthGuard([UserRole.ADMIN]), UserController.getAllUsers);

export const userRoutes = router;
