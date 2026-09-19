import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { aiLimiter } from '../middleware/rateLimiters.js'
import { handleAiChat } from '../services/aiService.js'

const router = Router()

router.post('/ai/chat', requireAuth, aiLimiter, handleAiChat)
router.post('/chat', requireAuth, aiLimiter, handleAiChat)

export default router