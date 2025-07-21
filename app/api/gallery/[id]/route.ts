import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Gallery from "@/models/Gallery"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await request.json()
    const image = await Gallery.findByIdAndUpdate(params.id, data, { new: true })

    if (!image) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 })
    }

    return NextResponse.json(image)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update gallery image" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const image = await Gallery.findByIdAndDelete(params.id)

    if (!image) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Gallery image deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 })
  }
}
