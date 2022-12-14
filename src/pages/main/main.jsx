import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useHost } from "../../context/HostContext";
import { useEffect, useState } from "react";
import { db, doc, getDoc } from "../../utils/firebase";

import LogedNavbar from "../../components/navbar/LogedNavbar";
import Navbar from "../../components/navbar/Navbar";
import howitwork from "../../images/howitwork.png";
import snirPhoto from "../../images/snir.png";
import niklasPhoto from "../../images/niklas.png";
import ronenPhoto from "../../images/ronen.png";

const Main = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { fullName, created, setCreated } = useHost();
  const checkListing = async () => {
    try {
      const docRef = doc(db, "listings", user?.uid);
      const docSnap = await getDoc(docRef);
      console.log('hi')
      if (docSnap.exists()) {
        setCreated(true);
      }
      else{
        setCreated(false)
      }
    } catch (e) {
      // doc.data() will be undefined in this case
    }
  };

  useEffect(() => {
    checkListing();
  }, [user])
  
  const scrollToSection = (section) => {
    document
      .querySelector(`.${section}`)
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {user ? (
        <LogedNavbar scrollToSection={scrollToSection} />
      ) : (
        <Navbar scrollToSection={scrollToSection} />
      )}
      <div className="h-screen mb-20 main-container ">
        {/* Hero Section */}

        <div className="bg-center bg-no-repeat bg-cover image-container bg-hero-pattern h-max">
          <div className="w-2/3 m-auto text-center text-container pt-28 lg:w-3/5 sm:w-4/5 xsm:w-4/5">
            <h1 className="font-bold text-white main-text lg:text-6xl sm:text-4xl xsm:text-3xl ">
              Find or give a place of comfort in tough times.
            </h1>
            <h2 className="mt-32 text-white sec-text lg:text-5xl sm:text-3xl xsm:text-2xl ">
              I would like to
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-12 mt-12 button-container pb-28">
            {!created ? <button
              onClick={() => {
                if (user) {
                  navigate("/addlisting");
                } else {
                  navigate("/signin");
                }
              }}
              className="h-20 text-4xl font-medium text-center duration-200 ease-in rounded-lg hover:text-white hover:bg-oliveGreen w-80 bg-darkGreen lg:w-96 sm:w-72 xsm:w-56"
            >
              Host
            </button> : <button
              onClick={() => {
                if (user) {
                  navigate("/showlisting");
                } else {
                  navigate("/signin");
                }
              }}
              className="h-20 text-4xl font-medium text-center duration-200 ease-in rounded-lg hover:text-white hover:bg-oliveGreen w-80 bg-darkGreen lg:w-96 sm:w-72 xsm:w-56"
            >
              Host (see your listing)
            </button> }
            <button
              onClick={() => {
                if (user) {
                  navigate("/showAllListing");
                } else {
                  navigate("/signin");
                }
              }}
              className="h-20 text-4xl font-medium text-center duration-200 ease-in rounded-lg hover:bg-darkGreen w-80 hover:text-white bg-oliveGreen lg:w-96 sm:w-72 xsm:w-56"
            >
              Get Hosted
            </button>
          </div>
        </div>

        {/* How it works Section */}
        <div className="flex flex-col items-center px-1 mt-32 how-it-works">
          <h1 className="font-bold lg:text-5xl sm:text-3xl xsm:text-2xl">
            How Does It Work?
          </h1>
          <img
            className="w-2/4 mt-24 lg:w-2/4 sm:w-4/5 xsm:w-full"
            src={howitwork}
            alt=""
          />
          <h2 className="w-3/5 mt-6 font-medium text-center lg:w-3/5 sm:w-4/5 xsm:w-full text-lightGray lg:text-4xl sm:text-3xl xsm:text-2xl">
            We help people at risk find shelter by connecting them with the
            perfects hosts
          </h2>
        </div>

        {/* About us Section */}
        <div className="flex flex-col items-center px-1 mt-32 about">
          <h1 className="font-bold lg:text-5xl sm:text-3xl xsm:text-2xl">
            About Us
          </h1>
          <div className="flex items-center justify-center mt-24 circle-images gap-x-20 gap-y-20 lg:flex-row sm:flex-col xsm:flex-col ">
            <div className="duration-300 ease-in circle-image hover:-translate-y-5 lg:w-1/5 sm:w-3/4 xsm:w-3/4">
              <img src={snirPhoto} alt="" />
              <h3 className="mt-6 text-2xl font-medium text-center">
                Snir Azran
              </h3>
            </div>
            <div className="duration-300 ease-in hover:-translate-y-5 circle-image lg:w-1/5 sm:w-3/4 xsm:w-3/4">
              <img src={niklasPhoto} alt="" />
              <h3 className="mt-6 text-2xl font-medium text-center">
                Niklas Lindenbaum
              </h3>
            </div>
            <div className="duration-300 ease-in hover:-translate-y-5 circle-image lg:w-1/5 sm:w-3/4 xsm:w-3/4">
              <img src={ronenPhoto} alt="" />
              <h3 className="mt-6 text-2xl font-medium text-center">
                Ronnen Podolsky
              </h3>
            </div>
          </div>
          <div></div>
          <h2 className="mt-32 mb-32 font-medium text-center xlg:w-3/5 lg:w-3/5 text-lightGray lg:text-4xl sm:text-3xl xsm:text-2xl sm:w-4/5 xsm:w-full">
            This is a group project developed for MasterSchool
          </h2>
        </div>

        <div className="circle circle-left-top"></div>
      </div>
    </>
  );
};

export default Main;
