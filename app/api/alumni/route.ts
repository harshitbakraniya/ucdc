import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Alumni from "@/models/Alumni"

export async function GET() {
  try {
    await connectDB()
    const alumni = await Alumni.find().sort({ createdAt: -1 })
    return NextResponse.json(alumni)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch alumni" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()
    const alumni = new Alumni(data)
    await alumni.save()
    return NextResponse.json(alumni, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create alumni" }, { status: 500 })
  }
}
