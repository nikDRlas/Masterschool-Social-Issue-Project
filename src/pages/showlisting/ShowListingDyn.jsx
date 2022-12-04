import { useEffect, useState } from "react";
import LogedNavbar from "../../components/navbar/LogedNavbar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import house from "../../images/house.jpg";
import ac from "../../images/icons/ac.svg";
import babies from "../../images/icons/babies.svg";
import pets from "../../images/icons/pets.svg";
import shower from "../../images/icons/shower.svg";
import tv from "../../images/icons/tv.svg";
import wifi from "../../images/icons/wifi.svg";
import { db, doc, getDoc } from "../../utils/firebase";

const ShowListingDyn = () => {
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { user } = useAuth();

  const getListing = async () => {
    console.log(location);
    setLoading(true);
    try {
      const docRef = doc(db, "listings", location.state.id);
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
      <div className="text-6xl text-center mt-60">
        Loading<span className="text-darkGreen">...</span>
      </div>
    );
  if (error) return <div className="text-4xl text-center mt-60">{error}</div>;

  return (
    <div className="pb-6">
      {user ? <LogedNavbar /> : <Navbar />}
      {console.log(listing)}
      <h1 className="text-5xl font-medium leading-10 text-center mt-14 md:text-6xl">
        Stay with {listing.fullName}
        <span className="text-darkGreen">!</span>
      </h1>
      <div className="flex justify-center w-auto mx-auto my-20">
        <div className="flex flex-col items-center w-1/2 md:w-1/3">
          <img
            className="w-3/4 h-auto md:2/3 lg:w-7/12"
            src={house}
            alt="a house"
          />
          <h2 className="mt-2 font-semibold ">{listing.fullName}</h2>
          <h2 className="mt-1 font-semibold">{listing.city}</h2>
          <p className="mt-1 text-sm text-lightGray">{listing.email}</p>
          <p className="mt-1 text-sm text-lightGray">{listing.phone}</p>
        </div>
        <div className="flex flex-col w-1/2 md:w-1/3">
          <p className=" text-lightGray">"{listing.aboutU}"</p>
          <p className="my-5">
            What {listing?.fullName?.split(" ")[0]} offers:
          </p>
          <div className="flex w-1/2 gap-2 mb-3">
            {listing.wifi && (
              <img className="w-1/6 h-auto" src={wifi} alt="wifi" />
            )}
            {listing.ac && <img className="w-1/6 h-auto" src={ac} alt="ac" />}
            {listing.pets && (
              <img className="w-1/6 h-auto" src={pets} alt="pets" />
            )}
            {listing.tv && <img className="w-1/6 h-auto" src={tv} alt="tv" />}
            {listing.shower && (
              <img className="w-1/6 h-auto" src={shower} alt="shower" />
            )}
            {listing.babies && (
              <img className="w-1/6 h-auto" src={babies} alt="babies" />
            )}
          </div>
          <h2 className="mt-3">Available dates:</h2>

          <div className="flex">
            <div className="p-2 my-4 text-xs border-2 rounded-l-lg text-lightGray lg:w-32 sm:w-18 md:w-24">
              <p>FROM</p>
              <p className="">{listing.from}</p>
            </div>

            <div className="p-2 my-4 text-xs border-2 border-l-0 rounded-r-lg text-lightGray lg:w-32 sm:w-18 md:w-24">
              <p>UNTIL</p>
              <p className="">{listing.until}</p>
            </div>
          </div>

          <h2>Number of guests:</h2>
          <div className="p-2 my-4 text-xs border-2 rounded-lg text-lightGray lg:w-64 sm:w-36 md:w-48">
            <p>UP TO</p>
            <p className="">{listing.guestNum} guests</p>
          </div>
          <button className="px-3 py-4 mt-2 text-white rounded-lg bg-darkGreen lg:w-64 sm:w-36 md:w-48">
            Contact now
          </button>
        </div>
        {/* <div className="circle-one"></div>
        <div className="circle-two"></div>
        <div className="circle-three"></div>
        <div className="circle-four"></div> */}
      </div>
    </div>
  );
};

export default ShowListingDyn;
