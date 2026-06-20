import { body } from 'express-validator';

export const createBlogValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('category').isIn(['INSIGHTS', 'ENGINEERING', 'ANNOUNCEMENTS']).withMessage('Invalid category'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').notEmpty().withMessage('Excerpt is required'),
  body('coverUrl').notEmpty().withMessage('Cover URL is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('publishedDate').isISO8601().withMessage('Valid published date is required'),
  body('status').optional().isIn(['Published', 'Draft']).withMessage('Invalid status'),
];

export const updateBlogValidation = [
  body('title').optional().trim().notEmpty(),
  body('category').optional().isIn(['INSIGHTS', 'ENGINEERING', 'ANNOUNCEMENTS']),
  body('content').optional().notEmpty(),
  body('excerpt').optional().notEmpty(),
  body('coverUrl').optional().notEmpty(),
  body('author').optional().notEmpty(),
  body('publishedDate').optional().isISO8601(),
  body('status').optional().isIn(['Published', 'Draft']),
];