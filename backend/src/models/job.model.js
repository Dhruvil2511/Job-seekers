import mongoose from "mongoose";

// Define the schema
const jobOpeningSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    domain: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    required_skills: { type: [String], required: true },
    posted_date: { type: Date, required: true },
    expiration_date: { type: Date, required: true },
  },
  { collection: "job-openings" }
);

// Define the model
export const JobOpening = mongoose.model("JobOpening", jobOpeningSchema);
