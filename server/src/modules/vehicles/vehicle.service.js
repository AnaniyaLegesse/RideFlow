import Vehicle from './vehicle.model.js';
import cloudinary from '../../config/cloudinary.js';

const uploadImageToCloudinary = (buffer, originalname) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'car-rental/vehicles',
        resource_type: 'image',
        transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

export const createVehicle = async (data, files, userId) => {
  const images = [];

  if (files && files.length > 0) {
    for (const file of files) {
      const result = await uploadImageToCloudinary(file.buffer, file.originalname);
      images.push({ url: result.secure_url, publicId: result.public_id });
    }
  }

  const vehicle = await Vehicle.create({
    ...data,
    images,
    createdBy: userId,
  });

  return vehicle;
};

export const getVehicles = async (filters = {}, page = 1, limit = 10) => {
  const query = {};

  if (filters.isAvailable !== undefined) {
    query.isAvailable = filters.isAvailable === 'true';
  }
  if (filters.category) query.category = filters.category;
  if (filters.fuelType) query.fuelType = filters.fuelType;
  if (filters.transmission) query.transmission = filters.transmission;
  if (filters.minPrice || filters.maxPrice) {
    query.pricePerDay = {};
    if (filters.minPrice) query.pricePerDay.$gte = parseFloat(filters.minPrice);
    if (filters.maxPrice) query.pricePerDay.$lte = parseFloat(filters.maxPrice);
  }
  if (filters.search) {
    query.$text = { $search: filters.search };
  }

  const skip = (page - 1) * limit;
  const total = await Vehicle.countDocuments(query);
  const vehicles = await Vehicle.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    vehicles,
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

export const getVehicleById = async (id) => {
  const vehicle = await Vehicle.findById(id).lean();
  if (!vehicle) {
    const error = new Error('Vehicle not found');
    error.statusCode = 404;
    throw error;
  }
  return vehicle;
};

export const updateVehicle = async (id, data, files, userId) => {
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    const error = new Error('Vehicle not found');
    error.statusCode = 404;
    throw error;
  }

  if (files && files.length > 0) {
    const newImages = [];
    for (const file of files) {
      const result = await uploadImageToCloudinary(file.buffer, file.originalname);
      newImages.push({ url: result.secure_url, publicId: result.public_id });
    }
    data.images = [...vehicle.images, ...newImages];
  }

  const updated = await Vehicle.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).lean();

  return updated;
};

export const deleteVehicle = async (id) => {
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    const error = new Error('Vehicle not found');
    error.statusCode = 404;
    throw error;
  }

  if (vehicle.images && vehicle.images.length > 0) {
    for (const image of vehicle.images) {
      await cloudinary.uploader.destroy(image.publicId);
    }
  }

  await Vehicle.findByIdAndDelete(id);
};

export const deleteVehicleImage = async (vehicleId, publicId) => {
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    const error = new Error('Vehicle not found');
    error.statusCode = 404;
    throw error;
  }

  await cloudinary.uploader.destroy(publicId);

  vehicle.images = vehicle.images.filter(img => img.publicId !== publicId);
  await vehicle.save();

  return vehicle;
};