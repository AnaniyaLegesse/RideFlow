import Inquiry from './inquiry.model.js';
import Vehicle from '../vehicles/vehicle.model.js';

export const createInquiry = async ({ vehicleId, subject, message }, user) => {
  const vehicle = await Vehicle.findById(vehicleId).lean();
  if (!vehicle) {
    const error = new Error('Vehicle not found');
    error.statusCode = 404;
    throw error;
  }

  const inquiry = await Inquiry.create({
    vehicleId,
    vehicleSnapshot: {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      pricePerDay: vehicle.pricePerDay,
      currency: vehicle.currency || 'EUR',
    },
    customerId: user.id,
    customerName: `${user.firstName} ${user.lastName}`,
    customerEmail: user.email,
    subject,
    message,
  });

  return inquiry;
};

export const getMyInquiries = async (customerId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [inquiries, total] = await Promise.all([
    Inquiry.find({ customerId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Inquiry.countDocuments({ customerId }),
  ]);

  return {
    inquiries,
    pagination: {
      total, page, limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

export const getAllInquiries = async (page = 1, limit = 10, filters = {}) => {
  const skip = (page - 1) * limit;
  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.assignedAgentId) query.assignedAgentId = parseInt(filters.assignedAgentId);
  if (filters.vehicleId) query.vehicleId = filters.vehicleId;

  const [inquiries, total] = await Promise.all([
    Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Inquiry.countDocuments(query),
  ]);

  return {
    inquiries,
    pagination: {
      total, page, limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

export const getInquiryById = async (inquiryId, userId, userRole) => {
  const inquiry = await Inquiry.findById(inquiryId).lean();
  if (!inquiry) {
    const error = new Error('Inquiry not found');
    error.statusCode = 404;
    throw error;
  }
  if (userRole === 'customer' && inquiry.customerId !== userId) {
    const error = new Error('Access denied. This inquiry does not belong to you.');
    error.statusCode = 403;
    throw error;
  }
  return inquiry;
};

export const addReply = async (inquiryId, { message }, user) => {
  const inquiry = await Inquiry.findById(inquiryId);
  if (!inquiry) {
    const error = new Error('Inquiry not found');
    error.statusCode = 404;
    throw error;
  }
  if (user.role === 'customer' && inquiry.customerId !== user.id) {
    const error = new Error('Access denied. This inquiry does not belong to you.');
    error.statusCode = 403;
    throw error;
  }
  if (inquiry.status === 'closed') {
    const error = new Error('This inquiry is closed and cannot receive new replies.');
    error.statusCode = 409;
    throw error;
  }

  inquiry.replies.push({
    message,
    authorId: user.id,
    authorRole: user.role,
    authorName: `${user.firstName} ${user.lastName}`,
  });

  if (inquiry.status === 'open' && user.role !== 'customer') {
    inquiry.status = 'in_progress';
  }

  await inquiry.save();
  return inquiry;
};

export const updateInquiryStatus = async (inquiryId, { status, assignedAgentId }) => {
  const inquiry = await Inquiry.findById(inquiryId);
  if (!inquiry) {
    const error = new Error('Inquiry not found');
    error.statusCode = 404;
    throw error;
  }
  inquiry.status = status;
  if (assignedAgentId !== undefined) inquiry.assignedAgentId = assignedAgentId;
  await inquiry.save();
  return inquiry;
};