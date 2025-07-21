import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import StudentCorner from "@/models/StudentCorner"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await request.json()
    const item = await StudentCorner.findByIdAndUpdate(params.id, data, { new: true })

    if (!item) {
      return NextResponse.json({ error: "Student corner item not found" }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update student corner item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const item = await StudentCorner.findByIdAndDelete(params.id)

    if (!item) {
      return NextResponse.json({ error: "Student corner item not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Student corner item deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete student corner item" }, { status: 500 })
  }
}
