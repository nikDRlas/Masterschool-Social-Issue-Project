import "./App.css";

function App() {
  const image =
    "social-issue/src/builder-construction-vest-orange-helmet-standing-white-studio.jpg";
  return (
    <div className="container">
      <h1 className="text-3xl font-bold underline">Super cool awesome project - Niklas Ronnen Snir</h1>
      <img src={image} alt="Construction worker" />
      <p>Please be patient! The project is still under construction!</p>
    </div>
  );
}

export default App;
