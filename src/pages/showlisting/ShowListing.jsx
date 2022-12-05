import { useEffect, useState } from "react";
import LogedNavbar from "../../components/navbar/LogedNavbar";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import house from "../../images/house.jpg";
import ac from "../../images/icons/ac.svg";
import babies from "../../images/icons/babies.svg";
import pets from "../../images/icons/pets.svg";
import shower from "../../images/icons/shower.svg";
import tv from "../../images/icons/tv.svg";
import wifi from "../../images/icons/wifi.svg";
import { db, doc, getDoc } from "../../utils/firebase";
import ShowDetails from "../../components/ShowDetails";
import { useHost } from "../../context/HostContext";

const ShowListing = () => {
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { showDetails, setShowDetails } = useHost();
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
      <div className="flex justify-center w-auto mx-auto my-20 lex-row ">
        <div className="flex flex-col items-center w-1/2 md:w-1/3">
          <img
            className="w-3/4 h-auto md:2/3 lg:w-7/12"
            src={house}
            alt="a house"
          />
          <h2 className="mt-2 text-2xl font-semibold ">{listing.fullName}</h2>
          <h2 className="mt-1 text-lg font-semibold">From {listing.city}</h2>
        </div>
        <div className="flex flex-col w-1/2 md:w-1/3">
          <p className="text-lg text-lightGray">"{listing.aboutU}"</p>
          <p className="my-5 text-xl">
            What {listing?.fullName?.split(" ")[0]} offers:
          </p>
          <div className="flex w-1/2 gap-2 mb-3">
            {listing.wifi && (
              <img className="h-auto w-1/8" src={wifi} alt="wifi" />
            )}
            {listing.ac && <img className="h-auto w-1/8" src={ac} alt="ac" />}
            {listing.pets && (
              <img className="h-auto w-1/8" src={pets} alt="pets" />
            )}
            {listing.tv && <img className="h-auto w-1/8" src={tv} alt="tv" />}
            {listing.shower && (
              <img className="h-auto w-1/8" src={shower} alt="shower" />
            )}
            {listing.baby && (
              <img className="h-auto w-1/8" src={babies} alt="babies" />
            )}
          </div>
          <h2 className="mt-3 text-xl">Available dates:</h2>

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

          <h2 className="text-xl">Number of guests:</h2>
          <div className="p-2 my-4 text-xs border-2 rounded-lg text-lightGray lg:w-64 sm:w-36 md:w-48">
            <p>UP TO</p>
            <p className="">{listing.guestNum} guests</p>
          </div>
          <button
            onClick={() => {
              setShowDetails(true);
              console.log(showDetails);
            }}
            className="px-3 py-4 mt-2 text-white ease-in rounded-lg hover:bg-oliveGreen bg-darkGreen lg:w-64 sm:w-36 md:w-48"
          >
            Contact now
          </button>
        </div>
        {/* <div className="circle-one"></div>
        <div className="circle-two"></div>
        <div className="circle-three"></div>
        <div className="circle-four"></div> */}
      </div>
      {showDetails && (
        <ShowDetails
          phone={listing.phone}
          name={listing.fullName}
          email={listing.email}
        />
      )}
    </div>
  );
};

export default ShowListing;
