import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import LogedNavbar from "../../components/navbar/LogedNavbar";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import { db, doc, getDoc } from '../../utils/firebase';

const ShowListing = () => {
  const [listing, setListing] = useState({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  
  const getListing = async () => {
    setLoading(true);
    const docRef = doc(db, "listings", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setListing(docSnap.data());
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      setError('no such document for this user');
      setLoading(false);
    }
  }

  useEffect(() => {
    getListing();
  }, [])

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
        <p>name: {listing.name}</p>
        <p>email: {listing.email}</p>
        <p>city: {listing.city}</p>
        <p>phone: {listing.phone}</p>
        <p>arriveDate: {listing.arriveDate}</p>
        <p>leavingDate: {listing.leavingDate}</p>
        <p>numOfGuests: {listing.numOfGuests}</p>
        <p>aboutYou: {listing.aboutYou}</p>
        <p>babies: {listing.babies}</p>
        <p>wifi: {listing.wifi}</p>
        <p>ac: {listing.ac}</p>
        <p>shower: {listing.shower}</p>
        <p>tv: {listing.tv}</p>
        <p>pets: {listing.pets}</p>
      

    </>)
}
 
export default ShowListing;