import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogedNavbar from "../../components/navbar/LogedNavbar";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login({ email, password });
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
      <div className="text-6xl text-center mt-60">
        Loading<span className="text-darkGreen">...</span>
      </div>
    );
  if (error) return <div className="text-4xl text-center mt-60">{error}</div>;

  return (
    <>
      {user ? <LogedNavbar /> : <Navbar />}
      {!user ? (
        <>
          <div className="mt-12 text-center top-text">
            <h1 className="font-medium text-7xl">
              Welcome Back<span className="text-darkGreen">!</span>
            </h1>
            <p className="mt-10 text-lightGray ">
              {"Stay safe and protected :)"}
            </p>
          </div>
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center w-auto mx-auto my-4 sm:w-96 "
          >
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="p-3 m-4 border rounded-lg border-veryLightGray lg:w-96 sm:w-80 xsm:w-72"
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="p-3 m-4 border rounded-lg border-veryLightGray lg:w-96 sm:w-80 xsm:w-72"
              type="password"
              placeholder="Password"
            />
            <button className="px-3 py-4 m-4 text-white rounded-lg bg-darkGreen lg:w-96 sm:w-80 xsm:w-72 ">
              Login
            </button>
          </form>
          <div className="pb-12 text-center bottom-text ">
            <p className="text-lightGray ">
              {"Don’t have an account?"}{" "}
              <Link className="text-darkGreen" to="/signup">
                Sign up
              </Link>
            </p>
          </div>{" "}
        </>
      ) : (
        <div className="mt-12 text-center top-text">
          <h1 className="font-medium text-7xl">
            Already signed in<span className="text-darkGreen">!</span>
          </h1>
          <div className="pb-12 text-center bottom-text ">
            <p className="mt-5 text-lightGray ">
              {"would you like to post a listing?"}{" "}
              <Link className="text-darkGreen" to="/addlisting">
                Add
              </Link>
            </p>
          </div>
        </div>
      )}
      {/* <div className="circle-one"></div>
        <div className="circle-two"></div>
        <div className="circle-three"></div>
        <div className="circle-four"></div> */}
    </>
  );
}

export default Signin;
