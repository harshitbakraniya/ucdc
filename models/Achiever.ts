import mongoose, { Schema } from "mongoose"

const AchieverSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  exam: {
    type: String,
    required: [true, "Please provide exam name"],
    maxlength: [50, "Exam name cannot be more than 50 characters"],
  },
  rank: {
    type: String,
    required: [true, "Please provide rank"],
    maxlength: [20, "Rank cannot be more than 20 characters"],
  },
  year: {
    type: Number,
    required: [true, "Please provide year"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image URL"],
  },
  testimonial: {
    type: String,
    maxlength: [1000, "Testimonial cannot be more than 1000 characters"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Achiever || mongoose.model("Achiever", AchieverSchema)
