import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true, trim: true },
    custom: { type: Boolean, required: true, default: true },
    deleted: { type: Boolean, default: false },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true, maxlength: 80 },
    image: { type: String, trim: true, maxlength: 16, default: '🌐' },
    features: { type: [String], default: [] },
  },
  { timestamps: true },
)

export const Product = mongoose.model('Product', productSchema)
