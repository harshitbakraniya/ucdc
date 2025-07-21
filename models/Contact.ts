import mongoose, { Schema } from "mongoose"

const ContactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  subject: {
    type: String,
    required: [true, "Please provide a subject"],
    maxlength: [200, "Subject cannot be more than 200 characters"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
    maxlength: [1000, "Message cannot be more than 1000 characters"],
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema)
