import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, trim: true, maxlength: 100 },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    price: { type: Number, required: true, min: 0 },
    templateName: { type: String, trim: true, maxlength: 100, default: '' },
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
    status: { type: String, enum: ['new', 'processing', 'completed', 'cancelled'], default: 'new' },
  },
  { timestamps: true },
)

export const Order = mongoose.model('Order', orderSchema)
