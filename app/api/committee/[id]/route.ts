import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Committee from "@/models/Committee"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await request.json()
    const member = await Committee.findByIdAndUpdate(params.id, data, { new: true })

    if (!member) {
      return NextResponse.json({ error: "Committee member not found" }, { status: 404 })
    }

    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update committee member" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const member = await Committee.findByIdAndDelete(params.id)

    if (!member) {
      return NextResponse.json({ error: "Committee member not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Committee member deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete committee member" }, { status: 500 })
  }
}
