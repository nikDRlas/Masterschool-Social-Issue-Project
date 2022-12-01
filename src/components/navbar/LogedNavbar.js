import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LogedNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { logout, user } = useAuth();
  const toggle = () => {
    setShowMenu(!showMenu);
  };
  const navigate = useNavigate();

  return (
    <nav className="realtive mx-auto p-6">
      <div className="flex content-center items-center justify-between">
        <div className="pt-2">
          <Link to={"/"}>
            <p className="text-3xl font-bold">
              Wegot
              <span className=" text-oliveGreen font-bold text-3xl">U</span>
            </p>
          </Link>
        </div>
        <div className="hidden pt-2 md:flex items-center justify-between gap-3 text-sm">
          <p className="hover:text-darkGrayishBlue mx-2">How does it work?</p>
          <p className="hover:text-darkGrayishBlue mx-2">About us</p>
          {/* <p >|</p> */}
          <p
            className=" mx-2 pl-6 py-2"
            style={{ borderLeftWidth: "1px" }}
          >
            Hello {user.email}, see you listing <Link to='/showlisting'><span className="hover:text-darkGrayishBlue underline">here</span></Link>
          </p>
          <button
            onClick={() => {
              logout();
              navigate('/')
            }}
            className="hover:text-darkBlue text-white mx-2 p-1 px-2 rounded-md bg-oliveGreen"
          >
            Log Out
          </button>
        </div>
        <button className="md:hidden">
          {showMenu && <MdClose onClick={toggle} />}
          {!showMenu && <FiMenu onClick={toggle} />}
        </button>
      </div>
      {/* <!-- Mobile Menu --> */}
      {showMenu && (
        <div
          id="menu"
          className="md:hidden items-center divide-y-4 flex-col flex mt-3 space-y-3 bg-white sm:w-auto sm:self-center drop-shadow-md text-xs"
        >
          <p className="hover:text-darkGrayishBlue">How does it work?</p>
          <p className="hover:text-darkGrayishBlue">About us</p>
          <Link to="/signin">
            <p className="hover:text-darkGrayishBlue">Sign In</p>
          </Link>
          <Link to="/signup">
            <p className="hover:text-darkGrayishBlue">Sign up</p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default LogedNavbar;

// const userDummy = [
//   {
//     fullName: "snir azran",
//     email: "balla@gmail.com",
//     phone: "0503943329",
//   },
// ];

// const postDummy = [
//   {
//     city: "haifa",
//     arriveDate: "15/11/2022",
//     leavingDate: "23/11/2022",
//     numOfGuests: 1,
//     aboutYou: "i am snir",
//     babies: "yes",
//     wifi: "yes",
//     ac: "no",
//     shower: "yes",
//     tv: "no",
//     pets: "no",
//   },
// ];
