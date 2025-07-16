import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Summary() {
  const { id } = useParams();
  const [collection, setCollections] = useState(null);
  const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
      
        const fetchData = async () => {
          try {
            const response = await fetch("https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id }),
            });
      
            if (!response.ok) throw new Error("Failed to fetch");
      
            const data = await response.json();
            console.log("API response:", data);
            setCollections(data);
          } catch (err) {
            console.error("API fetch error:", err);
            setError(err.message);
          }
        };
      
        fetchData();
      }, [id]);
      

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

          {error && <p className="text-red-500">{error}</p>}

          {collection ? (
            <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
              <div className="bg-white-100 space-y-3 md:flex md:flex-col h-[62%]">
                <div className="p-3 bg-[#1A1B1C] text-white flex-1 flex flex-col justify-between border-t">
                  <p className="text-base font-semibold">{collection?.race}</p>
                  <h4 className="text-base font-semibold mb-1">RACE</h4>
                </div>
                <div className="p-3 bg-[#F3F3F4] flex-1 flex flex-col justify-between border-t">
                  <p className="text-base font-semibold">{collection?.age}</p>
                  <h4 className="text-base font-semibold mb-1">AGE</h4>
                </div>
                <div className="p-3 bg-[#F3F3F4] flex-1 flex flex-col justify-between border-t">
                  <p className="text-base font-semibold">{collection?.sex}</p>
                  <h4 className="text-base font-semibold mb-1">SEX</h4>
                </div>
              </div>

              <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t">
                <p className="hidden md:block md:absolute text-[40px] mb-2 left-5 top-2">
                  {collection?.race}
                </p>
                <div className="relative md:absolute w-full max-w-[384px] aspect-square mb-4 md:right-5 md:bottom-2">
                  <svg
                    className="CircularProgressbar text-[#1A1B1C]"
                    viewBox="0 0 100 100"
                  >
                    <path
                      className="CircularProgressbar-trail"
                      d="M 50,50 m 0,-49.15 a 49.15,49.15 0 1 1 0,98.3 a 49.15,49.15 0 1 1 0,-98.3"
                      strokeWidth="1.7"
                      fillOpacity="0"
                      style={{
                        strokeLinecap: "butt",
                        strokeDasharray: "308.819px, 308.819px",
                        strokeDashoffset: "0px",
                      }}
                    />
                    <path
                      className="CircularProgressbar-path"
                      d="M 50,50 m 0,-49.15 a 49.15,49.15 0 1 1 0,98.3 a 49.15,49.15 0 1 1 0,-98.3"
                      strokeWidth="1.7"
                      fillOpacity="0"
                      style={{
                        stroke: "rgb(26, 27, 28)",
                        strokeLinecap: "butt",
                        transitionDuration: "0.8s",
                        strokeDasharray: "308.819px, 308.819px",
                        strokeDashoffset: `${308.819 - (308.819 * collection?.confidence) / 100}px`,
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-3xl md:text-[40px] font-normal">
                      {collection?.confidence}
                      <span className="absolute text-xl md:text-3xl">%</span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="md:absolute text-xs text-[#A0A4AB] md:text-sm lg:text-base font-normal mb-1 leading-[24px] md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
                If A.I. estimate is wrong, select the correct one.
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Summary;
