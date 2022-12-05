import { useState, useContext, createContext } from "react";

export const HostContext = createContext();

const useHost = () => {
  return useContext(HostContext);
};

export const HostProvider = ({ children }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Haifa");
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const [guestNum, setGuestNum] = useState("");
  const [aboutU, setAboutU] = useState("");
  const [baby, setBaby] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [ac, setAc] = useState(false);
  const [shower, setShower] = useState(false);
  const [tv, setTv] = useState(false);
  const [pets, setPets] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const exports = {
    showDetails,
    setShowDetails,
    fullName,
    setFullName,
    phone,
    setPhone,
    city,
    setCity,
    from,
    setFrom,
    until,
    setUntil,
    guestNum,
    setGuestNum,
    aboutU,
    setAboutU,
    baby,
    setBaby,
    wifi,
    setWifi,
    ac,
    setAc,
    shower,
    setShower,
    tv,
    setTv,
    pets,
    setPets,
  };
  return (
    <HostContext.Provider value={exports}>{children}</HostContext.Provider>
  );
};
export default HostProvider;
export { useHost };
