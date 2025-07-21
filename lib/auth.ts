import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"

// In a real app, you would use environment variables for these
const JWT_SECRET = new TextEncoder().encode("your-secret-key-change-this-in-production")
const COOKIE_NAME = "ucdc_admin_session"

export type Session = {
  id: string
  email: string
  name: string
  role: string
  exp: number
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get(COOKIE_NAME)

  if (!sessionCookie) {
    return null
  }

  try {
    const { payload } = await jwtVerify(sessionCookie.value, JWT_SECRET)
    return payload as Session
  } catch (error) {
    return null
  }
}

export async function createSession(user: { id: string; email: string; name: string; role: string }): Promise<string> {
  const expiresIn = 60 * 60 * 24 * 7 // 1 week

  const session = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  }

  const token = await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(session.exp)
    .sign(JWT_SECRET)

  return token
}

export async function setSessionCookie(token: string) {
  cookies().set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}

export async function removeSessionCookie() {
  cookies().delete(COOKIE_NAME)
}
