import React from "react";
import Camera from "./components/camera.tsx";
import tomAndJerryBG from "./assets/tom-jerry-bg.jpg"; // Tom & Jerry background
import "./App.css"; // Import styles

const App: React.FC = () => {
  return (
    <div className="app-container" style={{ backgroundImage: `url(${tomAndJerryBG})` }}>
      <h1 className="app-title">🐱🎭 Tom & Jerry Family Photo Booth 🎬🐭</h1>
      <Camera />
    </div>
  );
};

export default App;
