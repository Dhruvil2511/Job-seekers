import { Button } from "@/components/ui/button";
import React, { useEffect,useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



const Home = () => {

  const [jobs, setJobs] = useState([]);
  const fetchJobsFromDb = async () => {
    try {
      const  jobs  = await axios.get(`http://localhost:6969/api/v1/jobs/get-jobs`, {
        withCredentials: true,
      });
      console.log(jobs);
      setJobs(jobs.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchJobsFromDb();
  },[]);



  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  const searchButton = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="container">
        <div className="flex items-center relative flex-col top-[10rem] md:top-[14rem]">
          <div className="text-[2.5rem] md:text-[5rem]">Jobs</div>
          <div className="flex items-center yw-full md:w-[calc(100%-400px)]">
            <input
              className="pl-10  rounded-s-full h-12 bg-[#131d1b] outline-none border-none w-full "
              type="search"
              placeholder="Search for a Job..."
              onKeyUp={searchQueryHandler}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <Button
              className="h-[2.9rem] rounded-r-full"
              variant="outline"
              onClick={searchButton}
            >
              Search
            </Button>
          </div>
        </div>
        <div>
          <div className="py-64 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <Card key={job._id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                  <CardDescription>{job.location}</CardDescription>
                  <CardDescription>{job.domain}</CardDescription>
                  <CardDescription>{job.required_skills}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

        </div>
    </div>
  );
};

export default Home;
