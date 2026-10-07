import { User } from '../models/User.model.js'
import { adminUsername, adminPassword } from '../config/env.js'

export async function ensureAdminAccount() {
  if (!adminUsername && !adminPassword) {
    console.warn('Admin account is not configured; set ADMIN_USERNAME and ADMIN_PASSWORD to create it')
    return
  }

  if (!adminUsername || !adminPassword) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must both be configured')
  }

  const username = adminUsername.trim().toLowerCase()
  if (!/^[a-z0-9._-]{3,40}$/.test(username) || adminPassword.length < 8) {
    throw new Error('Admin username must be 3-40 characters and password must be at least 8 characters')
  }

  const existingAdmin = await User.findOne({ username })
  if (existingAdmin) {
    if (existingAdmin.role !== 'admin') {
      throw new Error(`Configured admin username "${username}" already belongs to a non-admin account`)
    }

    return
  }

  await User.create({
    name: username,
    username,
    email: `${username}@admin.local`,
    password: adminPassword,
    role: 'admin',
  })
  console.log(`Administrator account "${username}" created`)
}
