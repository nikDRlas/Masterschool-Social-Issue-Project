import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const { register } = useAuth();

  return (
    <>
      <Navbar />
      <Link to="/">
        <h1>homepage</h1>
      </Link>
      <div className="top-text text-center">
        <h1 className="font-medium text-7xl">
          Hello<span className="text-darkGreen">!</span>
        </h1>
        <p className="text-lightGray mt-10 ">
          Create a free account with your email.
        </p>
      </div>
      <form className="flex flex-col w-96 items-center  mx-auto my-4">
        <input
          className="w-96 m-4 border border-veryLightGray p-3 rounded-lg"
          type="text"
          placeholder="Full Name"
        />
        <input
          className="w-96 m-4 border border-veryLightGray p-3 rounded-lg"
          type="email"
          placeholder="Email"
        />
        <input
          className="w-96 m-4 border border-veryLightGray p-3 rounded-lg"
          type="tel"
          placeholder="Phone Number"
        />
        <input
          className="w-96 m-4 border border-veryLightGray p-3 rounded-lg"
          type="password"
          placeholder="Password"
        />
        <button className="w-96 m-4 bg-darkGreen text-white py-4 px-3 rounded-lg">
          Create your free account
        </button>
      </form>
      <div className="bottom-text text-center">
        <p className="text-lightGray">
          Already has an account?{" "}
          <Link className="text-darkGreen" to="/login">
            login
          </Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
