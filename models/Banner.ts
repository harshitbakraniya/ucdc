import mongoose, { Schema } from "mongoose"

const BannerSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image URL"],
  },
  link: {
    type: String,
    required: false,
  },
  order: {
    type: Number,
    default: 0,
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

export default mongoose.models.Banner || mongoose.model("Banner", BannerSchema)
