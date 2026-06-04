import prisma from '../../db/postgres.js';
import Vehicle from '../vehicles/vehicle.model.js';
import { recordAgreementOnChain } from "../blockchain/blockchain.service.js";

const calculateBookingPrice = (startDate, endDate, pricePerDay) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.ceil((end - start) / msPerDay);
  const totalPrice = totalDays * pricePerDay;
  return { totalDays, totalPrice };
};

const checkDateConflict = async (vehicleId, startDate, endDate, excludeBookingId = null) => {
  const where = {
    vehicleId,
    status: { notIn: ['cancelled', 'completed'] },
    AND: [
      { startDate: { lt: new Date(endDate) } },
      { endDate: { gt: new Date(startDate) } },
    ],
  };

  if (excludeBookingId) {
    where.id = { not: excludeBookingId };
  }

  const conflict = await prisma.booking.findFirst({ where });
  return conflict !== null;
};

export const createBooking = async ({ vehicleId, startDate, endDate, notes }, userId) => {
  const vehicle = await Vehicle.findById(vehicleId).lean();
  if (!vehicle) {
    const error = new Error('Vehicle not found');
    error.statusCode = 404;
    throw error;
  }

  if (!vehicle.isAvailable) {
    const error = new Error('This vehicle is not available for booking');
    error.statusCode = 409;
    throw error;
  }

  const hasConflict = await checkDateConflict(vehicleId, startDate, endDate);
  if (hasConflict) {
    const error = new Error('This vehicle is already booked for the selected dates');
    error.statusCode = 409;
    throw error;
  }

  const { totalDays, totalPrice } = calculateBookingPrice(startDate, endDate, vehicle.pricePerDay);

  const booking = await prisma.booking.create({
    data: {
      userId,
      vehicleId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalDays,
      pricePerDay: vehicle.pricePerDay,
      totalPrice,
      currency: vehicle.currency || 'EUR',
      notes: notes || null,
    },
    include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
  });

  return booking;
};

export const getMyBookings = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [bookings, total] = await prisma.$transaction([
    prisma.booking.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
    }),
    prisma.booking.count({ where: { userId } }),
  ]);

  const vehicleIds = [...new Set(bookings.map(b => b.vehicleId))];
  const vehicles = await Vehicle.find({ _id: { $in: vehicleIds } })
    .select('make model year images category')
    .lean();

  const vehicleMap = {};
  for (const v of vehicles) {
    vehicleMap[v._id.toString()] = v;
  }

  const enriched = bookings.map(b => ({
    ...b,
    vehicle: vehicleMap[b.vehicleId] || null,
  }));

  return {
    bookings: enriched,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

export const getAllBookings = async (page = 1, limit = 10, filters = {}) => {
  const skip = (page - 1) * limit;
  const where = {};

  if (filters.status) where.status = filters.status;
  if (filters.userId) where.userId = parseInt(filters.userId);

  const [bookings, total] = await prisma.$transaction([
    prisma.booking.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
    }),
    prisma.booking.count({ where }),
  ]);

  const vehicleIds = [...new Set(bookings.map(b => b.vehicleId))];
  const vehicles = await Vehicle.find({ _id: { $in: vehicleIds } })
    .select('make model year images category')
    .lean();

  const vehicleMap = {};
  for (const v of vehicles) {
    vehicleMap[v._id.toString()] = v;
  }

  const enriched = bookings.map(b => ({
    ...b,
    vehicle: vehicleMap[b.vehicleId] || null,
  }));

  return {
    bookings: enriched,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

export const getBookingById = async (bookingId, userId, userRole) => {
  const booking = await prisma.booking.findUnique({
    where: { id: parseInt(bookingId) },
    include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
  });

  if (!booking) {
    const error = new Error('Booking not found');
    error.statusCode = 404;
    throw error;
  }

  if (userRole === 'customer' && booking.userId !== userId) {
    const error = new Error('Access denied. This booking does not belong to you.');
    error.statusCode = 403;
    throw error;
  }

  const vehicle = await Vehicle.findById(booking.vehicleId)
    .select('make model year images category pricePerDay')
    .lean();

  return { ...booking, vehicle: vehicle || null };
};

export const updateBookingStatus = async (bookingId, { status, cancellationReason }, userId, userRole) => {
  const booking = await prisma.booking.findUnique({
    where: { id: parseInt(bookingId) },
  });

  if (!booking) {
    const error = new Error('Booking not found');
    error.statusCode = 404;
    throw error;
  }

  if (userRole === 'customer') {
    if (booking.userId !== userId) {
      const error = new Error('Access denied. This booking does not belong to you.');
      error.statusCode = 403;
      throw error;
    }
    if (status !== 'cancelled') {
      const error = new Error('Customers can only cancel bookings.');
      error.statusCode = 403;
      throw error;
    }
    if (!['pending', 'confirmed'].includes(booking.status)) {
      const error = new Error('This booking cannot be cancelled at its current status.');
      error.statusCode = 409;
      throw error;
    }
  }

  const data = { status };
  if (status === 'cancelled') {
    data.cancelledAt = new Date();
    data.cancellationReason = cancellationReason || null;
  }

  const updated = await prisma.booking.update({
    where: { id: parseInt(bookingId) },
    data,
    include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
  });

  // --- BLOCKCHAIN INTEGRATION: record agreement on-chain when confirmed ---
  if (status === 'confirmed') {
    try {
      // For the hackathon demo, we use a hardcoded test wallet.
      // In production, you would retrieve the customer's actual wallet address
      // from the user record or the booking metadata.
      const customerWallet = "0xE63B9427116EDCB23d36DCF643DFB91b79125e5a";
      await recordAgreementOnChain({
        vehicleId: booking.vehicleId,
        customerWallet: customerWallet,
        startDate: booking.startDate.toISOString().slice(0, 10),
        endDate: booking.endDate.toISOString().slice(0, 10),
        totalPrice: booking.totalPrice,
        currency: booking.currency,
      });
      console.log('✅ On-chain agreement recorded');
    } catch (error) {
      console.error('❌ Failed to record on-chain:', error.message);
      // The booking status update still succeeds; blockchain recording failure
      // does not break the normal booking flow.
    }
  }
  // --- END BLOCKCHAIN INTEGRATION ---

  return updated;
};