import { Router } from "express";
import { getJob, getJobList } from "../controllers/job.controller.js";

const router = Router();

router.route("/get-jobs").get(getJobList);
router.route("/get-job").get(getJob);


export default router;
