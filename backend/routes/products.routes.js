import { Router } from 'express'
import { Product } from '../models/Product.model.js'

const router = Router()

router.get('/products', async (req, res, next) => {
  try {
    const [products, deletedProducts] = await Promise.all([
      Product.find({ custom: true, deleted: false }).sort({ createdAt: -1 }).lean(),
      Product.find({ custom: false, deleted: true }).select('productId').lean(),
    ])

    return res.json({
      products: products.map(({ productId, title, description, price, category, image, features }) => ({
        id: productId,
        title,
        description,
        price,
        category,
        image,
        features,
        rating: 5,
        sales: 0,
        templates: [{
          id: `${productId}-standard`,
          name: 'Standard',
          previewStyle: 'ecommerce-classic',
          colors: ['#2563eb', '#3b82f6', '#dbeafe'],
          layout: 'Standard',
        }],
      })),
      deletedProductIds: deletedProducts.map(({ productId }) => productId),
    })
  } catch (error) {
    next(error)
  }
})

export default router
