import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import LogedNavbar from "../../components/navbar/LogedNavbar";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register({ email, password });
      setLoading(false);
      navigate("/");
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
        <h1 className="font-medium text-7xl">
          Hello<span className="text-darkGreen">!</span>
        </h1>
        <p className="text-lightGray mt-10 ">
          Create a free account with your email.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center  mx-auto my-4 w-auto sm:w-96 "
      >
        <input
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          className="m-4 border border-veryLightGray p-3 rounded-lg lg:w-96 sm:w-80 xsm:w-72 "
          type="text"
          placeholder="Full Name"
        />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="m-4 border border-veryLightGray p-3 rounded-lg lg:w-96 sm:w-80 xsm:w-72"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          className="m-4 border border-veryLightGray p-3 rounded-lg lg:w-96 sm:w-80 xsm:w-72"
          type="tel"
          placeholder="Phone Number"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="m-4 border border-veryLightGray p-3 rounded-lg lg:w-96 sm:w-80 xsm:w-72"
          type="password"
          placeholder="Password"
        />
        <button className="m-4 bg-darkGreen text-white py-4 px-3 rounded-lg lg:w-96 sm:w-80 xsm:w-72 ">
          Create your free account
        </button>
      </form>
      <div className="bottom-text text-center pb-12 ">
        <p className="text-lightGray ">
          Already has an account?{" "}
          <Link className="text-darkGreen" to="/signin">
            login
          </Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
