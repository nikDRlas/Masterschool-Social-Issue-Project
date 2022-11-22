import "./App.css";
import Main from "./components/main/main";
import Navbar from "./components/Navbar";
import { db } from "./utils/firebase";

function App() {
  console.log(db);
  return (
    <>
      <Navbar />
      <div className="container">
        <Main />
      </div>
    </>
  );
}

export default App;
