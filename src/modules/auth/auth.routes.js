import { Router } from 'express';
import { register, login, getMe } from './auth.controller.js';
import { registerValidation, loginValidation } from './auth.validation.js';
import authenticate from '../../middleware/authenticate.js';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, password]
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Sara
 *               lastName:
 *                 type: string
 *                 example: Test
 *               email:
 *                 type: string
 *                 example: sara@example.com
 *               password:
 *                 type: string
 *                 example: Password1
 *               phone:
 *                 type: string
 *                 example: "+251911000001"
 *     responses:
 *       201:
 *         description: Account created successfully
 *       422:
 *         description: Validation failed
 *       409:
 *         description: Email already exists
 */
router.post('/register', registerValidation, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: Password1
 *     responses:
 *       200:
 *         description: Login successful — returns JWT token
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', loginValidation, login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the currently logged-in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       401:
 *         description: Not authenticated
 */
router.get('/me', authenticate, getMe);

export default router;