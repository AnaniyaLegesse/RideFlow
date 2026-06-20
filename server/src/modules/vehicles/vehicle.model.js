import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
}, { _id: false });

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, 'Vehicle make is required'],
    trim: true,
  },
  model: {
    type: String,
    required: [true, 'Vehicle model is required'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'Vehicle year is required'],
    min: [1900, 'Year must be 1900 or later'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future'],
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Price per day is required'],
    min: [0, 'Price cannot be negative'],
  },
  currency: {
    type: String,
    default: 'EUR',
    uppercase: true,
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['economy', 'compact', 'suv', 'luxury', 'van', 'electric', 'convertible'],
  },
  fuelType: {
    type: String,
    required: [true, 'Fuel type is required'],
    enum: ['petrol', 'diesel', 'electric', 'hybrid'],
  },
  transmission: {
    type: String,
    required: [true, 'Transmission is required'],
    enum: ['manual', 'automatic'],
  },
  plateNumber: {
  type: String,
  trim: true,
  maxlength: 20,

  },
  batteryOrFuel: {
  type: String,
  trim: true,
  maxlength: 10,

  },
  currentLocation: {
  type: String,
  trim: true,
  maxlength: 100,
  
  },
  seats: {
    type: Number,
    required: [true, 'Number of seats is required'],
    min: 1,
    max: 20,
  },
  mileage: {
    type: Number,
    default: 0,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  features: [{
    type: String,
    trim: true,
  }],
  images: [imageSchema],
  isAvailable: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

vehicleSchema.index({ make: 'text', model: 'text', description: 'text' });
vehicleSchema.index({ pricePerDay: 1 });
vehicleSchema.index({ category: 1 });
vehicleSchema.index({ isAvailable: 1 });
vehicleSchema.index({ fuelType: 1 });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;