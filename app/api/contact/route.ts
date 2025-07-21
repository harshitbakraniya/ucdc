import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Contact from "@/models/Contact"

export async function GET() {
  try {
    await connectDB()
    const messages = await Contact.find().sort({ createdAt: -1 })
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contact messages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()
    const message = new Contact(data)
    await message.save()
    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create contact message" }, { status: 500 })
  }
}
