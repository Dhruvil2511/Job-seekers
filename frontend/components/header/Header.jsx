import React, { useState } from "react";
import LogIn_Register from "../authForm/LogIn_Register";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "../ui/background-beams";

const Header = () => {
  const [openSignOut, setOpenSignOut] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [LoginOrRegister, setLoginOrRegister] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const { toast } = useToast();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLoginOrRegister = (value) => {
    setLoginOrRegister(value);
  };

  const handleSignOut = () => {
    setOpenSignOut(true);
  };

  const confirmSignOut = () => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
    toast({
      description: "You logged out successfully.",
      action: <ToastAction altText="Close">close</ToastAction>,
      duration: 5000,
    });
    setOpenSignOut(false);
    navigate(`/`);
  };

  return (
    <>
      <BackgroundBeams />

      <nav className="bg-gray-900 sticky w-full  top-0 start-0" style={{ zIndex: 999 }}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 "
              alt="Flowbite Logo"
            />
            <span className="hidden md:block self-center text-2xl font-semibold whitespace-nowrap text-white">
              Job Seekers
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              + Add a Job
            </button>
            {false ? (
              <>
                <AlertDialog open={openSignOut} onOpenChange={setOpenSignOut}>
                  <AlertDialogTrigger>
                    <Button className="!ytext-lg ypt-1" variant="ghost">
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to logout?
                    </AlertDialogDescription>
                    <AlertDialogAction as={Button} onClick={confirmSignOut}>
                      Yes, Logout
                    </AlertDialogAction>
                    <AlertDialogCancel as={Button}>Cancel</AlertDialogCancel>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowDialog(true);
                    handleLoginOrRegister("Login");
                  }}
                  type="button"
                  className="text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                >
                  Login
                </button>
              </>
            )}

            <button
              onClick={toggleNav}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
              aria-expanded={isNavOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isNavOpen ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto `}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0  bg-gray-800 md:bg-gray-900 ">
            <li>
                <a
                  href="#parse-resume"
                  className="block py-2 px-3  rounded   md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent "
                  aria-current="page"
                >
                  Parse Resume
                </a>
              </li>
              <li>
                <a
                  href="#search-jobs"
                  className="block py-2 px-3  rounded   md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent "
                  aria-current="page"
                >
                  Search Jobs
                </a>
              </li>
              
              <li>
                <a
                  href="/about"
                  className="block py-2 px-3  rounded   md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent "
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="block py-2 px-3  rounded   md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent "
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showDialog && (
        <LogIn_Register
          LoginOrRegister={LoginOrRegister}
          onClose={() => {
            setShowDialog(false);
            setLoginOrRegister("");
          }}
        />
      )}
    </>
  );
};

export default Header;
