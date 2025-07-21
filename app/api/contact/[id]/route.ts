import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Contact from "@/models/Contact"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await request.json()
    const message = await Contact.findByIdAndUpdate(params.id, data, { new: true })

    if (!message) {
      return NextResponse.json({ error: "Contact message not found" }, { status: 404 })
    }

    return NextResponse.json(message)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update contact message" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const message = await Contact.findByIdAndDelete(params.id)

    if (!message) {
      return NextResponse.json({ error: "Contact message not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Contact message deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete contact message" }, { status: 500 })
  }
}
