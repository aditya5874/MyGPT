import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    threadsLimit: {
      type: Number,
      default: 3, // Max lifetime threads
    },
    messagesLimitPerThread: {
      type: Number,
      default: 4, // Max messages per thread
    },
    // --- THIS IS THE NEW LINE ---
    threadsCreatedCount: {
      type: Number,
      default: 0, // Tracks how many threads user has EVER created
    },
    // ----------------------------
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
