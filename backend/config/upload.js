import fs from 'node:fs'
import path from 'node:path'
import multer from 'multer'

export const uploadsDirectory = path.join(process.cwd(), 'backend', 'uploads')

fs.mkdirSync(uploadsDirectory, { recursive: true })

export const imageUpload = multer({
  storage: multer.diskStorage({
    destination: uploadsDirectory,
    filename: (req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase()
      callback(null, `${req.auth.sub}-${Date.now()}${extension}`)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.mimetype)) {
      return callback(new Error('Only JPEG, PNG, WEBP, and GIF images are allowed'))
    }
    callback(null, true)
  },
})