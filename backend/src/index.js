import "dotenv/config";
import connectDB from "./db/connectDb.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 6969, () => {
      console.log(`Server is running at port ${process.env.PORT || 6969}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed!", error);
  });
