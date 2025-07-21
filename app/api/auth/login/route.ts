import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"
import { connectDB } from "@/lib/db"
import User from "@/models/User"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    await connectDB()
    const user = await User.findOne({ email, isActive: true })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    const token = await new SignJWT({ userId: user._id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(JWT_SECRET)

    const response = NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 24 hours
    })

    return response
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
