import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET missing in .env");
}

// if (!process.env.OPENAI_API_KEY) {
//   throw new Error("OPENAI_API_KEY missing in .env");
// }

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY missing in .env");
}

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gearbox-ai-omega.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});