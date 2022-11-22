import "./App.css";
import Main from "./components/main/main";
import Navbar from "./components/Navbar";

function App() {
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
