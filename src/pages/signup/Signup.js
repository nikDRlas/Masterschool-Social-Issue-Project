import "../../App.css";
import Navbar from "../../components/Navbar";

function Signup() {
  return (
    <>
      <Navbar />
      <h1 className="text-4xl b">
        Hello<span>!</span>
      </h1>
      <p>Create a free account with your email.</p>
      <form>
        <input type="text" />
        <input type="email" />
        <input type="number" />
        <input type="password" />
      </form>
      <button>Create your free account</button>
      <p>
        already have an account? <span>Sign in</span>
      </p>
    </>
  );
}

export default Signup;
