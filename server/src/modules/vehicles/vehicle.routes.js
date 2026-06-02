import { Router } from 'express';
import {
  create,
  list,
  getOne,
  update,
  remove,
  removeImage,
} from './vehicle.controller.js';
import {
  createVehicleValidation,
  updateVehicleValidation,
  listVehiclesValidation,
} from './vehicle.validation.js';
import authenticate from '../../middleware/authenticate.js';
import authorize from '../../middleware/authorize.js';
import upload from '../../middleware/upload.js';

const router = Router();

// Public routes — anyone can view vehicles
router.get('/', listVehiclesValidation, list);
router.get('/:id', getOne);

// Protected routes — only admin and sales_agent can manage vehicles
router.post(
  '/',
  authenticate,
  authorize('admin', 'sales_agent'),
  upload.array('images', 10),
  createVehicleValidation,
  create
);

router.put(
  '/:id',
  authenticate,
  authorize('admin', 'sales_agent'),
  upload.array('images', 10),
  updateVehicleValidation,
  update
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  remove
);

router.delete(
  '/:id/images',
  authenticate,
  authorize('admin', 'sales_agent'),
  removeImage
);

export default router;