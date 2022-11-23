import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
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
      <div className="text-center mt-60 text-6xl">
        Loading<span className="text-darkGreen">...</span>
      </div>
    );
  if (error) return <div className="text-center mt-60 text-4xl">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="top-text text-center mt-12">
        <h1 className="font-medium text-7xl">
          Welcome Back<span className="text-darkGreen">!</span>
        </h1>
        <p className="text-lightGray mt-10 ">{"Stay safe and protected :)"}</p>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center  mx-auto my-4 w-96 sm:w-96 xsm:w-auto"
      >
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
            setPassword(e.target.value);
          }}
          className="m-4 border border-veryLightGray p-3 rounded-lg lg:w-96 sm:w-80 xsm:w-72"
          type="password"
          placeholder="Password"
        />
        <button className="m-4 bg-darkGreen text-white py-4 px-3 rounded-lg lg:w-96 sm:w-80 xsm:w-72 ">
          Login
        </button>
      </form>
      <div className="bottom-text text-center pb-12 ">
        <p className="text-lightGray ">
          {"Don’t have an account?"}{" "}
          <Link className="text-darkGreen" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}

export default Signin;
