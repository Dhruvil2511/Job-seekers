import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
// const { data } = await axios.get(`http://localhost:6969/api/v1/jobs/get-jobs`, {
//     withCredentials: true,
const CompanyList =() => {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`http://localhost:6969/api/v1/jobs/get-jobs`, {
        withCredentials: true,
      });
      setJobs(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }





  
  return (<div className="container py-20">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {jobs.map((job) => (
        <div key={job._id} className="bg-white shadow-md p-5">
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
          <p className="text-gray-600">{job.location}</p>
          <p className="text-gray-600">{job.domain}</p>
          <p className="text-gray-600">{job.description}</p>
          <p className="text-gray-600">{job.requirements}</p>
          <p className="text-gray-600">{job.required_skills}</p>
          <p className="text-gray-600">{job.posted_date}</p>
          <p className="text-gray-600">{job.expiration_date}</p>
        </div>
      ))}
    </div>
  </div>);
};

export default CompanyList;
