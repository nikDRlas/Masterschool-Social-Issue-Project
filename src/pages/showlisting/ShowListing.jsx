import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import LogedNavbar from "../../components/navbar/LogedNavbar";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";

import house from "../../images/house.jpg";
import shower from "../../images/icons/shower.svg";
import babies from "../../images/icons/babies.svg";
import pets from "../../images/icons/pets.svg";
import tv from "../../images/icons/tv.svg";
import wifi from "../../images/icons/wifi.svg";
import ac from "../../images/icons/ac.svg";
import { db, doc, getDoc } from "../../utils/firebase";

const ShowListing = () => {
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const getListing = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "listings", user?.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
        setError("");
      }
    } catch (e) {
      // doc.data() will be undefined in this case
      setLoading(true);
    }
  };

  useEffect(() => {
    getListing();
  }, [user]);

  if (loading)
    return (
      <div className="text-center mt-60 text-6xl">
        Loading<span className="text-darkGreen">...</span>
      </div>
    );
  if (error) return <div className="text-center mt-60 text-4xl">{error}</div>;

  return (
    <div>
      {user ? <LogedNavbar /> : <Navbar />}
      {console.log(listing)}
      <h1 className="text-5xl md:text-6xl font-medium leading-10 text-center">
        Stay with {listing.fullName}
        <span className="text-darkGreen">!</span>
      </h1>
      <div className="lex-row flex justify-center mx-auto my-14 w-auto">
        <div className="flex flex-col items-center w-1/2 md:w-1/3">
          <img
            className="w-3/4 md:2/3 lg:w-7/12 h-auto"
            src={house}
            alt="a house"
          />
          <h2 className="mt-3 font-semibold">{listing.fullName}</h2>
          <h2 className="font-semibold">{listing.city}</h2>
          <p className="text-sm text-lightGray">{listing.email}</p>
          <p className="text-sm text-lightGray">{listing.phone}</p>
        </div>
        <div className="flex flex-col w-1/2 md:w-1/3">
          <p className=" text-lightGray">"{listing.aboutU}"</p>
          <p className="my-3">
            What {listing?.fullName?.split(" ")[0]} offers:
          </p>
          <div className="mb-3 flex w-1/2 gap-2">
            <img className="w-1/6 h-auto" src={wifi} alt="a house" />
            <img className="w-1/6 h-auto" src={ac} alt="a house" />
            <img className="w-1/6 h-auto" src={pets} alt="a house" />
            <img className="w-1/6 h-auto" src={tv} alt="a house" />
            <img className="w-1/6 h-auto" src={shower} alt="a house" />
            <img className="w-1/6 h-auto" src={babies} alt="a house" />
          </div>
          <p>change to true/false and render the images conditionally</p>
          <p>
            babies: {listing.baby} wifi: {listing.wifi}
          </p>
          <p>
            ac: {listing.ac} shower: {listing.shower}
          </p>
          <p className="mb-3">
            pets: {listing.pets} tv: {listing.tv}
          </p>
          <h2>Available dates:</h2>

          <div className="flex">
            <div className="my-4 p-2 text-xs text-lightGray border-2 rounded-l-lg	lg:w-32 sm:w-18 md:w-24">
              <p>FROM</p>
              <p className="">{listing.from}</p>
            </div>

            <div className="my-4 p-2 text-xs text-lightGray border-2 rounded-r-lg lg:w-32 sm:w-18 md:w-24">
              <p>UNTIL</p>
              <p className="">{listing.until}</p>
            </div>
          </div>

          <h2>Number of guests:</h2>
          <div className="my-4 p-2 text-xs text-lightGray border-2 rounded-lg lg:w-64 sm:w-36 md:w-48">
            <p>UP TO</p>
            <p className="">{listing.guestNum} guests</p>
          </div>
          <button
            
            className=" bg-darkGreen text-white py-4 px-3 rounded-lg lg:w-64 sm:w-36 md:w-48 "
          >
            Contact now
          </button>
        </div>
        <div className="circle-one"></div>
        <div className="circle-two"></div>
        <div className="circle-three"></div>
        <div className="circle-four"></div>
      </div>
    </div>
  );
};

export default ShowListing;
