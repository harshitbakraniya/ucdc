import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Course from "@/models/Course"

// GET all courses
export async function GET() {
  try {
    await connectDB()

    const courses = await Course.find({}).sort({ createdAt: -1 })

    // Group courses by category
    const groupedCourses = {
      upsc: [],
      gpsc: [],
      ielts: [],
      cds: [],
    }

    courses.forEach((course) => {
      groupedCourses[course.category].push({
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
      })
    })

    return NextResponse.json(groupedCourses)
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

// POST a new course
export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const { category, course } = body

    console.log(category, course);

    if (!category || !course) {
      return NextResponse.json({ error: "Category and course data are required" }, { status: 400 })
    }

    // Validate category
    const validCategories = ["upsc", "gpsc", "ielts", "cds"]
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }

    // Create new course with category
    const courseData = {
      ...course,
      category,
    }

    const newCourse = new Course(courseData)
    const savedCourse = await newCourse.save()

    return NextResponse.json(
      {
        id: savedCourse._id.toString(),
        title: savedCourse.title,
        description: savedCourse.description,
        duration: savedCourse.duration,
        batchSize: savedCourse.batchSize,
        features: savedCourse.features,
        image: savedCourse.image,
        category: savedCourse.category,
        fees: savedCourse.fees,
        createdAt: savedCourse.createdAt,
        updatedAt: savedCourse.updatedAt,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating course:", error)

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ error: "Validation failed", details: validationErrors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}
