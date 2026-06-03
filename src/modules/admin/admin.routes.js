import { Router } from 'express';
import {
  listUsers,
  updateUser,
  deleteUser,
} from './admin.controller.js';
import authenticate from '../../middleware/authenticate.js';
import authorize from '../../middleware/authorize.js';

const router = Router();

// All admin routes require admin role
router.use(authenticate);
router.use(authorize('admin'));

router.get('/users', listUsers);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;