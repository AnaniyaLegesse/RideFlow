import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: [1000, 'Reply cannot exceed 1000 characters'],
  },
  authorId: { type: Number, required: true },
  authorRole: {
    type: String,
    enum: ['customer', 'sales_agent', 'admin'],
    required: true,
  },
  authorName: { type: String, required: true, trim: true },
}, { timestamps: true });

const inquirySchema = new mongoose.Schema({
  vehicleId: { type: String, required: [true, 'Vehicle ID is required'], trim: true },
  vehicleSnapshot: {
    make: String,
    model: String,
    year: Number,
    pricePerDay: Number,
    currency: { type: String, default: 'EUR' },
  },
  customerId: { type: Number, required: [true, 'Customer ID is required'] },
  customerName: { type: String, required: true, trim: true },
  customerEmail: { type: String, required: true, trim: true },
  assignedAgentId: { type: Number, default: null },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [150, 'Subject cannot exceed 150 characters'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'closed'],
    default: 'open',
  },
  replies: [replySchema],
}, { timestamps: true });

inquirySchema.index({ customerId: 1 });
inquirySchema.index({ vehicleId: 1 });
inquirySchema.index({ status: 1 });
inquirySchema.index({ assignedAgentId: 1 });

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;