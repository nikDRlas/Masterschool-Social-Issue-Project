import Button from "../buttons/button";
import { useState } from "react";
import Navbar from "../navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import LogedNavbar from "../../components/navbar/LogedNavbar";

const Main = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? <LogedNavbar /> : <Navbar />}
      <div className="main-container h-screen ">
        <div className="image-container bg-hero-pattern bg-cover bg-no-repeat h-max bg-center">
          <div className="text-container pt-28 w-2/3 text-center m-auto lg:w-3/5 sm:w-4/5 xsm:w-4/5">
            <h1 className="main-text font-bold text-white lg:text-6xl sm:text-4xl xsm:text-3xl ">
              find or give a place of comfort in tough times.
            </h1>
            <h2 className="sec-text text-white mt-32 lg:text-5xl sm:text-3xl xsm:text-2xl ">
              I would like to
            </h2>
          </div>
          <div className="button-container flex flex-col justify-center items-center gap-12 pb-28 mt-12">
            <button className="rounded-md w-80 h-20 text-4xl text-center bg-hostBtn lg:w-96 sm:w-72 xsm:w-56">
              Host
            </button>
            <button className="rounded-md w-80 h-20 text-4xl text-center bg-hostedBtn lg:w-96 sm:w-72 xsm:w-56">
              Be Hosted
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
