import { body, query } from 'express-validator';

export const createVehicleValidation = [
  body('make')
    .trim()
    .notEmpty().withMessage('Make is required')
    .isLength({ max: 50 }).withMessage('Make cannot exceed 50 characters'),

  body('model')
    .trim()
    .notEmpty().withMessage('Model is required')
    .isLength({ max: 50 }).withMessage('Model cannot exceed 50 characters'),

  body('year')
    .notEmpty().withMessage('Year is required')
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('Please provide a valid year'),

  body('pricePerDay')
    .notEmpty().withMessage('Price per day is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['economy', 'compact', 'suv', 'luxury', 'van', 'electric', 'convertible'])
    .withMessage('Invalid category'),

  body('fuelType')
    .notEmpty().withMessage('Fuel type is required')
    .isIn(['petrol', 'diesel', 'electric', 'hybrid'])
    .withMessage('Invalid fuel type'),

  body('transmission')
    .notEmpty().withMessage('Transmission is required')
    .isIn(['manual', 'automatic'])
    .withMessage('Invalid transmission type'),

  body('seats')
    .notEmpty().withMessage('Number of seats is required')
    .isInt({ min: 1, max: 20 }).withMessage('Seats must be between 1 and 20'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),

  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Location cannot exceed 100 characters'),

  body('features')
    .optional()
    .isArray().withMessage('Features must be an array'),
  
  body('plateNumber')
  .optional()
  .trim()
  .isLength({ max: 20 }).withMessage('Plate number cannot exceed 20 characters'),

  body('batteryOrFuel')
    .optional()
    .trim()
    .isLength({ max: 10 }).withMessage('Battery/fuel cannot exceed 10 characters'),

  body('currentLocation')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Current location cannot exceed 100 characters'),
];

export const updateVehicleValidation = [
  body('make').optional().trim().isLength({ max: 50 }),
  body('model').optional().trim().isLength({ max: 50 }),
  body('year').optional().isInt({ min: 1900, max: new Date().getFullYear() + 1 }),
  body('pricePerDay').optional().isFloat({ min: 0 }),
  body('category').optional().isIn(['economy', 'compact', 'suv', 'luxury', 'van', 'electric', 'convertible']),
  body('fuelType').optional().isIn(['petrol', 'diesel', 'electric', 'hybrid']),
  body('transmission').optional().isIn(['manual', 'automatic']),
  body('seats').optional().isInt({ min: 1, max: 20 }),
  body('isAvailable').optional().isBoolean(),
  body('description').optional().trim().isLength({ max: 1000 }),
  body('location').optional().trim().isLength({ max: 100 }),
  body('features').optional().isArray(),

  body('plateNumber').optional().trim().isLength({ max: 20 }),
  body('batteryOrFuel').optional().trim().isLength({ max: 10 }),
  body('currentLocation').optional().trim().isLength({ max: 100 }),
];

export const listVehiclesValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive number'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('minPrice').optional().isFloat({ min: 0 }),
  query('maxPrice').optional().isFloat({ min: 0 }),
  query('category').optional().isIn(['economy', 'compact', 'suv', 'luxury', 'van', 'electric', 'convertible']),
  query('fuelType').optional().isIn(['petrol', 'diesel', 'electric', 'hybrid']),
  query('transmission').optional().isIn(['manual', 'automatic']),
  query('isAvailable').optional().isBoolean(),
  query('plateNumber').optional().trim().isLength({ max: 20 }),
  query('batteryOrFuel').optional().trim().isLength({ max: 10 }),
  query('currentLocation').optional().trim().isLength({ max: 100 }),
];