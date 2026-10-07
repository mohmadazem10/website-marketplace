import { Router } from 'express'
import { User } from '../models/User.model.js'
import { Order } from '../models/Order.model.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/orders', requireAuth, async (req, res, next) => {
  try {
    const { items } = req.body || {}
    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return res.status(400).json({ message: 'An order must contain between 1 and 50 items' })
    }

    const orderItems = []
    for (const item of items) {
      if (
        !item ||
        typeof item.id !== 'string' ||
        typeof item.title !== 'string' ||
        typeof item.price !== 'number' ||
        !Number.isFinite(item.price) ||
        item.price < 0 ||
        item.title.trim().length === 0
      ) {
        return res.status(400).json({ message: 'Order contains an invalid item' })
      }

      orderItems.push({
        productId: item.id,
        title: item.title,
        price: item.price,
        templateName: typeof item.selectedTemplate?.name === 'string' ? item.selectedTemplate.name : '',
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
    })

    return res.status(201).json({ order: { id: order._id, totalAmount: order.totalAmount, status: order.status } })
  } catch (error) {
    next(error)
  }
})

export default router
