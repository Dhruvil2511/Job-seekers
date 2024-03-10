import express from "express";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // to encode the url with its param
app.use(express.static("public")); // to serve static files

import jobRouter from "./routes/job.route.js";

app.use("/api/v1/jobs", jobRouter);
export { app };
