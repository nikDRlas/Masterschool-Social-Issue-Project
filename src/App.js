import "./App.css";
import Navbar from './components/Navbar';

function App() {
  const image =
    "https://img.freepik.com/free-photo/builder-construction-vest-orange-helmet-standing-white-studio-wall_155003-35473.jpg?w=2000";
  return (
    <>
      <Navbar />
      <div className="items-center mx-auto p-6">
        <h1 className="text-xl font-bold underline content-center">Super cool awesome project - Niklas Ronnen Snir</h1>
        <img style={{height: 200}} src={image} alt="Construction worker" />
        <p>Please be patient! The project is still under construction!</p>
      </div>
    </>
  );
}

export default App;
