import { validationResult } from 'express-validator';
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
} from './booking.service.js';
import { successResponse } from '../../utils/apiResponse.js';

export const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const booking = await createBooking(req.body, req.user.id);
    return successResponse(res, 201, 'Booking created successfully', { booking });
  } catch (error) {
    next(error);
  }
};

export const myBookings = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await getMyBookings(req.user.id, parseInt(page), parseInt(limit));
    return successResponse(res, 200, 'Bookings retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const allBookings = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const result = await getAllBookings(parseInt(page), parseInt(limit), filters);
    return successResponse(res, 200, 'All bookings retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const booking = await getBookingById(req.params.id, req.user.id, req.user.role);
    return successResponse(res, 200, 'Booking retrieved successfully', { booking });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const booking = await updateBookingStatus(
      req.params.id,
      req.body,
      req.user.id,
      req.user.role
    );
    return successResponse(res, 200, 'Booking status updated successfully', { booking });
  } catch (error) {
    next(error);
  }
};