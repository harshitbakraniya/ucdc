import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Gallery from "@/models/Gallery"

export async function GET() {
  try {
    await connectDB()
    const images = await Gallery.find().sort({ createdAt: -1 })
    return NextResponse.json(images)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()
    const image = new Gallery(data)
    await image.save()
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 })
  }
}
