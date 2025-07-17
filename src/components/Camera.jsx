import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Camera = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/capture");
    }, 2000); // Delay before navigating to Capture

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Diamond Animation Container */}
      <div className="relative flex items-center justify-center w-40 h-40 sm:w-60 sm:h-60 animate-spin-slow">
        <div className="absolute w-full h-full border-4 transform rotate-45"></div>
        <img src="./shutter-icon.svg" alt="Shutter Icon" className="w-10 sm:w-14 z-10" />
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-sm sm:text-base font-medium text-black">SETTING UP CAMERA ...</p>

      {/* Instructional Text */}
      <div className="mt-8 text-center text-xs sm:text-sm text-black">
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

export default Camera;