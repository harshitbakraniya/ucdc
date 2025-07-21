import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Course from "@/models/Course"
import mongoose from "mongoose"

// GET a specific course by ID
export async function GET(request: Request, { params }: { params: { category: string; id: string } }) {
  try {
    await connectDB()

    const { category, id } = params

    // Validate category
    const validCategories = ["upsc", "gpsc", "ielts", "cds"]
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 })
    }

    const course = await Course.findOne({ _id: id, category })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({
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
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
  }
}

// PUT (update) a specific course
export async function PUT(request: Request, { params }: { params: { category: string; id: string } }) {
  try {
    await connectDB()

    const { category, id } = params
    const body = await request.json()

    // Validate category
    const validCategories = ["upsc", "gpsc", "ielts", "cds"]
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 })
    }

    // Find and update the course
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: id, category },
      { ...body, category }, // Ensure category doesn't change
      { new: true, runValidators: true },
    )

    if (!updatedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: updatedCourse._id.toString(),
      title: updatedCourse.title,
      description: updatedCourse.description,
      duration: updatedCourse.duration,
      batchSize: updatedCourse.batchSize,
      features: updatedCourse.features,
      image: updatedCourse.image,
      category: updatedCourse.category,
      createdAt: updatedCourse.createdAt,
      updatedAt: updatedCourse.updatedAt,
    })
  } catch (error) {
    console.error("Error updating course:", error)

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ error: "Validation failed", details: validationErrors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to update course" }, { status: 500 })
  }
}

// DELETE a specific course
export async function DELETE(request: Request, { params }: { params: { category: string; id: string } }) {
  try {
    await connectDB()

    const { category, id } = params

    // Validate category
    const validCategories = ["upsc", "gpsc", "ielts", "cds"]
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 })
    }

    const deletedCourse = await Course.findOneAndDelete({ _id: id, category })

    if (!deletedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Course deleted successfully" })
  } catch (error) {
    console.error("Error deleting course:", error)
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
  }
}
