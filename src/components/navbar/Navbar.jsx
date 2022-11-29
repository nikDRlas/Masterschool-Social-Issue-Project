import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggle = () => {
    setShowMenu(!showMenu);
  };

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
          <Link to="/signin">
            <p
              className="hover:text-darkGrayishBlue mx-2 pl-6 py-2"
              style={{ borderLeftWidth: "1px" }}
            >
              Sign in
            </p>
          </Link>
          <Link to="/signup">
            <button className="mx-2 hover:text-darkBlue text-white p-1 px-2 rounded-md bg-oliveGreen">
              Sign up
            </button>
          </Link>
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

export default Navbar;
