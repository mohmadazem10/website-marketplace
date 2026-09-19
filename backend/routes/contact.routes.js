import { Router } from 'express'
import { ContactMessage } from '../models/ContactMessage.model.js'
import { contactLimiter } from '../middleware/rateLimiters.js'

const router = Router()

router.post('/contact/messages', contactLimiter, async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({ message: 'Name, email, subject, and message are required' })
    }

    const contactMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      subject: subject.trim(),
      message: message.trim(),
    })

    return res.status(201).json({ id: contactMessage._id, message: 'Message saved successfully' })
  } catch (error) {
    next(error)
  }
})

export default router