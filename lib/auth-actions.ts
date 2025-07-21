"use server"

import { createSession, setSessionCookie, removeSessionCookie } from "./auth"

// In a real app, you would store users in a database
const ADMIN_USERS = [
  {
    id: "1",
    email: "admin@ucdc.co.in",
    password: "admin123", // In a real app, this would be hashed
    name: "Admin User",
    role: "admin",
  },
]

export async function login(email: string, password: string) {
  // Simulate a delay to prevent brute force attacks
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = ADMIN_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

  if (!user) {
    return { success: false, error: "Invalid email or password" }
  }

  const { password: _, ...userWithoutPassword } = user
  const token = await createSession(userWithoutPassword)
  await setSessionCookie(token)

  return { success: true }
}

export async function logout() {
  await removeSessionCookie()
  return { success: true }
}
