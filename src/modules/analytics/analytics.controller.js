import { query, validationResult } from 'express-validator';
import {
  getOverviewStats,
  getRevenueByDateRange,
  getMostBookedVehicles,
  getFleetStats,
  getRecentBookings,
} from './analytics.service.js';
import { successResponse } from '../../utils/apiResponse.js';

export const overviewValidation = [
  query('startDate').optional().isISO8601().withMessage('startDate must be a valid date'),
  query('endDate').optional().isISO8601().withMessage('endDate must be a valid date'),
  query('limit').optional().isInt({ min: 1, max: 20 }).withMessage('limit must be between 1 and 20'),
];

export const overview = async (req, res, next) => {
  try {
    const stats = await getOverviewStats();
    return successResponse(res, 200, 'Overview statistics retrieved successfully', stats);
  } catch (error) {
    next(error);
  }
};

export const revenueByDate = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Invalid query parameters',
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const { startDate, endDate } = req.query;
    const stats = await getRevenueByDateRange(startDate, endDate);
    return successResponse(res, 200, 'Revenue statistics retrieved successfully', stats);
  } catch (error) {
    next(error);
  }
};

export const mostBooked = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const stats = await getMostBookedVehicles(limit);
    return successResponse(res, 200, 'Most booked vehicles retrieved successfully', { vehicles: stats });
  } catch (error) {
    next(error);
  }
};

export const fleetStats = async (req, res, next) => {
  try {
    const stats = await getFleetStats();
    return successResponse(res, 200, 'Fleet statistics retrieved successfully', stats);
  } catch (error) {
    next(error);
  }
};

export const recentBookings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const bookings = await getRecentBookings(limit);
    return successResponse(res, 200, 'Recent bookings retrieved successfully', { bookings });
  } catch (error) {
    next(error);
  }
};