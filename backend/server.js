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

const allowedOrigins = [
  'http://localhost:5173', // Your local frontend
  process.env.FRONTEND_URL  // Your *future* Vercel URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or mobile apps)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Allows cookies/auth headers to be sent
}));
// --- END OF CORS CHANGE ---

app.use(express.json());
// ... (rest of your file)

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
