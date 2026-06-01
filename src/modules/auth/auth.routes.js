import { Router } from 'express';
import { register, login, getMe } from './auth.controller.js';
import { registerValidation, loginValidation } from './auth.validation.js';
import authenticate from '../../middleware/authenticate.js';

const router = Router();

// POST /api/auth/register
router.post('/register', registerValidation, register);

// POST /api/auth/login
router.post('/login', loginValidation, login);

// GET /api/auth/me  (protected)
router.get('/me', authenticate, getMe);

export default router;