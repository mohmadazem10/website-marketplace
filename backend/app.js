import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { clientOrigin, port } from './config/env.js'
import { uploadsDirectory } from './config/upload.js'
import healthRoutes from './routes/health.routes.js'
import authRoutes from './routes/auth.routes.js'
import aiRoutes from './routes/ai.routes.js'
import contactRoutes from './routes/contact.routes.js'
import { errorHandler } from './middleware/errorHandler.js'

export const app = express()

app.set('trust proxy', 1)
const frontendDirectory = path.join(process.cwd(), 'dist')
const publicDirectory = path.join(process.cwd(), 'public')
const allowedOrigins = [
	...clientOrigin.split(',').map((origin) => origin.trim()).filter(Boolean),
	`http://localhost:${port}`,
	`http://127.0.0.1:${port}`,
]

app.use(cors({
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			return callback(null, true)
		}

		return callback(new Error('Origin is not allowed'))
	},
}))
app.use(express.json())
app.use('/uploads', express.static(uploadsDirectory))
app.get('/favicon.jpg', (req, res) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate')
	return res.sendFile(path.join(publicDirectory, 'logo.jpg'))
})
app.use(express.static(publicDirectory))

app.use('/api', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api', aiRoutes)
app.use('/api', contactRoutes)

app.use(express.static(frontendDirectory))
app.use((req, res, next) => {
	if (req.method !== 'GET' || req.path.startsWith('/api')) {
		return next()
	}

	return res.sendFile(path.join(frontendDirectory, 'index.html'))
})

app.use(errorHandler)