import { useNavigate } from "react-router-dom";
import LogedNavbar from "../../components/navbar/LogedNavbar";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../navbar/Navbar";
import howitwork from "../../images/howitwork.png";
import snirPhoto from "../../images/snir.png";
import niklasPhoto from "../../images/niklas.png";
import ronenPhoto from "../../images/ronen.png";
import main from "../main/main.css";

const Main = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {user ? <LogedNavbar /> : <Navbar />}
      <div className="main-container h-screen mb-20   ">
        {/* Hero Section */}

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
            <button
              onClick={() => {
                if (user) {
                  navigate("/addlisting");
                } else {
                  navigate("/signin");
                }
              }}
              className="rounded-md w-80 h-20 text-4xl text-center bg-hostBtn lg:w-96 sm:w-72 xsm:w-56"
            >
              Host
            </button>
            <button className="rounded-md w-80 h-20 text-4xl text-center bg-hostedBtn lg:w-96 sm:w-72 xsm:w-56">
              Be Hosted
            </button>
          </div>
        </div>

        {/* How it works Section */}
        <div className="how-it-works mt-32 flex flex-col items-center px-1">
          <h1 className="font-bold lg:text-5xl sm:text-3xl xsm:text-2xl">
            How Does It Work?
          </h1>
          <img
            className="xlg: w-2/4 lg:w-2/4 mt-24 sm:w-4/5 xsm:w-full"
            src={howitwork}
            alt=""
          />
          <h2 className="font-medium mt-6 xlg: w-3/5 lg:w-3/5 sm:w-4/5 xsm:w-full text-center text-lightGray lg:text-4xl sm:text-3xl xsm:text-2xl">
            We help people at risk find shelter by connecting them with the
            perfects hosts
          </h2>
        </div>

        {/* About us Section */}
        <div className="about mt-32 flex flex-col items-center px-1">
          <h1 className="font-bold lg:text-5xl sm:text-3xl xsm:text-2xl">
            About Us
          </h1>
          <div className="circle-images mt-24 flex items-center justify-center gap-x-20 gap-y-20 lg:flex-row sm:flex-col xsm:flex-col ">
            <div className="circle-image  lg:w-1/5 sm:w-3/4 xsm:w-3/4">
              <img src={snirPhoto} alt="" />
              <h3 className="text-center mt-6 text-2xl font-medium">
                Snir Azran
              </h3>
            </div>
            <div className="circle-image  lg:w-1/5 sm:w-3/4 xsm:w-3/4">
              <img src={niklasPhoto} alt="" />
              <h3 className="text-center mt-6 text-2xl font-medium">
                Niklas Lindenbaum
              </h3>
            </div>
            <div className="circle-image  lg:w-1/5 sm:w-3/4 xsm:w-3/4">
              <img src={ronenPhoto} alt="" />
              <h3 className="text-center mt-6 text-2xl font-medium">
                Ronnen Podolsky
              </h3>
            </div>
          </div>
          <h2 className="font-medium mb-32 mt-32 xlg:w-3/5 lg:w-3/5 text-center text-lightGray lg:text-4xl sm:text-3xl xsm:text-2xl sm:w-4/5 xsm:w-full">
            This is a group project developed for MasterSchool
          </h2>
        </div>

        <div className="circle circle-left-top"></div>
      </div>
    </>
  );
};

export default Main;
