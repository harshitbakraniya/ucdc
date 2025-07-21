import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import StudentCorner from "@/models/StudentCorner"

export async function GET() {
  try {
    await connectDB()
    const items = await StudentCorner.find().sort({ createdAt: -1 })
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch student corner items" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()
    const item = new StudentCorner(data)
    await item.save()
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create student corner item" }, { status: 500 })
  }
}
