import prisma from '../../db/postgres.js';
import Vehicle from '../vehicles/vehicle.model.js';

export const getOverviewStats = async () => {
  const [
    totalBookings,
    bookingsByStatus,
    revenueResult,
    totalUsers,
    totalVehicles,
    availableVehicles,
  ] = await Promise.all([
    prisma.booking.count(),

    prisma.booking.groupBy({
      by: ['status'],
      _count: { status: true },
    }),

    prisma.booking.aggregate({
      _sum: { totalPrice: true },
      where: { status: { notIn: ['cancelled'] } },
    }),

    prisma.user.count(),
    Vehicle.countDocuments(),
    Vehicle.countDocuments({ isAvailable: true }),
  ]);

  const statusBreakdown = {};
  for (const item of bookingsByStatus) {
    statusBreakdown[item.status] = item._count.status;
  }

  return {
    bookings: {
      total: totalBookings,
      byStatus: statusBreakdown,
    },
    revenue: {
      total: revenueResult._sum.totalPrice || 0,
      currency: 'EUR',
    },
    users: {
      total: totalUsers,
    },
    fleet: {
      total: totalVehicles,
      available: availableVehicles,
      unavailable: totalVehicles - availableVehicles,
    },
  };
};

export const getRevenueByDateRange = async (startDate, endDate) => {
  const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1);
  const end = endDate ? new Date(endDate) : new Date();

  const bookings = await prisma.booking.findMany({
    where: {
      status: { notIn: ['cancelled'] },
      createdAt: { gte: start, lte: end },
    },
    select: {
      id: true,
      totalPrice: true,
      currency: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  const revenueByMonth = {};
  for (const booking of bookings) {
    const month = booking.createdAt.toISOString().slice(0, 7);
    if (!revenueByMonth[month]) {
      revenueByMonth[month] = { month, revenue: 0, bookings: 0 };
    }
    revenueByMonth[month].revenue += booking.totalPrice;
    revenueByMonth[month].bookings += 1;
  }

  return {
    period: {
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
    },
    totalRevenue,
    currency: 'EUR',
    totalBookings: bookings.length,
    revenueByMonth: Object.values(revenueByMonth),
  };
};

export const getMostBookedVehicles = async (limit = 5) => {
  const topVehicles = await prisma.booking.groupBy({
    by: ['vehicleId'],
    _count: { vehicleId: true },
    _sum: { totalPrice: true },
    where: { status: { notIn: ['cancelled'] } },
    orderBy: { _count: { vehicleId: 'desc' } },
    take: limit,
  });

  const vehicleIds = topVehicles.map(v => v.vehicleId);
  const vehicles = await Vehicle.find({ _id: { $in: vehicleIds } })
    .select('make model year category pricePerDay images')
    .lean();

  const vehicleMap = {};
  for (const v of vehicles) {
    vehicleMap[v._id.toString()] = v;
  }

  return topVehicles.map(item => ({
    vehicle: vehicleMap[item.vehicleId] || null,
    totalBookings: item._count.vehicleId,
    totalRevenue: item._sum.totalPrice || 0,
    currency: 'EUR',
  }));
};

export const getFleetStats = async () => {
  const [byCategory, byFuelType, byTransmission] = await Promise.all([
    Vehicle.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 }, available: { $sum: { $cond: ['$isAvailable', 1, 0] } } } },
      { $sort: { count: -1 } },
    ]),
    Vehicle.aggregate([
      { $group: { _id: '$fuelType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Vehicle.aggregate([
      { $group: { _id: '$transmission', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
  ]);

  return {
    byCategory: byCategory.map(i => ({ category: i._id, total: i.count, available: i.available })),
    byFuelType: byFuelType.map(i => ({ fuelType: i._id, total: i.count })),
    byTransmission: byTransmission.map(i => ({ transmission: i._id, total: i.count })),
  };
};

export const getRecentBookings = async (limit = 10) => {
  const bookings = await prisma.booking.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
  });

  const vehicleIds = [...new Set(bookings.map(b => b.vehicleId))];
  const vehicles = await Vehicle.find({ _id: { $in: vehicleIds } })
    .select('make model year images')
    .lean();

  const vehicleMap = {};
  for (const v of vehicles) {
    vehicleMap[v._id.toString()] = v;
  }

  return bookings.map(b => ({
    ...b,
    vehicle: vehicleMap[b.vehicleId] || null,
  }));
};