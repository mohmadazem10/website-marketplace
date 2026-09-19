import { Router } from 'express'
import mongoose from 'mongoose'
import { aiApiKey, brightDataMcpUrl } from '../config/env.js'

const router = Router()

router.get('/health', (req, res) => {
  res.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    ai: aiApiKey ? 'configured' : 'not-configured',
    brightData: brightDataMcpUrl && !brightDataMcpUrl.includes('YOUR_API_KEY') ? 'configured' : 'not-configured',
  })
})

export default router