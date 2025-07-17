import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Summary() {
  const { id } = useParams(); // assuming this is base64 image string
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedRace, setSelectedRace] = useState(null);



  // Get top prediction label & confidence from an object like race, age, or gender
  const getTopPrediction = (obj) => {
    if (!obj) return { label: "", confidence: 0 };
    const [label, confidence] = Object.entries(obj).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ["", 0]
    );
    return {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      confidence,
      confidencePercent: Math.round(confidence * 100),
    };
  };

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const res = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: id }),
          }
        );
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        if (!json.data) throw new Error("No data returned");
        setData(json.data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!data) return <div className="p-4">Loading A.I. analysis...</div>;

  const topRace = getTopPrediction(data.race);
  const topAge = getTopPrediction(data.age);
  const topGender = getTopPrediction(data.gender);

  // For circular progress bar: calculate strokeDashoffset based on confidence
  // Total circumference from SVG path is 308.819
  const circumference = 308.819;
  const displayedRaceLabel = selectedRace || topRace.label;
  const displayedRaceKey = displayedRaceLabel.toLowerCase();
  const displayedRaceConfidence = data.race[displayedRaceKey] ?? 0;
  const displayedConfidencePercent = Math.round(displayedRaceConfidence * 100);
  const displayedOffset = circumference - circumference * displayedRaceConfidence;

  return (
    <main className="flex-1 w-full bg-white md:overflow-hidden overflow-auto">
      <div className="h-screen md:h-[90vh] flex flex-col md:mt-5">
        <div className="md:h-full max-w-full mx-5 px-4 md:px-auto flex flex-col">
          <div className="text-start ml-4 mb-4 md:mb-10 md:ml-0">
            <h2 className="text-base md:text-base font-semibold mb-1 leading-[24px]">
              A.I. ANALYSIS
            </h2>
            <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">
              DEMOGRAPHICS
            </h3>
            <h4 className="text-sm mt-2 leading-[24px]">PREDICTED RACE & AGE</h4>
          </div>

          <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
            {/* Left Panel: Race, Age, Sex */}
            <div className="bg-white-100 space-y-3 md:flex md:flex-col h-[62%]">
              <div className="p-3 cursor-pointer  bg-[#1A1B1C] text-white hover:bg-black flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t">
                <p className="text-base font-semibold">{topRace.label} ({topRace.confidencePercent}%)</p>
                <h4 className="text-base font-semibold mb-1">RACE</h4>
              </div>
              <div className="p-3 cursor-pointer  bg-[#F3F3F4] flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t">
                <p className="text-base font-semibold">{topAge.label} ({topAge.confidencePercent}%)</p>
                <h4 className="text-base font-semibold mb-1">AGE</h4>
              </div>
              <div className="p-3 cursor-pointer  bg-[#F3F3F4] flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t">
                <p className="text-base font-semibold">{topGender.label} ({topGender.confidencePercent}%)</p>
                <h4 className="text-base font-semibold mb-1">SEX</h4>
              </div>
            </div>

            {/* Middle Panel: Circular progress and top race label */}
            <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t">
              <p className="hidden md:block md:absolute text-[40px] mb-2 left-5 top-2 capitalize">
              {displayedRaceLabel}
              </p>
              <div className="relative md:absolute w-full max-w-[384px] aspect-square mb-4 md:right-5 md:bottom-2">
                <svg
                  className="CircularProgressbar text-[#1A1B1C]"
                  viewBox="0 0 100 100"
                >
                  <path
                    className="CircularProgressbar-trail"
                    d="
                              M 50,50
                          m 0,-49.15
                          a 49.15,49.15 0 1 1 0,98.3
                          a 49.15,49.15 0 1 1 0,-98.3
                          "
                    strokeWidth="1.7"
                    fillOpacity="0"
                    style={{
                      strokeLinecap: "butt",
                      strokeDasharray: `${circumference}px, ${circumference}px`,
                      strokeDashoffset: "0px",
                    }}
                  ></path>
                  <path
                    className="CircularProgressbar-path"
                    d="
                          M 50,50
                          m 0,-49.15
                          a 49.15,49.15 0 1 1 0,98.3
                          a 49.15,49.15 0 1 1 0,-98.3
                          "
                    strokeWidth="1.7"
                    fillOpacity="0"
                    style={{
                      stroke: "rgb(26, 27, 28)",
                      strokeLinecap: "butt",
                      transitionDuration: "0.8s",
                      strokeDasharray: `${circumference}px, ${circumference}px`,
                      strokeDashoffset: `${displayedOffset}px`,
                    }}
                  ></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-3xl md:text-[40px] font-normal">
                  {displayedConfidencePercent}
                    <span className="absolute text-xl md:text-3xl">%</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Panel: Placeholder for now, you can add more data or controls here */}
         

          {/* Bottom list: All race confidences */}
          <div className="bg-gray-100 pt-4 pb-4 md:border-t">
            <div className="space-y-0">
              <div className="flex justify-between px-4">
                <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                  RACE
                </h4>
                <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                  A.I. CONFIDENCE
                </h4>
              </div>

              {/* Dynamically render each race */}
              {Object.entries(data.race).map(([race, conf]) => {
                const confPercent = Math.round(conf * 100);
                const isSelected = selectedRace === race.charAt(0).toUpperCase() + race.slice(1);
                return (
                  <div
                    key={race}
                     onClick={() => setSelectedRace(race.charAt(0).toUpperCase() + race.slice(1))}
                className={`flex items-center justify-between h-[48px] px-4 cursor-pointer ${
                  isSelected ? "bg-[#E1E1E2] text-black" : "bg-[#1A1B1C] text-white hover:bg-black"
                }`}
                  >
                    <div className="flex items-center gap-1">
                      <img
                        alt="radio button"
                        loading="lazy"
                        width="12"
                        height="12"
                        decoding="async"
                        className="w-[12px] h-[12px] mr-2" 
                        src="./radio-button.svg"
                      />
                      <span className="font-normal text-base leading-6 tracking-tight capitalize">
                        {race}
                      </span>
                    </div>
                    <span className="font-normal text-base leading-6 tracking-tight">
                      {confPercent}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
 </div>
        {/* Footer */}
        <div className="pt-4 md:pt-[37px] pb-6 bg-white sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16">
          <div className="flex justify-between max-w-full mx-auto px-4 md:px-0">
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
            <a href="/">
              <div>
                <div className=" w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                    HOME
                  </span>
                </div>
                <div className="hidden sm:flex flex-row relative justify-center items-center">
                  <span className="text-sm font-semibold hidden sm:block mr-5">
                    HOME
                  </span>
                  <div className=" w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85]"></div>
                  <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block">
                    ▶
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Summary;

