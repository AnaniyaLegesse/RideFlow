import { Router } from 'express';
import {
  overview,
  revenueByDate,
  mostBooked,
  fleetStats,
  recentBookings,
  overviewValidation,
} from './analytics.controller.js';
import authenticate from '../../middleware/authenticate.js';
import authorize from '../../middleware/authorize.js';

const router = Router();

router.use(authenticate);
router.use(authorize('admin'));

router.get('/overview', overview);
router.get('/revenue', overviewValidation, revenueByDate);
router.get('/most-booked', mostBooked);
router.get('/fleet', fleetStats);
router.get('/recent-bookings', recentBookings);

export default router;