import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [Resume, setResume] = useState(null);
  const [skills, setSkills] = useState(["Python"]);

  const inputhandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setResume(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (Resume) {
      const myform = new FormData();
      myform.append("resume", Resume);
      fetchSkils(myform);
    }
  };
  const fetchSkils = async (formdata) => {
    try {
      const fetchedskills = await axios.post(
        `http://127.0.0.1:5000/upload_resume`,
        formdata,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setSkills(fetchedskills.data.skills);
      console.log(fetchedskills.data.skills);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchJobsFromDb = async () => {
    try {
      const jobs = await axios.get(
        `http://localhost:6969/api/v1/jobs/get-jobs`,
        {
          withCredentials: true,
          params: {
            search: search,
          },
        }
      );
      setJobs(jobs.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRelatedJobs = async () => {
    if (skills.length === 0) return;
    try {
      const result = await axios.post(
        `http://localhost:6969/api/v1/jobs/get-related-jobs`,
        { skills },
        {
          withCredentials: true,
        }
      );
      console.log(result);
      setJobs(result.data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchJobsFromDb();
  }, []);

  useEffect(() => {
    fetchRelatedJobs();
  }, [skills]);

  async function handleFormSubmit(event) {
    event.preventDefault();
    if (search.trim() === "") return;

    fetchJobsFromDb();
  }

  return (
    <div className="container">
      <div className="flex items-center relative flex-col top-[8rem] md:top-[10rem]">
        <form action="" method="post">
          <div className=" flex gap-4 flex-col">
            <label>Submit Your CV here : </label>
            <input
              type="file"
              name="upload"
              accept="application/pdf"
              onChange={inputhandler}
            />
            <Button type="submit" onClick={submitHandler}>
              submit
            </Button>
          </div>
        </form>
      </div>
      <div className="flex items-center relative flex-col top-[10rem] md:top-[14rem]">
        <div className="text-[2.5rem] md:text-[5rem]">Jobs</div>
        <form
          className="flex items-center yw-full md:w-[calc(100%-400px)]"
          onSubmit={handleFormSubmit}
        >
          <input
            className="pl-10  rounded-s-full h-12 bg-[#131d1b] outline-none border-none w-full "
            type="search"
            placeholder="Search for a Job..."
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button
            className="h-[2.9rem] rounded-r-full"
            variant="outline"
            type="submit"
          >
            Search
          </Button>
        </form>
      </div>
      <div className=" py-64 flex-grow flex flex-col gap-5">
        {jobs.length > 0 ? (
          jobs.map((job) => {
            // Generate a random two-letter string
            const randomString =
              String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
              String.fromCharCode(65 + Math.floor(Math.random() * 26));

            return (
              <Link to={`/jobs/${job._id}`} key={job._id}>
                <Card className="flex justify-between" key={job._id}>
                  <CardContent className="py-4">
                    <div className="flex flex-col md:flex-row gap-12">
                      <div>
                        <img
                          src={`https://dummyimage.com/100x100/77777d/4a3c4a&text=${randomString}`}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>{job.company}</CardDescription>
                        <CardDescription>{job.location}</CardDescription>
                        <CardDescription>{job.domain}</CardDescription>
                        <CardDescription className="flex gap-2 flex-wrap">
                          {job.required_skills.map((skill) => (
                            <div className="cursor-pointer rounded-3xl border-2  px-3 py-1 text-xs font-semibold transition hover:bg-white hover:bg-opacity-50 hover:text-black">
                              <span>{skill}</span>
                            </div>
                          ))}
                        </CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })
        ) : (
          <div>
            <p>No data found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
