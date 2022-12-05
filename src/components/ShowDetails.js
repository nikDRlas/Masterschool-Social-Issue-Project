import x from "../images/icons/x.svg";
import { useHost } from "../context/HostContext";
const ShowDetails = ({ phone, email, name }) => {
  const { showDetails, setShowDetails } = useHost();
  return (
    <>
      <div className="relative w-full allDetails"></div>
      <div className="fixed flex flex-col justify-center h-auto text-center -translate-x-1/2 -translate-y-1/2 rounded-md xsm:w-full sm:w-9/12 md:w-1/2 lg:w-2/5 xlg:w-2/5 xl:p-14 lg:p-12 md:p-10 sm:p-8 xsm:p-6 bg-darkGreen top-1/2 left-1/2 ShowDetails ">
        <img
          onClick={() => {
            setShowDetails(false);
          }}
          className="absolute w-8 h-8 cursor-pointer top-2 right-2"
          src={x}
          alt=""
        />
        <div className=" text">
          <h1 className="text-3xl font-bold text-white">
            {name} contact details
          </h1>
          <div className="mt-6 details">
            <p className="text-2xl font-medium text-white">
              You can contact {name} via:
            </p>
            <h2 className="mt-4 text-xl text-white">Phone number: {phone}</h2>
            <h2 className="mt-2 text-xl text-white">Email Adress: {email}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowDetails;
