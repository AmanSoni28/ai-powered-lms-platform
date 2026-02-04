import mongoose from "mongoose"

const lectureSchema = new mongoose.Schema({
    lectureTitle: {
      type: String,
      required: true
    },
    videoUrl: {
      type: String
    },
    isPreviewFree: {                            // lecture free or paid
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export const Lecture = mongoose.model("Lecture", lectureSchema)