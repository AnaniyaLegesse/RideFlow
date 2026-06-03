import { Router } from 'express';
import { create, myBookings, allBookings, getOne, updateStatus } from './booking.controller.js';
import { createBookingValidation, updateBookingStatusValidation } from './booking.validation.js';
import authenticate from '../../middleware/authenticate.js';
import authorize from '../../middleware/authorize.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [vehicleId, startDate, endDate]
 *             properties:
 *               vehicleId: { type: string, example: 6a1fc6ff5700751f741f8e89 }
 *               startDate: { type: string, format: date, example: "2026-07-01" }
 *               endDate: { type: string, format: date, example: "2026-07-05" }
 *               notes: { type: string, example: "Please have the car ready by 9am" }
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       409:
 *         description: Vehicle already booked for selected dates
 */
router.post('/', createBookingValidation, create);

/**
 * @swagger
 * /bookings/my:
 *   get:
 *     summary: Get all bookings for the logged-in user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully
 */
router.get('/my', myBookings);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a single booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Booking retrieved successfully
 *       403:
 *         description: This booking does not belong to you
 *       404:
 *         description: Booking not found
 */
router.get('/:id', getOne);

/**
 * @swagger
 * /bookings/{id}/status:
 *   patch:
 *     summary: Update booking status
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [pending, confirmed, active, completed, cancelled] }
 *               cancellationReason: { type: string }
 *     responses:
 *       200:
 *         description: Booking status updated successfully
 */
router.patch('/:id/status', updateBookingStatusValidation, updateStatus);

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings — admin and sales_agent only
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [pending, confirmed, active, completed, cancelled] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: All bookings retrieved successfully
 *       403:
 *         description: Not authorized
 */
router.get('/', authorize('admin', 'sales_agent'), allBookings);

export default router;