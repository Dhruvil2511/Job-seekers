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
import { Link, useNavigate } from "react-router-dom";



const Home = () => {

  const [jobs, setJobs] = useState([]);
  //fetch data
  const navigate = useNavigate();

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
        <div className="flex gap-16">
          <div className="py-64">
              Filter Jobs
              <Card>
                <CardContent>
                  <CardDescription>Filter Jobs</CardDescription>
                </CardContent>
              </Card>
          </div>
          <div className="ml-52 py-64 flex-grow flex flex-col gap-5">
            
            {jobs.map((job) => (
              <Link to={`/jobs/${job._id}`} key={job._id}>
              <Card key={job._id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                  <CardDescription>{job.location}</CardDescription>
                  <CardDescription>{job.domain}</CardDescription>
                  <CardDescription className="flex gap-2 flex-wrap">
                    {job.required_skills.map((skill) => (
                      
                        <div className="cursor-pointer rounded-3xl border-2  px-3 py-1 text-xs font-semibold transition hover:bg-white hover:bg-opacity-50 hover:text-black">
                          <span >{skill}</span>
                        </div>
                      
                    ))}
                    </CardDescription>
                </CardHeader>
              </Card>
              </Link>
            ))}
          </div>

        </div>
    </div>
  );
};

export default Home;
