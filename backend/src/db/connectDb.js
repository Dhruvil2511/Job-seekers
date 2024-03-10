import "dotenv/config";
import mongoose from "mongoose";

async function connectDB() {
  // console.log()
  try {
    const connectionObject = await mongoose.connect(
      `${process.env.MONGODB_URI}/job-seekers`
    );
    console.log(
      `\n MongoDB connected. DB HOST: ${connectionObject.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection failed: ", error);
    process.exit(1);
  }
}

export default connectDB;
