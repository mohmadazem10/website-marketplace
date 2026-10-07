import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { ContactMessage } from '../models/ContactMessage.model.js'
import { Order } from '../models/Order.model.js'

const router = Router()

router.use(requireAuth, requireAdmin)

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
