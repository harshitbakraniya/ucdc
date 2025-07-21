import mongoose, { Schema } from "mongoose"

const GallerySchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image URL"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
    enum: ["event", "classroom", "achievement", "facility", "other"],
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

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema)
