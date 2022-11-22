import Button from "../buttons/button";
import "./main.css";
import Navbar from "../Navbar";

const Main = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="image-container">
          <div className="text-container">
            <span className="main-text">
              find or give a place of comfort in tough times.
            </span>
            <span className="sec-text">I would like to</span>
          </div>
          <div className="button-container">
            <Button butname="Host" />
            <Button butname="Be hosted" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
