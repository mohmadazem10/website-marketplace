import multer from 'multer'

export function errorHandler(error, req, res, next) {
  console.error(error)

  if (error instanceof multer.MulterError || error.message?.includes('Only JPEG')) {
    return res.status(400).json({ message: error.message || 'Invalid image upload' })
  }

  if (error?.code === 11000) {
    return res.status(409).json({ message: 'Email is already registered' })
  }

  res.status(500).json({ message: 'Internal server error' })
}