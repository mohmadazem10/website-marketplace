import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/env.js'

export function createToken(user) {
  return jwt.sign({ sub: user._id.toString(), email: user.email }, jwtSecret, { expiresIn: '7d' })
}

export function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, avatarUrl: user.avatarUrl, cart: user.cart || [] }
}

export function requireAuth(req, res, next) {
  const authorization = req.headers.authorization || ''
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' })
  }

  try {
    req.auth = jwt.verify(token, jwtSecret)
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}