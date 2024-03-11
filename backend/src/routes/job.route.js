import { Router } from "express";
import { getJob, getJobList, getRelatedJobs } from "../controllers/job.controller.js";

const router = Router();

router.route("/get-jobs").get(getJobList);
router.route("/get-job").get(getJob);
router.route("/get-related-jobs").post(getRelatedJobs);



export default router;
