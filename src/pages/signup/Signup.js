import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import LogedNavbar from "../../components/navbar/LogedNavbar";
import { useAuth } from "../../context/AuthContext";
import { useHost } from "../../context/HostContext";
function Signup() {
  const { fullName, setFullName, phone, setPhone } = useHost();
  const [email, setEmail] = useState("");
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
      setPhone(phone);
      setFullName(fullName);
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

      <div className="mt-12 text-center top-text">
        <h1 className="font-medium text-7xl">
          Hello<span className="text-darkGreen">!</span>
        </h1>
        <p className="mt-10 text-lightGray ">
          Create a free account with your email.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center w-auto mx-auto my-4 sm:w-96 "
      >
        <input
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            console.log(fullName);
          }}
          className="p-3 m-4 border rounded-lg border-veryLightGray lg:w-96 sm:w-80 xsm:w-72 "
          type="text"
          placeholder="Full Name"
        />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="p-3 m-4 border rounded-lg border-veryLightGray lg:w-96 sm:w-80 xsm:w-72"
          type="email"
          placeholder="Email"
        />
        <input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          className="p-3 m-4 border rounded-lg border-veryLightGray lg:w-96 sm:w-80 xsm:w-72"
          type="phone"
          placeholder="Phone Number"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="p-3 m-4 border rounded-lg border-veryLightGray lg:w-96 sm:w-80 xsm:w-72"
          type="password"
          placeholder="Password"
        />
        <button className="px-3 py-4 m-4 text-white duration-200 ease-in rounded-lg hover:bg-oliveGreen bg-darkGreen lg:w-96 sm:w-80 xsm:w-72 ">
          Create your free account
        </button>
      </form>
      <div className="pb-12 text-center bottom-text ">
        <p className="text-lightGray ">
          Already has an account?{" "}
          <Link className="text-darkGreen hover:text-oliveGreen" to="/signin">
            login
          </Link>
        </p>
      </div>
      {/* <div className="circle-one"></div>
        <div className="circle-two"></div>
        <div className="circle-three"></div>
        <div className="circle-four"></div> */}
    </>
  );
}

export default Signup;
