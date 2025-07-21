import mongoose, { Schema } from "mongoose"

const CommitteeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  position: {
    type: String,
    required: [true, "Please provide a position"],
    maxlength: [100, "Position cannot be more than 100 characters"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image URL"],
  },
  bio: {
    type: String,
    maxlength: [1000, "Bio cannot be more than 1000 characters"],
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

export default mongoose.models.Committee || mongoose.model("Committee", CommitteeSchema)
