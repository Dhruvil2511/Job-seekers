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
import Lottie from "lottie-react";
import resumeLoader from "../../../assets/parsing-resume.json";
import heroAnimation from "../../../assets/hero-animation.json";
import "../../../styles/main.css";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [resume, setResume] = useState(null);
  const [fileName, setFileName] = useState(null);

  const [skills, setSkills] = useState(["Python", "Javascript"]);
  const [resumeParsingLoading, setResumeParsingLoading] = useState(false);
  const [isJobsLoading, setIsJobsLoading] = useState(true);

  const inputhandler = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
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
    if (resume) {
      const myform = new FormData();
      myform.append("resume", resume);
      fetchSkils(myform);
    }
  };
  const fetchSkils = async (formdata) => {
    try {
      setResumeParsingLoading(true);
      const fetchedskills = await axios.post(
        `http://127.0.0.1:5000/upload_resume`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setSkills(fetchedskills.data.skills);
      setFileName("");
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setResumeParsingLoading(false);
      }, [2000]);
    }
  };
  const fetchJobsFromDb = async () => {
    setIsJobsLoading(true);
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
    } finally {
      setIsJobsLoading(false);
    }
  };

  const fetchRelatedJobs = async () => {
    setIsJobsLoading(true);
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
    } finally {
      setIsJobsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobsFromDb();
  }, []);

  useEffect(() => {
    if (skills.length === 0) {
      fetchJobsFromDb();
      return;
    }
    fetchRelatedJobs();
  }, [skills]);

  async function handleFormSubmit(event) {
    event.preventDefault();
    // if (search.trim() === "") return;

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
          <div
            className="right flex justify-center items-center"
            style={{ width: "50%" }}
          >
            <div className="flex-col" style={{ zIndex: 10 }}>
              <form
                className="flex-col file-upload-form"
                onSubmit={submitHandler}
              >
                <label htmlFor="file" className="file-upload-label">
                  <div className="file-upload-design">
                    <svg viewBox="0 0 640 512" height="1em">
                      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                    </svg>
                    <p className="text-black">Drag and Drop</p>
                    <p>or</p>
                    <span className="browse-button text-black">
                      Browse file
                    </span>
                  </div>
                  <input
                    id="file"
                    type="file"
                    accept="application/pdf"
                    onChange={inputhandler}
                    style={{ display: "none" }}
                  />
                </label>
                <Button variant="destructive" className="mt-3" type="submit">
                  Submit
                </Button>
              </form>
              <div className="text-center mt-5">
                {resume
                  ? "File: " +
                    (fileName.length > 20
                      ? fileName.slice(0, 20) + "..."
                      : fileName)
                  : null}
              </div>
            </div>
          </div>
        </div>

        <div
          id="search-jobs"
          className="flex items-center  flex-col top-[10rem] md:top-[14rem]"
        >
          <div className="text-[2.5rem] md:text-[5rem]">Jobs</div>
          <form
            className="flex items-center yw-full md:w-[calc(100%-400px)]"
            onSubmit={handleFormSubmit}
          >
            <input
              className="pl-10  rounded-s-full h-12 bg-[#131d1b] outline-none border-none w-full "
              type="search"
              placeholder="Search for company, role, skill, location, or type..."
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
          <div className="flex mt-5 ">
            <div className="px-2 py-2 flex justify-center items-center">
              {skills.length > 0 ? "Parsed skills: " : " Showing all jobs"}
            </div>
            {skills.length > 0 &&
              skills.map((item, index) => (
                <div
                  key={index + 1}
                  className="tags px-2 py-2 flex justify-center items-center"
                  style={{ width: "fit-content" }}
                >
                  <span className="mx-2">{item}</span>
                  <button
                    className="mx-2"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "red",
                    }}
                    onClick={() => removeSkill(index)}
                  >
                    X
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="flex-grow flex flex-col gap-5">
          {isJobsLoading ? (
            <div
              role="status"
              className="flex justify-center items-center my-4"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : jobs.length > 0 ? (
            <div className="flex-col my-16">
              {jobs.map((job) => {
                const randomString =
                  String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                  String.fromCharCode(65 + Math.floor(Math.random() * 26));

                return (
                  <div className="flex-col my-2">
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
                              <CardDescription>
                                Company: {job.company}
                              </CardDescription>
                              <CardDescription>
                                Location: {job.location}
                              </CardDescription>
                              <CardDescription>
                                Domain: {job.domain}
                              </CardDescription>
                              <CardDescription className="flex gap-2 flex-wrap">
                                {job.required_skills.map((skill, index) => (
                                  <div
                                    key={index}
                                    className="cursor-pointer rounded-3xl border-2 px-3 py-1 text-xs font-semibold transition hover:bg-white hover:bg-opacity-50 hover:text-black"
                                  >
                                    <span>{skill}</span>
                                  </div>
                                ))}
                              </CardDescription>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <p>No data found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
