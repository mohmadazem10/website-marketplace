import express from 'express'
import cors from 'cors'
import { clientOrigin } from './config/env.js'
import { uploadsDirectory } from './config/upload.js'
import healthRoutes from './routes/health.routes.js'
import authRoutes from './routes/auth.routes.js'
import aiRoutes from './routes/ai.routes.js'
import contactRoutes from './routes/contact.routes.js'
import { errorHandler } from './middleware/errorHandler.js'

export const app = express()

app.use(cors({ origin: clientOrigin }))
app.use(express.json())
app.use('/uploads', express.static(uploadsDirectory))

app.use('/api', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api', aiRoutes)
app.use('/api', contactRoutes)

app.use(errorHandler)