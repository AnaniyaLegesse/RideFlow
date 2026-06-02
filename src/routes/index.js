import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import vehicleRoutes from '../modules/vehicles/vehicle.routes.js';
import bookingRoutes from '../modules/bookings/booking.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

router.use('/auth', authRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/bookings', bookingRoutes);

export default router;