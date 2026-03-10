import express from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

/* =====================================
   GLOBAL GEMINI CLIENT (PERFORMANCE)
===================================== */

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

/* =====================================
   RATE LIMITER
===================================== */

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { message: "Too many requests, slow down." },
});

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
   MESSAGE VALIDATION
===================================== */

const validateMessages = (messages: any) => {
  if (!Array.isArray(messages)) return false;

  for (const m of messages) {
    if (!m.role || !m.content) return false;

    if (
      !["user", "assistant", "system"].includes(m.role) ||
      typeof m.content !== "string"
    ) {
      return false;
    }
  }

  return true;
};

/* =====================================
   CONVERT CHAT → GEMINI FORMAT
===================================== */

const convertToGeminiHistory = (messages: any[]) => {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
};

/* =====================================
   CHAT ROUTE
===================================== */

router.post("/", verifyToken, chatLimiter, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!validateMessages(messages)) {
      return res.status(400).json({ message: "Invalid messages format" });
    }

    /* =====================================
       STREAM HEADERS
    ===================================== */

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    /* =====================================
       CREATE CHAT SESSION
    ===================================== */

    const history = convertToGeminiHistory(messages.slice(0, -1));

    const chat = model.startChat({
      history,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    const lastMessage = messages[messages.length - 1]?.content;

    /* =====================================
       STREAM RESPONSE
    ===================================== */

    const result = await chat.sendMessageStream(lastMessage);

    for await (const chunk of result.stream) {
      const text = chunk.text();

      if (text) {
        res.write(text);
      }
    }

    res.end();
  } catch (error) {
    console.error("Gemini Error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        message: "Gemini request failed",
      });
    }
  }
});

export default router;