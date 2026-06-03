import { Router } from 'express';
import { create, list, getOne, update, remove, removeImage } from './vehicle.controller.js';
import { createVehicleValidation, updateVehicleValidation, listVehiclesValidation } from './vehicle.validation.js';
import authenticate from '../../middleware/authenticate.js';
import authorize from '../../middleware/authorize.js';
import upload from '../../middleware/upload.js';

const router = Router();

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: List all vehicles with filtering and pagination
 *     tags: [Vehicles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: category
 *         schema: { type: string, enum: [economy, compact, suv, luxury, van, electric, convertible] }
 *       - in: query
 *         name: fuelType
 *         schema: { type: string, enum: [petrol, diesel, electric, hybrid] }
 *       - in: query
 *         name: transmission
 *         schema: { type: string, enum: [manual, automatic] }
 *       - in: query
 *         name: isAvailable
 *         schema: { type: boolean }
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *       - in: query
 *         name: maxPrice
 *         schema: { type: number }
 *     responses:
 *       200:
 *         description: Vehicles retrieved successfully
 */
router.get('/', listVehiclesValidation, list);

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get a single vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         example: 6a1fc6ff5700751f741f8e89
 *     responses:
 *       200:
 *         description: Vehicle retrieved successfully
 *       404:
 *         description: Vehicle not found
 */
router.get('/:id', getOne);

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Create a new vehicle listing
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [make, model, year, pricePerDay, category, fuelType, transmission, seats]
 *             properties:
 *               make: { type: string, example: Toyota }
 *               model: { type: string, example: Camry }
 *               year: { type: integer, example: 2023 }
 *               pricePerDay: { type: number, example: 85 }
 *               category: { type: string, enum: [economy, compact, suv, luxury, van, electric, convertible] }
 *               fuelType: { type: string, enum: [petrol, diesel, electric, hybrid] }
 *               transmission: { type: string, enum: [manual, automatic] }
 *               seats: { type: integer, example: 5 }
 *               location: { type: string, example: "Berlin, Germany" }
 *               description: { type: string }
 *               images:
 *                 type: array
 *                 items: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 */
router.post('/', authenticate, authorize('admin', 'sales_agent'), upload.array('images', 10), createVehicleValidation, create);

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Update a vehicle listing
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       404:
 *         description: Vehicle not found
 */
router.put('/:id', authenticate, authorize('admin', 'sales_agent'), upload.array('images', 10), updateVehicleValidation, update);

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle listing
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *       403:
 *         description: Not authorized — admin only
 */
router.delete('/:id', authenticate, authorize('admin'), remove);

/**
 * @swagger
 * /vehicles/{id}/images:
 *   delete:
 *     summary: Delete a specific image from a vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [publicId]
 *             properties:
 *               publicId: { type: string }
 *     responses:
 *       200:
 *         description: Image deleted successfully
 */
router.delete('/:id/images', authenticate, authorize('admin', 'sales_agent'), removeImage);

export default router;