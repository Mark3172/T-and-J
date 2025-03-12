import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import cameraClickSound from "../assets/cameraclick.mp3"; // Camera sound
import tomAndJerryBG from "../assets/tj.jpg"; // Tom & Jerry background
import "../camera.css"; // Import styles

const PhotoBooth: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>(""); // Store selected filter
  const [device, setDevice] = useState<string | null>(null); // Laptop or Mobile

  const playSound = (sound: string) => {
    new Audio(sound).play();
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      playSound(cameraClickSound); // Play camera click sound only
      const imageSrc = webcamRef.current.getScreenshot();
      setPhoto(imageSrc);
    }
  };

  const resetPhoto = () => {
    setPhoto(null);
  };

  const getVideoConstraints = () => {
    return device === "mobile"
      ? { facingMode: "environment" } // 📱 Mobile: Uses Back Camera
      : { facingMode: "user" }; // 💻 Laptop: Uses Front Camera
  };

  return (
    <div className="photo-booth-container" style={{ backgroundImage: `url(${tomAndJerryBG})` }}>
      <h2 className="title">🐱🎬 Tom & Jerry Photo Booth 🎭🐭</h2>

      {!device ? (
        <div className="device-selection">
          <h3>Choose Your Device:</h3>
          <button onClick={() => setDevice("mobile")} className="device-btn">📱 Mobile Camera</button>
          <button onClick={() => setDevice("laptop")} className="device-btn">💻 Laptop Webcam</button>
        </div>
      ) : (
        <>
          {!photo ? (
            <>
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/png"
                className={`webcam ${filter}`}
                videoConstraints={getVideoConstraints()}
              />
              <div className="filter-options">
                <button onClick={() => setFilter("")}>No Filter</button>
                <button onClick={() => setFilter("cartoon")}>Cartoonify</button>
                <button onClick={() => setFilter("cheese-glow")}>🧀 Cheese Glow</button>
                <button onClick={() => setFilter("sepia")}>Old Cartoon</button>
                <button onClick={() => setFilter("contrast")}>High Contrast</button>
              </div>
              <button onClick={capturePhoto} className="capture-btn">📸 Capture</button>
            </>
          ) : (
            <div className="photo-preview">
              <img src={photo} alt="Captured" className={`photo-frame ${filter}`} />
              <button onClick={resetPhoto} className="retake-btn">🔄 Retake</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhotoBooth;
