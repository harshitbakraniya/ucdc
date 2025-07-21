import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Achiever from "@/models/Achiever"

export async function GET() {
  try {
    await connectDB()
    const achievers = await Achiever.find().sort({ year: -1 })
    return NextResponse.json(achievers)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch achievers" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()
    const achiever = new Achiever(data)
    await achiever.save()
    return NextResponse.json(achiever, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create achiever" }, { status: 500 })
  }
}
