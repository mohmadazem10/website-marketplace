import dotenv from 'dotenv'

dotenv.config({ path: new URL('../.env', import.meta.url) })

export const port = Number(process.env.PORT || 5000)
export const mongoUri = process.env.MONGODB_URI
export const jwtSecret = process.env.JWT_SECRET
export const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
export const brightDataMcpUrl = process.env.BRIGHTDATA_MCP_URL
export const aiApiKey = process.env.AI_API_KEY && !process.env.AI_API_KEY.startsWith('replace-with-') && process.env.AI_API_KEY !== 'your_api_key_here'
	? process.env.AI_API_KEY
	: ''
export const aiApiUrl = process.env.AI_API_URL || 'https://router.requesty.ai/v1/chat/completions'
export const aiModel = process.env.AI_MODEL || 'google/gemma-4-31b-it'
export const minimumPasswordLength = 12