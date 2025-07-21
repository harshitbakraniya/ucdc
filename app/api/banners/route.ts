import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Banner from "@/models/Banner"

export async function GET() {
  try {
    await connectDB()
    const banners = await Banner.find().sort({ order: 1 })
    return NextResponse.json(banners)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()
    const banner = new Banner(data)
    await banner.save()
    return NextResponse.json(banner, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create banner" }, { status: 500 })
  }
}
