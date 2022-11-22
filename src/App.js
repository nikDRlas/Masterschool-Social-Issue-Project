import "./App.css";
import Main from "./components/main/main";
import Navbar from './components/Navbar';
// import { db } from './utils/firebase'


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
