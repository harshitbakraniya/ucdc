import mongoose, { type Document, Schema } from "mongoose"

export interface ICourse extends Document {
  title: string
  description: string
  duration: string
  batchSize: string
  features: string[]
  image: string
  category: "upsc" | "gpsc" | "ielts" | "cds"
  createdAt: Date
  updatedAt: Date
}

const CourseSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    duration: {
      type: String,
      required: [true, "Course duration is required"],
      trim: true,
    },
    batchSize: {
      type: String,
      required: [true, "Batch size is required"],
      trim: true,
    },
    fees: {
      type: Number,
      required: [true, "Fees is required"]
    },
    features: {
      type: [String],
      required: [true, "At least one feature is required"],
      validate: {
        validator: (features: string[]) => features.length > 0,
        message: "At least one feature is required",
      },
    },
    image: {
      type: String,
      default: "/placeholder.svg?height=300&width=500",
    },
    category: {
      type: String,
      required: [true, "Course category is required"],
      enum: {
        values: ["upsc", "gpsc", "ielts", "cds"],
        message: "Category must be one of: upsc, gpsc, ielts, cds",
      },
    },
  },
  {
    timestamps: true,
  },
)

// Add indexes for better query performance
CourseSchema.index({ category: 1 })
CourseSchema.index({ title: 1 })
CourseSchema.index({ createdAt: -1 })

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema)
