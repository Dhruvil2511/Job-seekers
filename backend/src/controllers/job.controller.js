import { asyncHandler } from "../utils/asyncHandler.js";
import { JobOpening } from "../models/job.model.js";

const getJobList = asyncHandler(async (req, res) => {
  const { search } = req?.query;
  let pipeline = [];

  if (search) {
    pipeline.push({
      $search: {
        index: "job-opening-index",
        text: {
          query: search,
          path: {
            wildcard: "*",
          },
        },
      },
    });
  }

  pipeline.push({ $match: {} });

  const data = await JobOpening.aggregate([...pipeline]);
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
