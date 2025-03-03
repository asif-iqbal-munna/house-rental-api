import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

// Define routes
router.post('/register', AuthController.handleRegistration);
router.post('/login', AuthController.handleLogin);

export const authRoutes = router;
