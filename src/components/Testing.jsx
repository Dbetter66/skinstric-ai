import React, { useState, useEffect } from "react";
import axios from 'axios';

function Testing() { // Removed 'data' prop as it wasn't being used within the component
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [apiData, setApiData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // New state for loading status
  const [error, setError] = useState(null); // New state for API errors

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setApiData(JSON.parse(storedData));
      // Optionally, you might want to pre-fill the name/location if available in storedData
      const parsedData = JSON.parse(storedData);
      if (parsedData.name) setName(parsedData.name);
      if (parsedData.location) setLocation(parsedData.location);
    }
  }, []);

  // Save data to localStorage when apiData changes
  useEffect(() => {
    if (apiData) {
      localStorage.setItem("userData", JSON.stringify(apiData));
    }
  }, [apiData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      const response = await fetch(
        `https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, location }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the response data
      setApiData(data);
      nextStep(); // Move to the next step on successful submission
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to submit data. Please try again."); // Set an error message
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
      <div className="absolute top-16 left-9 text-left">
        <p className="font-semibold text-xs">TO START ANALYSIS</p>
      </div>
      <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
        <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
          CLICK TO TYPE
        </p>

        {isLoading && <p>Submitting...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {currentStep === 1 && (
          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="flex flex-col items-center"></div>
            <input
              className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
              placeholder="Introduce Yourself"
              autoComplete="off"
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            ></input>
            <button type="submit" className="sr-only">
              Submit
            </button>
            {/* You might want a visible button to proceed to the next step, or trigger nextStep on input blur */}
            <button type="button" onClick={nextStep}></button>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="flex flex-col items-center"></div>
            <input
              className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
              placeholder="your city name"
              autoComplete="off"
              type="text"
              value={location}
              onChange={handleLocationChange}
            ></input>
            <button type="submit" className="sr-only">
              Submit
            </button>
            <button type="button" onClick={prevStep}></button>
            <button type="submit">Submit</button>
          </form>
        )}
        <img
          alt="largediamond"
          loading="lazy"
          width="762"
          height="762"
          decoding="async"
          data-nimg="1"
          className="absolute w-[480px] h-[480px] md:w-[762px] md:h-[762px] animate-spin-slow [animation-duration:50s] rotate-190"
          src="./largediamond.svg"
        ></img>
        <img
          alt="mediumdiamon"
          loading="lazy"
          width="682"
          height="682"
          decoding="async"
          data-nimg="1"
          className="absolute w-[400px] h-[400px] md:w-[682px] md:h-[682px] animate-spin-slower [animation-duration:70s] rotate-185"
          src="./mediumdiamond.svg"
        ></img>
        <img
          alt="smalldiamond"
          loading="lazy"
          width="602"
          height="602"
          decoding="async"
          data-nimg="1"
          className="absolute w-[320px] h-[320px] md:w-[602px] md:h-[602px] animate-spin-slowest [animation-duration:85s]"
          src="./smalldiamond.svg"
        ></img>
      </div>
      <div className="bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13 sm:bottom-10">
        <a className="inset-0" aria-label="Back" href="/">
          <div>
            <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
              <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                BACK
              </span>
            </div>
            <div className="group hidden sm:flex flex-row relative justify-center items-center">
              <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
              <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                ▶
              </span>
              <span className="text-sm font-semibold hidden sm:block ml-6 ">
                BACK
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Testing;
