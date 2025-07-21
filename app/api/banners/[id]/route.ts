import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Banner from "@/models/Banner"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await request.json()
    const banner = await Banner.findByIdAndUpdate(params.id, data, { new: true })

    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 })
    }

    return NextResponse.json(banner)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update banner" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const banner = await Banner.findByIdAndDelete(params.id)

    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Banner deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete banner" }, { status: 500 })
  }
}
