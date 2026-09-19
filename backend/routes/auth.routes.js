import { Router } from 'express'
import bcrypt from 'bcryptjs'
import fs from 'node:fs'
import path from 'node:path'
import { User } from '../models/User.model.js'
import { requireAuth, createToken, publicUser } from '../middleware/auth.js'
import { authLimiter } from '../middleware/rateLimiters.js'
import { imageUpload } from '../config/upload.js'
import { minimumPasswordLength } from '../config/env.js'

const router = Router()

router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name?.trim() || !email?.trim() || typeof password !== 'string') {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    if (password.length < minimumPasswordLength) {
      return res.status(400).json({ message: `Password must be at least ${minimumPasswordLength} characters` })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existingUser = await User.findOne({ email: normalizedEmail })

    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' })
    }

    const user = await User.create({ name: name.trim(), email: normalizedEmail, password })

    return res.status(201).json({ token: createToken(user), user: publicUser(user) })
  } catch (error) {
    next(error)
  }
})

router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email?.trim().toLowerCase() }).select('+password')

    if (!user || !(await bcrypt.compare(password || '', user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    return res.json({ token: createToken(user), user: publicUser(user) })
  } catch (error) {
    next(error)
  }
})

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.auth.sub)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.json({ user: publicUser(user) })
  } catch (error) {
    next(error)
  }
})

router.put('/cart', requireAuth, async (req, res, next) => {
  try {
    const { cart } = req.body || {}
    if (!Array.isArray(cart) || cart.length > 50) {
      return res.status(400).json({ message: 'Invalid cart' })
    }

    const serializedCart = JSON.stringify(cart)
    if (serializedCart.length > 200000) {
      return res.status(400).json({ message: 'Cart is too large' })
    }

    const user = await User.findById(req.auth.sub)
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.cart = cart
    await user.save()
    return res.json({ user: publicUser(user) })
  } catch (error) {
    next(error)
  }
})

router.patch('/profile', requireAuth, async (req, res, next) => {
  try {
    const { name, email } = req.body
    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ message: 'Name and email are required' })
    }

    const user = await User.findById(req.auth.sub)
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.name = name.trim()
    user.email = email.trim().toLowerCase()
    await user.save()
    return res.json({ user: publicUser(user) })
  } catch (error) {
    next(error)
  }
})

router.patch('/password', requireAuth, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
      return res.status(400).json({ message: 'Current and new passwords are required' })
    }

    if (newPassword.length < minimumPasswordLength) {
      return res.status(400).json({ message: `Password must be at least ${minimumPasswordLength} characters` })
    }

    const user = await User.findById(req.auth.sub).select('+password')
    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(401).json({ message: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()
    return res.json({ message: 'Password updated successfully' })
  } catch (error) {
    next(error)
  }
})

router.post('/avatar', requireAuth, imageUpload.single('avatar'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'An image is required' })
    }

    const user = await User.findById(req.auth.sub)
    if (!user) {
      fs.rmSync(req.file.path, { force: true })
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.avatarUrl) {
      const previousFile = path.join(process.cwd(), 'backend', user.avatarUrl.replace('/uploads/', 'uploads/'))
      fs.rmSync(previousFile, { force: true })
    }

    user.avatarUrl = `/uploads/${req.file.filename}`
    await user.save()
    return res.json({ user: publicUser(user) })
  } catch (error) {
    if (req.file?.path) fs.rmSync(req.file.path, { force: true })
    next(error)
  }
})

export default router