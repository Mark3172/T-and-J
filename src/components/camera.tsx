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
  const [facingMode, setFacingMode] = useState<string>("user"); // Front camera by default

  const playSound = (sound: string) => {
    new Audio(sound).play();
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      playSound(cameraClickSound);
      const imageSrc = webcamRef.current.getScreenshot();
      setPhoto(imageSrc);
    }
  };

  const resetPhoto = () => {
    setPhoto(null);
  };

  const getVideoConstraints = () => {
    if (device === "mobile") {
      return {
        width: 1920,
        height: 1080,
        facingMode: facingMode === "user" ? "user" : "environment",
      };
    }
    return {
      width: 1920,
      height: 1080,
      facingMode: "user",
    };
  };

  const flipCamera = () => {
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

  const downloadPhoto = () => {
    if (photo) {
      const link = document.createElement("a");
      link.href = photo;
      link.download = "captured_photo.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className="photo-booth-container"
      style={{ backgroundImage: `url(${tomAndJerryBG})` }}
    >
      {!device ? (
        <div className="device-selection">
          <h3>Choose Your Device:</h3>
          <button onClick={() => setDevice("mobile")} className="device-btn">
            📱 Mobile Camera
          </button>
          <button onClick={() => setDevice("laptop")} className="device-btn">
            💻 Laptop Webcam
          </button>
        </div>
      ) : (
        <>
          {!photo ? (
            <>
              <div className={`webcam-container ${filter}`}>
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  className="webcam"
                  videoConstraints={getVideoConstraints()}
                />
              </div>
              {device === "mobile" && (
                <button onClick={flipCamera} className="flip-btn">
                  🔄 Flip Camera
                </button>
              )}
              <div className="filter-options">
                {[
                  { name: "No Filter", className: "" },
                  { name: "Grayscale", className: "grayscale" },
                  { name: "Invert", className: "invert" },
                  { name: "Blur", className: "blur" },
                  { name: "Saturate", className: "saturate" },
                  { name: "Vintage", className: "vintage" },
                  { name: "Soft Glow", className: "soft-glow" },
                  { name: "Retro Vibes", className: "retro-vibes" },
                  { name: "Warm Sunset", className: "warm-sunset" },
                  { name: "Cool Blue", className: "cool-blue" },
                  { name: "Dreamy Pastel", className: "dreamy-pastel" },
                ].map((item) => (
                  <button
                    key={item.className}
                    onClick={() => setFilter(item.className)}
                    className={filter === item.className ? "active-filter" : ""}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <button onClick={capturePhoto} className="capture-btn">
                📸 Capture
              </button>
            </>
          ) : (
            <div className="photo-preview">
              <img src={photo} alt="Captured" className={`photo-frame ${filter}`} />
              <div className="photo-actions">
                <button onClick={resetPhoto} className="retake-btn">
                  🔄 Retake
                </button>
                <button onClick={downloadPhoto} className="download-btn">
                  ⬇️ Download
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhotoBooth;
