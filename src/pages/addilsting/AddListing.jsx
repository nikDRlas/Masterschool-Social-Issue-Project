import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogedNavbar from "../../components/navbar/LogedNavbar";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import "../addilsting/addListing.css";
import { db, doc, setDoc, serverTimestamp } from "../../utils/firebase";

const AddListing = () => {
  const [name, setName] = useState("Snir Azran");
  const [city, setCity] = useState("Haifa");
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
      aboutYou: "Hello I'm Niklas from Haifa and I'd love to host you in my two story appartment, I love dogs and cook great pasta",
      babies: "yes",
      wifi: "yes",
      ac: "no",
      shower: "yes",
      tv: "no",
      pets: "no",
    },
  ];

  const {
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
  } = dummyData[0];

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
      <div className="find-host-container">
        <div className="find-host-text-container">
          <div className="find-host-header-container">
            <h1 className="find-host-header">
              Let's find you the perfect home{" "}
              <span className="h1-exclamationmark">!</span>
            </h1>
          </div>
          <div className="find-host-paragraph">
            <p>Please fill in all the details below to help </p>
            <p>us match you with the perfect host.</p>
          </div>
        </div>
        <div className="card-container">
          <div className="location-card-container">
            <div className="location-card-text">
              <h3>My preferred location is..</h3>
            </div>
            <div className="location-map inner-card-container-location"></div>
            <div className="location-form">
              <form>
                <input
                  type="text"
                  className="city-selector"
                  placeholder="Your destination"
                />
              </form>
            </div>
          </div>
          <div className="date-card-container">
            <div className="date-card-text">
              <h3>I want to stay...</h3>
            </div>
            <div className="date-form inner-card-container-date-benefits">
              <form className="form">
                <div className="from">
                  <label className="label">From</label>
                  <input type="date" value="2017-06-01" name="" id="" />
                </div>
                <div className="until">
                  <label className="label">Until</label>
                  <input type="date" value="2017-06-03" name="" id="" />
                </div>
                <div className="guests">
                  <label className="label">Number of guests</label>
                  <input
                    type="number"
                    placeholder="How many are you?"
                    className="guests-count"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="benefit-card-container">
            <div className="benefit-card-text">
              <h3>It's important for me to have..</h3>
            </div>
            <div className="benefits-form inner-card-container-date-benefits">
              <button className="button-baby">
                <div className="image-baby image"></div>
                <p className="p-benefits">Can host babys</p>
              </button>
              <button className="button-wifi">
                <div className="image-wifi image"></div>
                <p className="p-benefits">Wifi</p>
              </button>
              <button className="button-air">
                <div className="image-air image"></div>
                <p className="p-benefits">Air conditioning</p>
              </button>
              <button className="button-shower">
                <div className="image-shower image"></div>
                <p className="p-benefits">Shower</p>
              </button>
              <button className="button-tv">
                <div className="image-tv image"></div>
                <p className="p-benefits">TV</p>
              </button>
              <button className="button-pets">
                <div className="image-pets image"></div>
                <p className="p-benefits">Pets friendly</p>
              </button>
            </div>
          </div>
        </div>
        <div className="submit-button-container">
          <button onClick={handleAdd} className="continue-button">Continue</button>
        </div>
        <div className="circle-one"></div>
        <div className="circle-two"></div>
        <div className="circle-three"></div>
        <div className="circle-four"></div>
      </div>
    </>
  );
};

export default AddListing;
