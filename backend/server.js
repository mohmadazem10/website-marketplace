import mongoose from 'mongoose'
import { app } from './app.js'
import { port, mongoUri, jwtSecret } from './config/env.js'

if (!mongoUri) {
  throw new Error('MONGODB_URI is required')
}

if (!jwtSecret) {
  throw new Error('JWT_SECRET is required')
}

async function startServer() {
  await mongoose.connect(mongoUri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 30000,
  })

  app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server:', error.message)
  process.exit(1)
})

async function shutDown(signal) {
  console.log(`${signal} received, closing MongoDB connection`)
  await mongoose.connection.close()
  process.exit(0)
}

process.on('SIGINT', () => shutDown('SIGINT'))
process.on('SIGTERM', () => shutDown('SIGTERM'))