import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import LogedNavbar from "../../components/navbar/LogedNavbar";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
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
    <>
      {user ? <LogedNavbar /> : <Navbar />}
      <p>name: {listing.fullName}</p>
      <p>email: {listing.email}</p>
      <p>city: {listing.city}</p>
      <p>phone: {listing.phone}</p>
      <p>arriveDate: {listing.from}</p>
      <p>leavingDate: {listing.until}</p>
      <p>numOfGuests: {listing.guestNub}</p>
      <p>aboutYou: {listing.aboutU}</p>
      <p>babies: {listing.baby}</p>
      <p>wifi: {listing.wifi}</p>
      <p>ac: {listing.ac}</p>
      <p>shower: {listing.shower}</p>
      <p>tv: {listing.tv}</p>
      <p>pets: {listing.pets}</p>
    </>
  );
};

export default ShowListing;
