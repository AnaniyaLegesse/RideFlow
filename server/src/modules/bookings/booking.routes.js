import { Router } from 'express';
import { create, myBookings, allBookings, getOne, updateStatus } from './booking.controller.js';
import { createBookingValidation, updateBookingStatusValidation } from './booking.validation.js';
import authenticate from '../../middleware/authenticate.js';
import authorize from '../../middleware/authorize.js';

const router = Router();

// All booking routes require authentication
router.use(authenticate);

// Customer routes
router.post('/', createBookingValidation, create);
router.get('/my', myBookings);

// Any authenticated user can view a single booking (ownership checked in service)
router.get('/:id', getOne);
router.patch('/:id/status', updateBookingStatusValidation, updateStatus);

// Admin and sales_agent only
router.get('/', authorize('admin', 'sales_agent'), allBookings);

export default router;