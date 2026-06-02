import { validationResult } from 'express-validator';
import { registerUser, loginUser } from './auth.service.js';
import { successResponse, errorResponse } from '../../utils/apiResponse.js';

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const { firstName, lastName, email, password, phone } = req.body;
    const result = await registerUser({ firstName, lastName, email, password, phone });

    return successResponse(res, 201, 'Account created successfully', result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const { email, password } = req.body;
    const result = await loginUser({ email, password });

    return successResponse(res, 200, 'Login successful', result);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    return successResponse(res, 200, 'User retrieved successfully', { user: req.user });
  } catch (error) {
    next(error);
  }
};