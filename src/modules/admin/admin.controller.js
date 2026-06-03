import {
  getAllUsers,
  updateUserById,
  deleteUserById,
} from './admin.service.js';
import { successResponse } from '../../utils/apiResponse.js';

export const listUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return successResponse(res, 200, 'Users retrieved', { users });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { role, isActive } = req.body;
    if (role && !['customer', 'sales_agent', 'admin'].includes(role)) {
      return res.status(422).json({ success: false, message: 'Invalid role' });
    }
    if (isActive !== undefined && typeof isActive !== 'boolean') {
      return res.status(422).json({ success: false, message: 'isActive must be a boolean' });
    }
    const user = await updateUserById(req.params.id, { role, isActive });
    return successResponse(res, 200, 'User updated', { user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await deleteUserById(req.params.id);
    return successResponse(res, 200, 'User deleted');
  } catch (error) {
    next(error);
  }
};