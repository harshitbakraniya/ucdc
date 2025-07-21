import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Course from "@/models/Course"

// GET courses by category
export async function GET(request: Request, { params }: { params: { category: string } }) {
  try {
    await connectDB()

    const { category } = params

    // Validate category
    const validCategories = ["upsc", "gpsc", "ielts", "cds"]
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }

    const courses = await Course.find({ category }).sort({ createdAt: -1 })

    const formattedCourses = courses.map((course) => ({
      id: course._id.toString(),
      title: course.title,
      description: course.description,
      duration: course.duration,
      batchSize: course.batchSize,
      features: course.features,
      fees: course.fees,
      image: course.image,
      category: course.category,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    }))

    return NextResponse.json(formattedCourses)
  } catch (error) {
    console.error("Error fetching courses by category:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
