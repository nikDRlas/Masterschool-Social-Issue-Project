import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";


function Signup() {
  const { register } = useAuth();


  return (
    <>

      <Navbar />
      <Link to='/'>
        <h1>homepage</h1>
      </Link>
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
        Already has an account? <Link to='/login'>login</Link>
      </p>
    </>
  );
}

export default Signup;
