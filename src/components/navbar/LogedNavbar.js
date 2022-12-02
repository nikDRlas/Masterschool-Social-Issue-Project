import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LogedNavbar = ({ scrollToSection }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { logout, user } = useAuth();
  const toggle = () => {
    setShowMenu(!showMenu);
  };
  const navigate = useNavigate();

  return (
    <nav className="p-6 mx-auto realtive">
      <div className="flex items-center content-center justify-between">
        <div className="pt-2">
          <Link to={"/"}>
            <p className="text-3xl font-bold">
              Wegot
              <span className="text-3xl font-bold text-oliveGreen">U</span>
            </p>
          </Link>
        </div>
        <div className="items-center justify-between hidden gap-3 pt-2 text-sm md:flex">
          <p
            onClick={() => scrollToSection("how-it-works")}
            className="mx-2 cursor-pointer hover:text-darkGrayishBlue"
          >
            How does it work?
          </p>
          <p
            onClick={() => scrollToSection("about")}
            className="mx-2 cursor-pointer hover:text-darkGrayishBlue"
          >
            About us
          </p>
          {/* <p >|</p> */}
          <p className="py-2 pl-6 mx-2 " style={{ borderLeftWidth: "1px" }}>
            Hello {user.email}, see your listing{" "}
            <Link to="/showlisting">
              <span className="underline hover:text-darkGrayishBlue">here</span>
            </Link>
          </p>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="p-1 px-2 mx-2 text-white rounded-md hover:text-darkBlue bg-oliveGreen"
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
          className="flex flex-col items-center mt-3 space-y-3 text-xs bg-white divide-y-4 md:hidden sm:w-auto sm:self-center drop-shadow-md"
        >
          <p
            onClick={() => scrollToSection("how-it-works")}
            className="cursor-pointer hover:text-darkGrayishBlue"
          >
            How does it work?
          </p>
          <p
            onClick={() => scrollToSection("about")}
            className="cursor-pointer hover:text-darkGrayishBlue"
          >
            About us
          </p>
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
