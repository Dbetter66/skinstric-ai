import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const Capture = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const videoConstraints = {
    facingMode: "user",
    width: { ideal: 1280 },
    height: { ideal: 720 },
  };

  const takePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    sendToApi(imageSrc);
  };

  const sendToApi = async (imageSrc) => {
    setIsLoading(true);
    setShowOptions(false);
    try {
      const base64Data = imageSrc.split(",")[1];
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Data }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setApiResponse(data);
      setShowOptions(true);
    } catch (error) {
      alert("Error sending image to API: " + error.message);
      setCapturedImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setShowOptions(false);
    setApiResponse(null);
  };

  const proceed = () => {
    navigate("/select", { state: { image: capturedImage, apiResponse } });
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-black px-4">
      {/* Main content flex container */}
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch flex-grow w-full max-w-7xl">
        {/* Camera / Image preview */}
        <div className="flex-grow w-full h-[60vh] lg:h-[80vh]">
          {!capturedImage ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <img
              src={capturedImage}
              alt="Captured"
              className="object-cover w-full h-full rounded-lg"
            />
          )}
        </div>

        {/* Button area */}
        <div className="mt-6 lg:mt-0 lg:ml-8 flex flex-col items-center lg:items-center justify-center lg:w-32">
          {isLoading && (
            <p className="text-white mb-4 text-center">Sending photo to API...</p>
          )}

          {!capturedImage && !isLoading && (
            <button
              onClick={takePhoto}
              aria-label="Capture photo"
            >
              <img
                src="take-pic.svg"
                alt="Capture icon"
              />
            </button>
          )}

          {showOptions && (
            <div className="flex flex-col gap-4 lg:gap-6">
              <button
                onClick={retakePhoto}
                className="px-6 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition text-center"
              >
                Retake
              </button>
              <button
                onClick={proceed}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-center"
              >
                Use Photo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Instructional Text */}
      <div className="mt-8 text-center text-xs sm:text-sm text-white px-4 max-w-4xl">
        <p className="font-medium">TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
        <div className="flex justify-center flex-wrap gap-4 mt-2">
          <span>◈ NEUTRAL EXPRESSION</span>
          <span>◈ FRONTAL POSE</span>
          <span>◈ ADEQUATE LIGHTING</span>
        </div>
      </div>
    </div>
  );
};

export default Capture;

