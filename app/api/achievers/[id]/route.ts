import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Achiever from "@/models/Achiever"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await request.json()
    const achiever = await Achiever.findByIdAndUpdate(params.id, data, { new: true })

    if (!achiever) {
      return NextResponse.json({ error: "Achiever not found" }, { status: 404 })
    }

    return NextResponse.json(achiever)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update achiever" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const achiever = await Achiever.findByIdAndDelete(params.id)

    if (!achiever) {
      return NextResponse.json({ error: "Achiever not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Achiever deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete achiever" }, { status: 500 })
  }
}
