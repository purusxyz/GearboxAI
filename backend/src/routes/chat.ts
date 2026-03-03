import express from "express";
import jwt from "jsonwebtoken";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

/* =====================================
   JWT VERIFY MIDDLEWARE
===================================== */
const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No or malformed token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/* =====================================
   CHAT ROUTE (GEMINI VERSION)
===================================== */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: "Invalid messages format" });
    }

    /* ============================
       🔥 GEMINI INIT (CHANGED)
    ============================ */
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    /* ============================
       🔥 CONVERT MESSAGES (CHANGED)
    ============================ */
    const prompt = messages
      .map((m: any) => `${m.role}: ${m.content}`)
      .join("\n");

    /* ============================
       🔥 GENERATE RESPONSE (CHANGED)
    ============================ */
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ reply: response });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ message: "Gemini request failed" });
  }
});

export default router;