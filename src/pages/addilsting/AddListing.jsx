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
      <div className="text-center mt-60 text-6xl">
        Loading<span className="text-darkGreen">...</span>
      </div>
    );
  if (error) return <div className="text-center mt-60 text-4xl">{error}</div>;

  return (
    <>
      {user ? <LogedNavbar /> : <Navbar />}
      {/* Top section text */}
      <div className="top-text text-center mt-14">
        <h1 className="font-medium text-5xl">
          Thank You For Choosing to Host
          <span className="text-darkGreen">!</span>
        </h1>
        <p className="text-lightGray mt-10 w-72 mx-auto  ">
          Please fill in all the details below to help us match you with the
          perfect guests.
        </p>
      </div>
      <div className="form-container pb-1 ">
        <form
          onSubmit={(e) => {
            handleAdd(e);
            resetOffer();
          }}
          id="host-form"
          className="flex justify-between mt-12 w-9/12 mx-auto gap-x-8 md:gap-y-10 sm:gap-y-10 xsm:gap-y-10 xl:flex-row lg:flex-row md:flex-col md:items-center sm:flex-col sm:items-center xsm:flex-col xsm:items-center"
        >
          {/* location box */}

          <div className="location-card w-4/12 flex flex-col md:w-full sm:w-full xsm:w-full ">
            <h3 className="text-1xl text-center">My location is...</h3>
            <div
              id="cityImage"
              className="city-image haifa bg-cover bg-no-repeat bg-center w-full h-40 mx-auto mt-4 rounded-t-md border-solid border border-lightBorder"
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
              className="text-lightGray w-full h-10 p-2 mx-auto border-solid border border-lightBorder border-t-0 rounded-b-md"
              required
            >
              <option value="Haifa">Haifa</option>
              <option value="Jerusalem">Jerusalem</option>
              <option value="Tel-Aviv">Tel-Aviv</option>
              <option value="Herzliya">Herzliya</option>
            </select>
          </div>

          {/* Hosting dates box */}

          <div className="details-card w-4/12 flex flex-col md:w-full sm:w-full xsm:w-full">
            <h3 className="text-1xl text-center xl:mt-0 lg:mt-0 md:mt-3 sm:mt-3 xsm:mt-3">
              I can host...
            </h3>
            <div className="dates mt-4 flex justify-center">
              <div className="input-container w-2/4 h-14 py-1 px-2 border-solid border border-lightBorder rounded-tl-md">
                <label className="label text-mediumGray font-medium text-xs ">
                  FROM
                </label>
                <input
                  required
                  onChange={(e) => {
                    setFrom(e.target.value);
                  }}
                  className="text-mediumGray w-full"
                  type="date"
                />
              </div>

              <div className="input-container w-2/4 h-14 py-1 px-2 border-solid border border-lightBorder rounded-tr-md">
                <label className="label text-mediumGray font-medium text-xs">
                  UNTIL
                </label>
                <input
                  required
                  onChange={(e) => {
                    setUntil(e.target.value);
                  }}
                  className="text-mediumGray w-full"
                  type="date"
                />
              </div>
            </div>

            {/* Guest number box */}

            <div className="guest-num w-full h-14 p-2 border-solid border border-lightBorder border-t-0 rounded-b-md md:w-full sm:w-full xsm:w-full">
              <label className="label block text-mediumGray font-medium text-xs">
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
              <h3 className="text-1xl xlg:mb-0 lg:mb-0 xlg:mt-3 lg:mt-3 md:mt-14 sm:mt-14 xsm:mt-14 md:mb-1 sm:mb-1 xsm:mb-1 text-center">
                A little bit about youself...
              </h3>
              <input
                required
                onChange={(e) => {
                  setAboutU(e.target.value);
                }}
                className="w-full mt-2 text-lightGray h-12 p-2 border-solid border border-lightBorder rounded-md"
                type="text"
                placeholder="I am..."
              />
            </div>
          </div>

          {/* Offer details box */}

          <div className="offer-card w-4/12 md:w-full sm:w-full xsm:w-full">
            <h3 className="text-1xl text-center xl:mt-0 lg:mt-0 md:mt-3 sm:mt-3 xsm:mt-3">
              I can offer...
            </h3>
            <div className="offer grid grid-cols-3 mt-4  ">
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
                <h3 className="text-center mt-4 text-mediumGray w-full">
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
                <h3 className="text-center mt-4 text-mediumGray w-full">
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
                <h3 className="text-center mt-4 text-mediumGray w-full">AC</h3>
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
                <h3 className="text-center mt-4 text-mediumGray w-full">
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
                <h3 className="text-center mt-4 text-mediumGray w-full">TV</h3>
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
                <h3 className="text-center mt-4 text-mediumGray w-full">
                  Pets allowed
                </h3>
              </div>
            </div>
          </div>
        </form>
        <button
          form="host-form"
          type="submit"
          className="block my-12 mx-auto bg-darkGreen justify-center text-white py-4 px-3 rounded-lg lg:w-3/12 sm:w-80 xsm:w-72 "
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default AddListing;
