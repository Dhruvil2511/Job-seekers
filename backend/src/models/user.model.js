import mongoose from "mongoose";

// Define the schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    contact: { type: number },
    email: { type: String },
    password: { type: String },
    linkedin: { type: String },
    github: { type: String },
    leetcode: { type: String },
    skills: { type: [String] },
    experience: { type: [String] },
    created_date: { type: Date },
  },
  { collection: "job-openings" }
);

// Define the model
export const User = mongoose.model("User", userSchema);