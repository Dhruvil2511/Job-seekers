import axios from "axios";
import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
const JobDetails = () => {
    const { id } = useParams();

    console.log(id);
    const [indiJobDetails, setIndiJobDetails] = useState({});
    
    // const fetchJobDetails = async () => {
    //     try {
    //         const jobDetails = await axios.get(`http://localhost:6969/api/v1/jobs/get-job/${id}`, {
    //             withCredentials: true,
    //         });
    //         console.log(jobDetails);
    //         setIndiJobDetails(jobDetails.data);

    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    
    // useEffect(() => {
    //     fetchJobDetails();
    // }, []);
  return(<>
    <div>Job Details</div>
    <div>{indiJobDetails.title}</div>
    <div>{indiJobDetails.description}</div>
    <div>{indiJobDetails.location}</div>
    <div>{indiJobDetails.salary}</div>
    <div>{indiJobDetails.company}</div>
    <div>{indiJobDetails.experience}</div>
    <div>{indiJobDetails.skills}</div>


  </>);
};

export default JobDetails;
