import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogedNavbar from "../../components/navbar/LogedNavbar";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import { db, doc, setDoc, serverTimestamp } from '../../utils/firebase';

const AddListing = () => {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();
    const dummyData = [
      {
        name: "snir azran",
        email: "balla@gmail.com",
        phone: "0503943329",
        city: "haifa",
        arriveDate: "15/11/2022",
        leavingDate: "23/11/2022",
        numOfGuests: 1,
        aboutYou: "i am snir",
        babies: "yes",
        wifi: "yes",
        ac: "no",
        shower: "yes",
        tv: "no",
        pets: "no",
      },
    ];

    const { phone, arriveDate, leavingDate, numOfGuests, aboutYou, babies, wifi, ac, shower, tv, pets } = dummyData[0];

    
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          await setDoc(doc(db, "listings", user.uid), {
            name,
            email: user.email,
            city,
            phone,
            arriveDate,
            leavingDate,
            numOfGuests,
            aboutYou,
            babies,
            wifi,
            ac,
            shower,
            tv,
            pets,
            timeStamp: serverTimestamp(),
          })
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
          <div className="top-text text-center mt-12">
            <h1 className="font-medium text-4xl md:text-6xl">
              Thank You For Choosing to Host<span className="text-darkGreen">!</span>
            </h1>
          </div>
          <form
            onSubmit={handleAdd}
            className="flex flex-col items-center  mx-auto my-4 w-auto sm:w-96">
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="m-4 border border-veryLightGray p-3 rounded-lg lg:w-96 sm:w-80 xsm:w-72"
              type="text"
              placeholder="Full Name"
            />

            <input
              onChange={(e) => {
                setCity(e.target.value);
              }}
              className="m-4 border border-veryLightGray p-3 rounded-lg lg:w-96 sm:w-80 xsm:w-72"
              type="text"
              placeholder="City"
            />  
            
            <button className="m-4 bg-darkGreen text-white py-4 px-3 rounded-lg lg:w-96 sm:w-80 xsm:w-72 ">
              Add
            </button>
          </form>
          
        </>
      );
}
 
export default AddListing;


