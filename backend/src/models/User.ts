import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    email: { type: String, unique: true },
    picture: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);