import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Result() {
  const fileInputRef = useRef(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [showNextStepOption, setShowNextStepOption] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate(); //

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64_encoded_string = e.target.result.split(",")[1]; // Extract Base64 part
        console.log("Base64 String:", base64_encoded_string); // Log the Base64 string
        sendBase64ToApi(base64_encoded_string);
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(file); // Read the file as a data URL (Base64)
    }
  };

  const sendBase64ToApi = async (base64_encoded_string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          // Replace with your API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64_encoded_string }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(
        "API response: `{SUCCESS: You hit the Level 2 API. Image is a valid Base64 String.}`",
        data
      );
      setApiResponse(data);
      setShowNextStepOption(true);
    } catch (error) {
      console.error("Error sending Base64 to API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToNextStep = () => {
    navigate("/select"); // Navigate to the Select component's path.
  };

  return (
    <div className="min-h-[80vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
      <div className="absolute top-2 left-9 md:left-8 text-left">
        <div className="flex flex-col bg-white relative md:pt-[64px] justify-center">
          <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
        </div>
      </div>
      <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
        <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>

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
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                alt="shutter-icon"
                loading="lazy"
                width="136"
                height="136"
                decoding="async"
                data-nimg="1"
                className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] transform transition-transform duration-300 hover:scale-110 ease-in-out cursor-pointer"
                src="./shutter-icon.svg"
              ></img>
              <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]">
                <p className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
                  ALLOW A.I
                  <br />
                  TO SCAN YOUR FACE
                </p>
                <img
                  alt="Scan Line"
                  loading="lazy"
                  width="66"
                  height="59"
                  decoding="async"
                  data-nimg="1"
                  className="absolute hidden md:block md:right-[143px] md:top-[20px]"
                  src="./scanline.svg"
                ></img>
              </div>
            </div>
          </div>
        </div>

        <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
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
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button onClick={handleButtonClick}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }} // Hide the default file input
                  multiple // Allow selecting multiple files (optional)
                  // accept=".pdf, .doc, .docx" // Restrict file types (optional)
                />
                <img
                  alt="Photo Upload Icon"
                  loading="lazy"
                  width="136"
                  decoding="async"
                  data-nimg="1"
                  className="w-[100px] h-[100px] md:w-[136px] md:h-[136px]  transform transition-transform duration-300 hover:scale-110 ease-in-out cursor-pointer"
                  src="./photoupload.svg"
                ></img>
                <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px]">
                  <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
                    ALLOW A.I. <br />
                    ACCESS GALLERY
                  </p>

                  <img
                    alt="Scan Line"
                    loading="lazy"
                    width="66"
                    height="59"
                    decoding="async"
                    data-nimg="1"
                    className="absolute hidden md:block md:left-[120px] md:bottom-[39px]"
                    src="./ailine.svg"
                  ></img>
                </div>
              </button>
            </div>{" "}
          </div>
        </div>
        <div className="absolute top-[-6px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100">
          <h1 className="text-xs md:text-sm font-normal mb-1">PREVIEW</h1>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              style={{ maxWidth: "200px", maxHeight: "200px" }} // Optional: Style the image
            />
          )}
        </div>
        <input accept="image/*" className="hidden" type="file"></input>
      </div>
      <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0">
        <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
          <div className="bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13 sm:bottom-10">
            <a className="inset-0" aria-label="Back" href="/testing">
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
            {showNextStepOption && (
              <a className="inline-block" href="/select">
                <div className=" w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                    PROCEED
                  </span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <span className="text-sm font-semibold hidden sm:block mr-5">
                    PROCEED
                  </span>
                  <div className=" w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                  <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300">
                    ▶
                  </span>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
