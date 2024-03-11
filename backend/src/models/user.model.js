import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    contact: { type: Number },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: validator.isEmail
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password must be atleast 6 character"],
      select: false,
    },
    linkedin: { type: String },
    github: { type: String },
    leetcode: { type: String },
    skills: { type: [String] },
    experience: { type: [String] },
  },
  { collection: "users" }
);

userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
}) 

userSchema.methods.getJWTToken = function() {
  return jwt.sign({_id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
  });
};

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
};

// Define the model
export const User = mongoose.model("User", userSchema);