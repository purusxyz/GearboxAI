import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();

/* =====================================
   JWT VERIFY MIDDLEWARE (SAFER)
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
   STEP 1: Redirect To Google
===================================== */
router.get("/google", (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    // redirect_uri: "http://localhost:5000/auth/google/callback",
    redirect_uri: `${process.env.BACKEND_URL}/auth/google/callback`,
    response_type: "code",
    scope: "profile email",
    access_type: "offline",
    prompt: "consent",
  });

  res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
});

/* =====================================
   STEP 2: Google Callback
===================================== */
router.get("/google/callback", async (req, res) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).send("Authorization code missing");
  }

  try {
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        // redirect_uri: "http://localhost:5000/auth/google/callback",
        redirect_uri: `${process.env.BACKEND_URL}/auth/google/callback`,
        grant_type: "authorization_code",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = tokenResponse.data;

    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { id, name, email, picture } = userResponse.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId: id,
        name,
        email,
        picture,
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // res.redirect(`http://localhost:5173/login-success?token=${token}`);
    res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).send("Authentication failed");
  }
});

/* =====================================
   GET CURRENT USER
===================================== */
router.get("/me", verifyToken, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.id).select("-__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;