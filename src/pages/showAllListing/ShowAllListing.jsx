import { QuerySnapshot } from "firebase/firestore";
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
import { db, getDocs, collection } from "../../utils/firebase";

const ShowAllListing = () => {
  const [listings, setListings] = useState([]);
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
        list.push(doc.data());
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
      <div className="mt-12 text-center top-text">
        <h1 className="font-medium text-7xl">
          Hello<span className="text-darkGreen">!</span>
        </h1>
        <p className="mt-10 text-lightGray ">
          Create a free account with your email.
        </p>
      </div>
    </>
  );
};

export default ShowAllListing;
