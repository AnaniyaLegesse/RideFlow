import { validationResult } from 'express-validator';
import {
  createInquiry,
  getMyInquiries,
  getAllInquiries,
  getInquiryById,
  addReply,
  updateInquiryStatus,
} from './inquiry.service.js';
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

    const inquiry = await createInquiry(req.body, req.user);
    return successResponse(res, 201, 'Inquiry submitted successfully', { inquiry });
  } catch (error) {
    next(error);
  }
};

export const myInquiries = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await getMyInquiries(req.user.id, parseInt(page), parseInt(limit));
    return successResponse(res, 200, 'Inquiries retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const allInquiries = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const result = await getAllInquiries(parseInt(page), parseInt(limit), filters);
    return successResponse(res, 200, 'All inquiries retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const inquiry = await getInquiryById(req.params.id, req.user.id, req.user.role);
    return successResponse(res, 200, 'Inquiry retrieved successfully', { inquiry });
  } catch (error) {
    next(error);
  }
};

export const reply = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const inquiry = await addReply(req.params.id, req.body, req.user);
    return successResponse(res, 200, 'Reply added successfully', { inquiry });
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

    const inquiry = await updateInquiryStatus(req.params.id, req.body);
    return successResponse(res, 200, 'Inquiry status updated successfully', { inquiry });
  } catch (error) {
    next(error);
  }
};