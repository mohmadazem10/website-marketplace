import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { minimumPasswordLength } from '../config/env.js'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: minimumPasswordLength, select: false },
    avatarUrl: { type: String, default: '' },
    cart: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { timestamps: true },
)

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) {
    return
  }

  this.password = await bcrypt.hash(this.password, 12)
})

export const User = mongoose.model('User', userSchema)