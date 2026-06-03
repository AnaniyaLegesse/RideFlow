import { Router } from 'express';
import { overview, revenueByDate, mostBooked, fleetStats, recentBookings, overviewValidation } from './analytics.controller.js';
import authenticate from '../../middleware/authenticate.js';
import authorize from '../../middleware/authorize.js';

const router = Router();

router.use(authenticate);
router.use(authorize('admin'));

/**
 * @swagger
 * /analytics/overview:
 *   get:
 *     summary: Get overview statistics — admin only
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overview statistics retrieved successfully
 *       403:
 *         description: Admin only
 */
router.get('/overview', overview);

/**
 * @swagger
 * /analytics/revenue:
 *   get:
 *     summary: Get revenue by date range — admin only
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date, example: "2026-01-01" }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date, example: "2026-12-31" }
 *     responses:
 *       200:
 *         description: Revenue statistics retrieved successfully
 */
router.get('/revenue', overviewValidation, revenueByDate);

/**
 * @swagger
 * /analytics/most-booked:
 *   get:
 *     summary: Get most booked vehicles — admin only
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 5 }
 *     responses:
 *       200:
 *         description: Most booked vehicles retrieved successfully
 */
router.get('/most-booked', mostBooked);

/**
 * @swagger
 * /analytics/fleet:
 *   get:
 *     summary: Get fleet statistics — admin only
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fleet statistics retrieved successfully
 */
router.get('/fleet', fleetStats);

/**
 * @swagger
 * /analytics/recent-bookings:
 *   get:
 *     summary: Get recent bookings — admin only
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Recent bookings retrieved successfully
 */
router.get('/recent-bookings', recentBookings);

export default router;