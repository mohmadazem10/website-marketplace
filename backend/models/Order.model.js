import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, trim: true, maxlength: 100 },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    description: { type: String, trim: true, maxlength: 2000, default: '' },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, trim: true, maxlength: 80, default: '' },
    image: { type: String, trim: true, maxlength: 16, default: '🌐' },
    features: { type: [String], default: [] },
    selectedTemplate: {
      id: { type: String, trim: true, maxlength: 100, default: '' },
      name: { type: String, trim: true, maxlength: 100, default: '' },
      previewStyle: { type: String, trim: true, maxlength: 100, default: 'ecommerce-classic' },
      colors: { type: [String], default: [] },
      layout: { type: String, trim: true, maxlength: 120, default: '' },
    },
  },
  { _id: false },
)

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String, required: true, trim: true, maxlength: 100 },
    customerEmail: { type: String, required: true, lowercase: true, trim: true },
    items: { type: [orderItemSchema], required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ['creditCard', 'paypal', 'bankTransfer', 'cashOnDelivery'],
      required: true,
    },
    status: { type: String, enum: ['new', 'processing', 'completed', 'cancelled'], default: 'new' },
  },
  { timestamps: true },
)

export const Order = mongoose.model('Order', orderSchema)
