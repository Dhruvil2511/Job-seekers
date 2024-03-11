import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();

  const fetchJobDetails = async () => {
    try {
      const jobDetails = await axios.get(
        `https://job-seekers-be.onrender.com/api/v1/jobs/get-job/`,
        {
          withCredentials: true,
          params: { jobid: id },
        }
      );
      console.log(jobDetails);
      setIndiJobDetails(jobDetails.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  // console.log(id);
  const [indiJobDetails, setIndiJobDetails] = useState({
    requirements: [],
    required_skills: [],
  });
  return (
    <>
      <div className="container py-20">
        <div className="flex  items-center flex-col top-[10rem] md:top-[14rem]">
          <div className="text-[2.5rem] md:text-[5rem]">Job Details</div>
          <div className="flex gap-8 items-center yw-full md:w-[calc(100%-400px)]">
            <div className="pl-10 outline-none border-none w-full ">
              <h2>{indiJobDetails.company}</h2>
              <h3>{indiJobDetails.location}</h3>
              <h4>{indiJobDetails.description}</h4>
              <h1>{indiJobDetails.title}</h1>
              <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <h1>requirements :</h1>
                {indiJobDetails.requirements.map((skill) => (
                  <span>{skill}</span>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <span>required skills:</span>
                <div className="flex gap-4">
                {indiJobDetails.required_skills.map((skill) => (
                  <div className="cursor-pointer rounded-3xl border-2  px-3 py-1 text-xs font-semibold transition hover:bg-white hover:bg-opacity-50 hover:text-black">
                    <span>{skill}</span>
                  </div>
                ))}
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
