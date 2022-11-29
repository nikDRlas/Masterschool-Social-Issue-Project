import { Link } from "react-router-dom";

export function Logo({}) {
  return <div className="pt-2">
          <Link to={"/"}>
            <p className="text-2xl font-bold">
              Wegot
              <span className=" text-oliveGreen font-bold text-2xl">U</span>
            </p>
          </Link>
        </div>;
}