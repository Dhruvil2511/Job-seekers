import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middlewares/Error.js";
const app = express();
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173","https://job-seekers-xi.vercel.app"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // to encode the url with its param
app.use(express.static("public")); // to serve static files

import jobRouter from "./routes/job.route.js";
import userRouter from "./routes/user.route.js";

app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/user", userRouter);

export { app };

app.use(ErrorMiddleware)