import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 8080;

// ===== Middleware =====
app.use(express.json());
app.use(cors());

// ===== Routes =====
app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);

// ===== MongoDB Connection =====
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" Connected with database");
  } catch (err) {
    console.error(" Failed to connect with database:", err);
    process.exit(1);
  }
};
// Error handler
app.use((err, req, res, next) => {
  console.error(" Unhandled error:", err.stack);
  res.status(500).json({ error: "Something went wrong on the server." });
});
// ===== Start Server =====
app.listen(PORT, async () => {
  await connectDB();
  console.log(` Server running on port ${PORT}`);
});
