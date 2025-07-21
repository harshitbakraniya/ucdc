import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Committee from "@/models/Committee"

export async function GET() {
  try {
    await connectDB()
    const members = await Committee.find().sort({ order: 1 })
    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch committee members" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()
    const member = new Committee(data)
    await member.save()
    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create committee member" }, { status: 500 })
  }
}
