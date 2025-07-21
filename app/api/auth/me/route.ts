import { NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { connectDB } from "@/lib/db"
import User from "@/models/User"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.split("auth-token=")[1]?.split(";")[0]

    if (!token) {
      return NextResponse.json({ message: "No token" }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)

    await connectDB()
    const user = await User.findById(payload.userId).select("-password")

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}
