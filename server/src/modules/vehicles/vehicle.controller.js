import { validationResult } from 'express-validator';
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  deleteVehicleImage,
} from './vehicle.service.js';
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

    const vehicle = await createVehicle(req.body, req.files, req.user.id);
    return successResponse(res, 201, 'Vehicle created successfully', { vehicle });
  } catch (error) {
    next(error);
  }
};

export const list = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Invalid query parameters',
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const { page = 1, limit = 10, ...filters } = req.query;
    const result = await getVehicles(filters, parseInt(page), parseInt(limit));
    return successResponse(res, 200, 'Vehicles retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const vehicle = await getVehicleById(req.params.id);
    return successResponse(res, 200, 'Vehicle retrieved successfully', { vehicle });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const vehicle = await updateVehicle(req.params.id, req.body, req.files, req.user.id);
    return successResponse(res, 200, 'Vehicle updated successfully', { vehicle });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteVehicle(req.params.id);
    return successResponse(res, 200, 'Vehicle deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const removeImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(422).json({ success: false, message: 'publicId is required' });
    }

    const vehicle = await deleteVehicleImage(id, publicId);
    return successResponse(res, 200, 'Image deleted successfully', { vehicle });
  } catch (error) {
    next(error);
  }
};