import mongoose, { Schema } from "mongoose"

const AlumniSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  course: {
    type: String,
    required: [true, "Please provide course name"],
  },
  batch: {
    type: String,
    required: [true, "Please provide batch year"],
  },
  currentPosition: {
    type: String,
    maxlength: [200, "Current position cannot be more than 200 characters"],
  },
  company: {
    type: String,
    maxlength: [100, "Company name cannot be more than 100 characters"],
  },
  image: {
    type: String,
    required: false,
  },
  testimonial: {
    type: String,
    maxlength: [1000, "Testimonial cannot be more than 1000 characters"],
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Alumni || mongoose.model("Alumni", AlumniSchema)
