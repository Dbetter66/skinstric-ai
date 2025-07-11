import React, { useState, useEffect } from "react";

function Testing() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [apiData, setApiData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setApiData(JSON.parse(storedData));
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
    setIsLoading(true);
    setError(null);

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
      const data = await response.json();
      setApiData(data);
      nextStep(); // Move to the confirmation step on successful submission
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to submit data. Please try again.");
    } finally {
      setIsLoading(false);
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

  const handleProceedToImport = () => {
    // Here you would implement the logic to proceed with the import
    console.log("Proceeding to import...");
    // For example, navigate to a new page or trigger another API call
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
      <div className="absolute top-16 left-9 text-left">
        <p className="font-semibold text-xs">TO START ANALYSIS</p>
      </div>
      <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
        <p className="text-sm text-gray-400 tracking-wider uppercase mb-1"> CLICK TO TYPE </p>
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
            <button type="submit"></button>
          </form>
        )}

        {currentStep === 3 && ( // New step for confirmation
          <div className="relative z-10">
            <p className="text-3xl sm:text-4xl font-normal text-center tracking-[-0.07em] leading-[64px] text-[#1A1B1C] mb-4">
              Submission Successful!
            </p>
            {apiData && (
              <p className="text-lg text-gray-700 mb-6">
                Thank you, {apiData.name || "user"}. Your data has been recorded.
              </p>
            )}
            <button
              onClick={handleProceedToImport}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Proceed to Import
            </button>
            <button type="button" onClick={prevStep}></button>
          </div>
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
