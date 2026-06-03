import { Router } from 'express';
import { create, myInquiries, allInquiries, getOne, reply, updateStatus } from './inquiry.controller.js';
import { createInquiryValidation, replyValidation, updateStatusValidation } from './inquiry.validation.js';
import authenticate from '../../middleware/authenticate.js';
import authorize from '../../middleware/authorize.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /inquiries:
 *   post:
 *     summary: Submit a new inquiry about a vehicle
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [vehicleId, subject, message]
 *             properties:
 *               vehicleId: { type: string, example: 6a1fc6ff5700751f741f8e89 }
 *               subject: { type: string, example: "Question about the car" }
 *               message: { type: string, example: "Does this car have air conditioning?" }
 *     responses:
 *       201:
 *         description: Inquiry submitted successfully
 *       404:
 *         description: Vehicle not found
 */
router.post('/', createInquiryValidation, create);

/**
 * @swagger
 * /inquiries/my:
 *   get:
 *     summary: Get all inquiries for the logged-in customer
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inquiries retrieved successfully
 */
router.get('/my', myInquiries);

/**
 * @swagger
 * /inquiries/{id}:
 *   get:
 *     summary: Get a single inquiry by ID
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Inquiry retrieved successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Inquiry not found
 */
router.get('/:id', getOne);

/**
 * @swagger
 * /inquiries/{id}/reply:
 *   post:
 *     summary: Add a reply to an inquiry
 *     tags: [Inquiries]
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
 *             required: [message]
 *             properties:
 *               message: { type: string, example: "Yes, it has full air conditioning." }
 *     responses:
 *       200:
 *         description: Reply added successfully
 *       409:
 *         description: Inquiry is closed
 */
router.post('/:id/reply', replyValidation, reply);

/**
 * @swagger
 * /inquiries:
 *   get:
 *     summary: Get all inquiries — admin and sales_agent only
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [open, in_progress, resolved, closed] }
 *     responses:
 *       200:
 *         description: All inquiries retrieved successfully
 *       403:
 *         description: Not authorized
 */
router.get('/', authorize('admin', 'sales_agent'), allInquiries);

/**
 * @swagger
 * /inquiries/{id}/status:
 *   patch:
 *     summary: Update inquiry status — admin and sales_agent only
 *     tags: [Inquiries]
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
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [open, in_progress, resolved, closed] }
 *               assignedAgentId: { type: integer }
 *     responses:
 *       200:
 *         description: Inquiry status updated successfully
 */
router.patch('/:id/status', authorize('admin', 'sales_agent'), updateStatusValidation, updateStatus);

export default router;