import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Alumni from "@/models/Alumni"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await request.json()
    const alumni = await Alumni.findByIdAndUpdate(params.id, data, { new: true })

    if (!alumni) {
      return NextResponse.json({ error: "Alumni not found" }, { status: 404 })
    }

    return NextResponse.json(alumni)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update alumni" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const alumni = await Alumni.findByIdAndDelete(params.id)

    if (!alumni) {
      return NextResponse.json({ error: "Alumni not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Alumni deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete alumni" }, { status: 500 })
  }
}
