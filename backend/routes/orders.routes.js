import { Router } from 'express'
import { User } from '../models/User.model.js'
import { Order } from '../models/Order.model.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/orders', requireAuth, async (req, res, next) => {
  try {
    const { items, paymentMethod } = req.body || {}
    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return res.status(400).json({ message: 'An order must contain between 1 and 50 items' })
    }

    if (!['creditCard', 'paypal', 'bankTransfer', 'cashOnDelivery'].includes(paymentMethod)) {
      return res.status(400).json({ message: 'Select a valid payment method to complete the purchase' })
    }

    const orderItems = []
    for (const item of items) {
      const hasValidProductId = typeof item?.id === 'string'
        ? item.id.trim().length > 0
        : typeof item?.id === 'number' && Number.isSafeInteger(item.id)

      if (
        !item ||
        !hasValidProductId ||
        typeof item.title !== 'string' ||
        typeof item.price !== 'number' ||
        !Number.isFinite(item.price) ||
        item.price < 0 ||
        item.title.trim().length === 0
      ) {
        return res.status(400).json({ message: 'Order contains an invalid item' })
      }

      const selectedTemplate = item.selectedTemplate ||
        (Array.isArray(item.templates) ? item.templates[0] : null)

      orderItems.push({
        productId: String(item.id),
        title: item.title,
        description: typeof item.description === 'string' ? item.description.slice(0, 2000) : '',
        price: item.price,
        category: typeof item.category === 'string' ? item.category.slice(0, 80) : '',
        image: typeof item.image === 'string' ? item.image.slice(0, 16) : '🌐',
        features: Array.isArray(item.features)
          ? item.features.filter((feature) => typeof feature === 'string').slice(0, 12).map((feature) => feature.slice(0, 100))
          : [],
        selectedTemplate: {
          id: typeof selectedTemplate?.id === 'string' ? selectedTemplate.id.slice(0, 100) : '',
          name: typeof selectedTemplate?.name === 'string' ? selectedTemplate.name.slice(0, 100) : '',
          previewStyle: typeof selectedTemplate?.previewStyle === 'string'
            ? selectedTemplate.previewStyle.slice(0, 100)
            : 'ecommerce-classic',
          colors: Array.isArray(selectedTemplate?.colors)
            ? selectedTemplate.colors
              .filter((color) => typeof color === 'string' && /^#[0-9a-f]{6}$/i.test(color))
              .slice(0, 5)
            : [],
          layout: typeof selectedTemplate?.layout === 'string' ? selectedTemplate.layout.slice(0, 120) : '',
        },
      })
    }

    const user = await User.findById(req.auth.sub)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const order = await Order.create({
      userId: user._id,
      customerName: user.name,
      customerEmail: user.email,
      items: orderItems,
      totalAmount: orderItems.reduce((total, item) => total + item.price, 0),
      paymentMethod,
    })

    return res.status(201).json({ order: { id: order._id, totalAmount: order.totalAmount, status: order.status } })
  } catch (error) {
    next(error)
  }
})

export default router
