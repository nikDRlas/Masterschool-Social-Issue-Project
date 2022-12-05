import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogedNavbar from "../../components/navbar/LogedNavbar";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import "../addilsting/addListing.css";
import babiesIcon from "../../icons/babies.svg";
import acIcon from "../../icons/ac.svg";
import petsIcon from "../../icons/pets.svg";
import showerIcon from "../../icons/shower.svg";
import tvIcon from "../../icons/tv.svg";
import wifiIcon from "../../icons/wifi.svg";
import { db, doc, setDoc, serverTimestamp } from "../../utils/firebase";
import { useHost } from "../../context/HostContext";
const photoElement = document.getElementsByClassName("city-image");

const AddListing = () => {
  const {
    fullName,
    phone,
    city,
    setCity,
    from,
    setFrom,
    until,
    setUntil,
    guestNum,
    setGuestNum,
    aboutU,
    setAboutU,
    baby,
    setBaby,
    wifi,
    setWifi,
    ac,
    setAc,
    shower,
    setShower,
    tv,
    setTv,
    pets,
    setPets,
  } = useHost();
  // console.log(fullName, phone)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const activateOffer = (e) => {
    if (e.target.tagName === "IMG" || e.target.tagName === "H3") {
      e.target.parentElement.classList.toggle("activated");
    }
    if (e.target.tagName === "DIV") {
      e.target.classList.toggle("activated");
    }
  };

  const resetOffer = () => {
    setBaby(false);
    setWifi(false);
    setAc(false);
    setShower(false);
    setTv(false);
    setPets(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await setDoc(doc(db, "listings", user.uid), {
        fullName,
        email: user.email,
        phone,
        city,
        from,
        until,
        guestNum,
        aboutU,
        baby,
        wifi,
        ac,
        shower,
        tv,
        pets,
        timeStamp: serverTimestamp(),
      });
      setLoading(false);
      navigate("/showlisting");
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(err.message);
    }
  };

  if (loading)
    return (
      <div className="text-6xl text-center mt-60">
        Loading<span className="text-darkGreen">...</span>
      </div>
    );
  if (error) return <div className="text-4xl text-center mt-60">{error}</div>;

  return (
    <>
      {user ? <LogedNavbar /> : <Navbar />}
      {/* Top section text */}
      <div className="text-center top-text mt-14">
        <h1 className="text-5xl font-medium xsm:text-4xl">
          Thank You For Choosing to Host
          <span className="text-darkGreen">!</span>
        </h1>
        <p className="mx-auto mt-10 text-lightGray w-72 ">
          Please fill in all the details below to help us match you with the
          perfect guests.
        </p>
      </div>
      <div className="pb-1 form-container ">
        <form
          onSubmit={(e) => {
            handleAdd(e);
            resetOffer();
          }}
          id="host-form"
          className="flex justify-between w-9/12 mx-auto mt-12 gap-x-8 md:gap-y-10 sm:gap-y-10 xsm:gap-y-10 xl:flex-row lg:flex-row md:flex-col md:items-center sm:flex-col sm:items-center xsm:flex-col xsm:items-center"
        >
          {/* location box */}

          <div className="flex flex-col w-4/12 location-card md:w-full sm:w-full xsm:w-full ">
            <h3 className="text-xl text-center">My location is...</h3>
            <div
              id="cityImage"
              className="w-full h-40 mx-auto mt-4 bg-center bg-no-repeat bg-cover border border-solid city-image haifa rounded-t-md border-lightBorder"
            ></div>
            <select
              onChange={(e) => {
                setCity(e.target.value);
                if (e.target.value === "Tel-Aviv") {
                  photoElement[0].classList.remove(
                    "herziliya",
                    "jerusalem",
                    "haifa"
                  );
                  photoElement[0].classList.add("tel-aviv");
                }
                if (e.target.value === "Herzliya") {
                  photoElement[0].classList.remove(
                    "tel-aviv",
                    "jerusalem",
                    "haifa"
                  );
                  photoElement[0].classList.add("herziliya");
                }
                if (e.target.value === "Jerusalem") {
                  photoElement[0].classList.remove(
                    "tel-aviv",
                    "haifa",
                    "herziliya"
                  );
                  photoElement[0].classList.add("jerusalem");
                }
                if (e.target.value === "Haifa") {
                  photoElement[0].classList.remove(
                    "tel-aviv",
                    "jerusalem",
                    "herziliya"
                  );
                  photoElement[0].classList.add("haifa");
                }
              }}
              className="w-full h-10 p-2 mx-auto border border-t-0 border-solid text-lightGray border-lightBorder rounded-b-md"
              required
            >
              <option value="Haifa">Haifa</option>
              <option value="Jerusalem">Jerusalem</option>
              <option value="Tel-Aviv">Tel-Aviv</option>
              <option value="Herzliya">Herzliya</option>
            </select>
          </div>

          {/* Hosting dates box */}

          <div className="flex flex-col w-4/12 details-card md:w-full sm:w-full xsm:w-full">
            <h3 className="text-xl text-center xl:mt-0 lg:mt-0 md:mt-3 sm:mt-3 xsm:mt-3">
              I can host...
            </h3>
            <div className="flex justify-center mt-4 dates">
              <div className="w-2/4 px-2 py-1 border border-solid input-container h-14 border-lightBorder rounded-tl-md">
                <label className="text-xs font-medium label text-mediumGray ">
                  FROM
                </label>
                <input
                  required
                  onChange={(e) => {
                    setFrom(e.target.value);
                  }}
                  className="w-full text-mediumGray"
                  type="date"
                />
              </div>

              <div className="w-2/4 px-2 py-1 border border-solid input-container h-14 border-lightBorder rounded-tr-md">
                <label className="text-xs font-medium label text-mediumGray">
                  UNTIL
                </label>
                <input
                  required
                  onChange={(e) => {
                    setUntil(e.target.value);
                  }}
                  className="w-full text-mediumGray"
                  type="date"
                />
              </div>
            </div>

            {/* Guest number box */}

            <div className="w-full p-2 border border-t-0 border-solid guest-num h-14 border-lightBorder rounded-b-md md:w-full sm:w-full xsm:w-full">
              <label className="block text-xs font-medium label text-mediumGray">
                NUMBER OF GUESTS
              </label>
              <input
                required
                onChange={(e) => {
                  setGuestNum(e.target.value);
                }}
                className="w-full text-mediumGray"
                type="number"
                placeholder="How many can you host?"
              />
            </div>

            {/* About you box */}

            <div className="about">
              <h3 className="text-xl text-center xlg:mb-0 lg:mb-0 xlg:mt-3 lg:mt-3 md:mt-14 sm:mt-14 xsm:mt-14 md:mb-1 sm:mb-1 xsm:mb-1">
                A little bit about youself...
              </h3>
              <input
                required
                onChange={(e) => {
                  setAboutU(e.target.value);
                }}
                className="w-full h-12 p-2 mt-2 border border-solid rounded-md text-lightGray border-lightBorder"
                type="text"
                placeholder="I am..."
              />
            </div>
          </div>

          {/* Offer details box */}

          <div className="w-4/12 offer-card md:w-full sm:w-full xsm:w-full">
            <h3 className="text-xl text-center xl:mt-0 lg:mt-0 md:mt-3 sm:mt-3 xsm:mt-3">
              I can offer...
            </h3>
            <div className="grid grid-cols-3 mt-4 offer ">
              <div
                onClick={(e) => {
                  if (!baby) {
                    setBaby(true);
                    activateOffer(e);
                  }
                  if (baby) {
                    setBaby(false);
                    activateOffer(e);
                  }
                }}
                className="offer-item cursor-pointer py-1.5 px-2 border-solid border border-lightBorder rounded-tl-md"
              >
                <img src={babiesIcon} alt="" className="w-6 h-6 mx-auto" />
                <h3 className="w-full mt-4 text-center text-mediumGray">
                  Babies allowed
                </h3>
              </div>
              <div
                onClick={(e) => {
                  if (!wifi) {
                    setWifi(true);
                    activateOffer(e);
                  }
                  if (wifi) {
                    setWifi(false);
                    activateOffer(e);
                  }
                }}
                className="offer-item cursor-pointer py-1.5 px-2 border-solid border border-l-0 border-lightBorder"
              >
                <img src={wifiIcon} alt="" className="w-6 h-6 mx-auto" />
                <h3 className="w-full mt-4 text-center text-mediumGray">
                  Wifi
                </h3>
              </div>
              <div
                onClick={(e) => {
                  if (!ac) {
                    setAc(true);
                    activateOffer(e);
                  }
                  if (ac) {
                    setAc(false);
                    activateOffer(e);
                  }
                }}
                className="offer-item cursor-pointer py-1.5 px-2 border-solid border border-l-0  border-lightBorder rounded-tr-md"
              >
                <img src={acIcon} alt="" className="w-6 h-6 mx-auto" />
                <h3 className="w-full mt-4 text-center text-mediumGray">AC</h3>
              </div>
              <div
                onClick={(e) => {
                  if (!shower) {
                    setShower(true);
                    activateOffer(e);
                  }
                  if (shower) {
                    setShower(false);
                    activateOffer(e);
                  }
                }}
                className="offer-item cursor-pointer py-1.5 px-2 border-solid border border-t-0  border-lightBorder rounded-bl-md"
              >
                <img src={showerIcon} alt="" className="w-6 h-6 mx-auto" />
                <h3 className="w-full mt-4 text-center text-mediumGray">
                  Shower
                </h3>
              </div>
              <div
                onClick={(e) => {
                  if (!tv) {
                    setTv(true);
                    activateOffer(e);
                  }
                  if (tv) {
                    setTv(false);
                    activateOffer(e);
                  }
                }}
                className="offer-item cursor-pointer py-1.5 px-2 border-solid border border-t-0 border-l-0  border-lightBorder "
              >
                <img src={tvIcon} alt="" className="w-6 h-6 mx-auto" />
                <h3 className="w-full mt-4 text-center text-mediumGray">TV</h3>
              </div>
              <div
                onClick={(e) => {
                  if (!pets) {
                    setPets(true);
                    activateOffer(e);
                  }
                  if (pets) {
                    setPets(false);
                    activateOffer(e);
                  }
                }}
                className="offer-item cursor-pointer py-1.5 px-2 border-solid border border-t-0 border-l-0 border-lightBorder rounded-br-md"
              >
                <img src={petsIcon} alt="" className="w-6 h-6 mx-auto" />
                <h3 className="w-full mt-4 text-center text-mediumGray">
                  Pets allowed
                </h3>
              </div>
            </div>
          </div>
        </form>
        <button
          form="host-form"
          type="submit"
          className="justify-center block px-3 py-4 mx-auto my-12 text-white duration-200 ease-in rounded-lg hover:bg-oliveGreen bg-darkGreen lg:w-3/12 sm:w-80 xsm:w-72 "
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default AddListing;
