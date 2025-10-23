import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
  {
    threadId: {
      type: String,
      required: true,
      unique: true,
    },
    title: String,
    messages: [
      {
        role: String, // "user" or "assistant"
        content: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // link to which user owns this thread
    },
  },
  { timestamps: true }
);

export default mongoose.model("Thread", threadSchema);
