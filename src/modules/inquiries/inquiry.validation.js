import { body } from 'express-validator';

export const createInquiryValidation = [
  body('vehicleId').trim().notEmpty().withMessage('Vehicle ID is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required')
    .isLength({ min: 5, max: 150 }).withMessage('Subject must be between 5 and 150 characters'),
  body('message').trim().notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
];

export const replyValidation = [
  body('message').trim().notEmpty().withMessage('Reply message is required')
    .isLength({ min: 1, max: 1000 }).withMessage('Reply cannot exceed 1000 characters'),
];

export const updateStatusValidation = [
  body('status').notEmpty().withMessage('Status is required')
    .isIn(['open', 'in_progress', 'resolved', 'closed']).withMessage('Invalid status value'),
  body('assignedAgentId').optional()
    .isInt({ min: 1 }).withMessage('assignedAgentId must be a valid user ID'),
];