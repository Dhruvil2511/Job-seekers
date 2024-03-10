import { Router } from "express";
import { getJobList } from "../controllers/job.controller.js";

const router = Router();

router.route("/get-jobs").get(getJobList);

export default router;
