import { Router } from 'express'
import mongoose from 'mongoose'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { ContactMessage } from '../models/ContactMessage.model.js'
import { Order } from '../models/Order.model.js'
import { Product } from '../models/Product.model.js'

const router = Router()

router.use(requireAuth, requireAdmin)

router.get('/products', async (req, res, next) => {
  try {
    const [products, deletedProducts] = await Promise.all([
      Product.find({ custom: true, deleted: false }).sort({ createdAt: -1 }).lean(),
      Product.find({ custom: false, deleted: true }).select('productId').lean(),
    ])
    return res.json({
      products: products.map(({ productId, title, description, price, category, image, features }) => ({
        id: productId, title, description, price, category, image, features,
      })),
      deletedProductIds: deletedProducts.map(({ productId }) => productId),
    })
  } catch (error) {
    next(error)
  }
})

router.post('/products', async (req, res, next) => {
  try {
    const { title, description, price, category, image, features } = req.body || {}
    if (
      typeof title !== 'string' || !title.trim() ||
      typeof description !== 'string' || !description.trim() ||
      typeof category !== 'string' || !category.trim() ||
      typeof price !== 'number' || !Number.isFinite(price) || price < 0 || price > 1_000_000_000 ||
      (image !== undefined && (typeof image !== 'string' || image.length > 16)) ||
      (features !== undefined && (
        !Array.isArray(features) ||
        features.length > 12 ||
        features.some((feature) => typeof feature !== 'string' || feature.length > 100)
      ))
    ) {
      return res.status(400).json({ message: 'Enter a title, description, category, valid price, and a list of features' })
    }

    if (title.trim().length > 160 || description.trim().length > 2000 || category.trim().length > 80) {
      return res.status(400).json({ message: 'Product details exceed the allowed length' })
    }

    const productId = new mongoose.Types.ObjectId().toString()
    const product = await Product.create({
      productId,
      custom: true,
      title: title.trim(),
      description: description.trim(),
      price,
      category: category.trim(),
      image: image?.trim() || '🌐',
      features: (features || []).map((feature) => feature.trim()).filter(Boolean).slice(0, 12),
    })
    return res.status(201).json({
      product: {
        id: product.productId,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        features: product.features,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/products/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params
    const product = await Product.findOne({ productId, custom: true, deleted: false })
    if (product) {
      product.deleted = true
      await product.save()
      return res.json({ id: productId, deleted: true })
    }

    if (!/^[1-8]$/.test(productId)) {
      return res.status(404).json({ message: 'Product not found' })
    }

    await Product.findOneAndUpdate(
      { productId, custom: false },
      {
        $set: { deleted: true },
        $setOnInsert: {
          custom: false,
          title: `Catalog product ${productId}`,
          description: 'Hidden catalog product',
          price: 0,
          category: 'Hidden',
        },
      },
      { upsert: true, runValidators: true, setDefaultsOnInsert: true },
    )
    return res.json({ id: productId, deleted: true })
  } catch (error) {
    next(error)
  }
})

router.get('/messages', async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean()
    return res.json({ messages })
  } catch (error) {
    next(error)
  }
})

router.get('/orders', async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean()
    return res.json({ orders })
  } catch (error) {
    next(error)
  }
})

export default router
