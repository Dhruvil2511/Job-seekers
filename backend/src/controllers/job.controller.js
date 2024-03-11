import { asyncHandler } from "../utils/asyncHandler.js";
import { JobOpening } from "../models/job.model.js";

const getJobList = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  let { page, limit } = req.query;
  let skip = (page - 1) * limit;

  try {
    page = Number(page) || 1;
    limit = Number(limit) || 10;
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
  const data = await JobOpening.find({});
  return res.status(200).send(data);
});

const getJob = asyncHandler(async (req, res) => {
  const { jobid } = req.query;
  const data = await JobOpening.findById(jobid);
  if (!data) {
    return res.status(404).send({ error: "Job not found" });
  }
  return res.status(200).send(data);
});

export { getJobList, getJob };
