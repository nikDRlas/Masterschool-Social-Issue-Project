import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogedNavbar from "../../components/navbar/LogedNavbar";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import houseListing from "../../images/houseListing.png";
import ac from "../../images/icons/ac-white.svg";
import babies from "../../images/icons/baby-white.svg";
import pets from "../../images/icons/pets-white.svg";
import shower from "../../images/icons/shower-white.svg";
import tv from "../../images/icons/tv-white.svg";
import wifi from "../../images/icons/wifi-white.svg";
import location from "../../images/icons/location-white.svg";
import { db, getDocs, collection } from "../../utils/firebase";

const ShowAllListing = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const getListings = async () => {
    let list = [];
    setLoading(true);
    try {
      const docRef = collection(db, "listings");
      const docSnap = await getDocs(docRef);
      docSnap.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      console.log("Document data:", list);
      setListings(list);
      setLoading(false);
      setError("");
    } catch (e) {
      // doc.data() will be undefined in this case
      setLoading(true);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

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
      <div className="text-center mt-14 top-text">
        <h1 className="text-5xl font-medium sm:text-4xl xsm:text-4xl">
          Pick the best option for you<span className="text-darkGreen">!</span>
        </h1>
        <p className="mt-10 text-lightGray ">
          Choose the offer that fits you’re needs perfectly.
        </p>
      </div>
      <div className="grid pb-24 mx-auto mt-20 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-y-10 gap-x-2 md:w-11/12 xl:w-4/5 lg:w-auto justify-items-center allListing">
        {listings.map((list) => (
          /*{ Image and name }*/

          <div
            key={list.id}
            className="px-6 py-4 duration-200 ease-in rounded-md cursor-pointer xsm:px-3 listing bg-darkGreen hover:bg-oliveGreen"
            onClick={() => {
              navigate("/showListingDyn", {
                state: { id: list.id },
              });
            }}
          >
            <img
              className="h-auto mx-auto mt-4 w-36"
              src={houseListing}
              alt=""
            />
            <h1 className="mt-3 text-xl text-white">{list.fullName}</h1>

            {/* city details */}

            <div className="flex mt-3 city">
              <img className="w-6 h-6" src={location} alt="" />
              <h2 className="ml-2 text-white ">{list.city}</h2>
            </div>

            {/* Hosting details */}

            <div className="flex mt-3 details">
              <div className="from">
                <h2 className="text-white ">FROM</h2>
                <h2 className="text-white ">{list.from}</h2>
              </div>
              <div className="ml-6 until">
                <h2 className="text-white ">UNTIL</h2>
                <h2 className="text-white ">{list.until}</h2>
              </div>
              <div className="ml-6 guestNum">
                <h2 className="text-white ">UP TO</h2>
                <h2 className="text-white ">{list.guestNum} Guests</h2>
              </div>
            </div>

            {/* Hosting Offers */}

            <div className="flex mt-3 offers">
              {list.wifi && <img className="w-6 h-6" src={wifi} alt="wifi" />}
              {list.ac && <img className="w-6 h-6 ml-3" src={ac} alt="ac" />}
              {list.pets && (
                <img className="w-6 h-6 ml-3" src={pets} alt="pets" />
              )}
              {list.tv && <img className="w-6 h-6 ml-3" src={tv} alt="tv" />}
              {list.shower && (
                <img className="w-6 h-6 ml-3" src={shower} alt="shower" />
              )}
              {list.baby && (
                <img className="w-6 h-6 ml-3" src={babies} alt="babies" />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowAllListing;
