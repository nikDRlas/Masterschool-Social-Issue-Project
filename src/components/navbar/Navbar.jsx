import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = ({scrollToSection}) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="p-6 mx-auto realtive">
      <div className="flex items-center content-center justify-between ">
        <div className="pt-2">
          <Link to={"/"}>
            <p className="text-3xl font-bold">
              Wegot
              <span className="text-3xl font-bold text-oliveGreen">U</span>
            </p>
          </Link>
        </div>
        <div className="items-center justify-between hidden gap-3 pt-2 text-sm md:flex">
          <p onClick={() => scrollToSection('how-it-works')} className="mx-2 hover:text-darkGrayishBlue">How does it work?</p>
          <p onClick={() => scrollToSection('about')} className="mx-2 hover:text-darkGrayishBlue">About us</p>
          <Link to="/signin">
            <p
              className="py-2 pl-6 mx-2 hover:text-darkGrayishBlue"
              style={{ borderLeftWidth: "1px" }}
            >
              Sign in
            </p>
          </Link>
          <Link to="/signup">
            <button className="p-1 px-2 mx-2 text-white rounded-md hover:text-darkBlue bg-oliveGreen">
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
          className="flex flex-col items-center mt-3 space-y-3 text-xs bg-white divide-y-4 md:hidden sm:w-auto sm:self-center drop-shadow-md"
        >
          <p onClick={() => scrollToSection('how-it-works')} className="hover:text-darkGrayishBlue">How does it work?</p>
          <p onClick={() => scrollToSection('about')} className="hover:text-darkGrayishBlue">About us</p>
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
