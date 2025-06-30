// VisitorView.tsx
import { SetStateAction, useEffect, useState } from "react";
import { visitorModelData, projectData } from "./ModelData"; // Assuming projectData is in the same file for now
import GalleryView from "@/components/GalleryView"; // Import the new GalleryView component
import ContactView from "@/components/ContactView";
import AwardView from "@/components/AwardView";

export default function VisitorView() {
  const [step, setStep] = useState(0);
  const [viewMode, setViewMode] = useState<'conversation' | 'gallery' | 'contact' | 'award'>('conversation'); // New state for view mode

  // Get data for current step (if in conversation mode) or a default for gallery background
  const data = viewMode === 'conversation'
  ? visitorModelData[step] ?? visitorModelData[0]
  : { background: "gallery.png", contentBox: undefined, character: "", characterAlt: "", question: "", description: "", answers: [] }; // Add contentBox as undefined // Use gallery.png as default background for gallery mode

  const [contentBoxFlicker, setContentBoxFlicker] = useState(false);
  const [contentBoxVisible, setContentBoxVisible] = useState(false);

  useEffect(() => {
    let initialDelayTimer: NodeJS.Timeout | null = null;
    let flickerDurationTimer: NodeJS.Timeout | null = null;
  
    if (viewMode === 'conversation' || viewMode === 'contact' || viewMode === 'award' && 'contentBox' in data && data.contentBox) { // Added type check
      setContentBoxVisible(false);
      setContentBoxFlicker(false);
  
      initialDelayTimer = setTimeout(() => {
        setContentBoxVisible(true);
        setContentBoxFlicker(true);
        flickerDurationTimer = setTimeout(() => {
          setContentBoxFlicker(false);
        }, 700);
      }, 300);
    } else {
      setContentBoxVisible(false);
      setContentBoxFlicker(false);
    }
  
    return () => {
      if (initialDelayTimer) clearTimeout(initialDelayTimer);
      if (flickerDurationTimer) clearTimeout(flickerDurationTimer);
    };
  }, [step, data, viewMode]);

  const handleBack = () => {
    if (viewMode !== 'conversation') {
      setViewMode('conversation');
      setStep(5);
    } else if (step === 5) { // Special case for the "Oh you're done?" step
      setStep(3); // Go back to the main question hub
    } else if (step > 0) {
      setStep((prev) => prev - 1);
    } else {
      localStorage.removeItem("userRole");
      window.location.reload();
    }
  };

  const handleAnswer = (next: number | 'gallery' | 'contact' | 'award') => { // next can be number or 'gallery'
    if (next === 'gallery') {
      setViewMode('gallery');
    } else if (typeof next === "number" && next < visitorModelData.length) {
      setStep(next);
    } else if (next === 'contact') {
      setViewMode('contact');
    } else if (next === 'award') {
      setViewMode('award');
    } else {
      setStep(0);
    }
  };

  return (
    <div className="pixel-art-container relative w-full min-h-screen bg-fixed bg-center" style={{ backgroundImage: `url(${data.background})` }}>
      {/* "Done" Button (replaces Back/Exit) */}
      <div className="fixed top-10 left-10 z-30"> {/* Increased z-index to be above gallery content */}
        <button
          className="bg-black text-white px-6 py-2 font-bold tracking-wider border-2 border-black hover:bg-white hover:text-black transition-all duration-200"
          onClick={handleBack}
        >
          {viewMode === 'gallery' || step === 4 ? "Done" : (step === 0 ? "Exit" : "< Back")}
        </button>
      </div>

      {viewMode === 'conversation' ? (
        <>
          {/* Optional ContentBox - floating top right (only if exists) */}
          {data.contentBox && (
            <div
              className={`absolute top-10 right-4 z-20 ${contentBoxFlicker ? "flicker-animation" : ""} ${
                !contentBoxVisible ? "opacity-0" : ""
              } w-11/12 max-w-sm md:max-w-md lg:max-w-lg md:top-10 md:right-15`}
              style={{ pointerEvents: "auto" }}
            >
              <div className="pixel-box-border bg-blue-400 px-4 py-2">
                {data.contentBox}
              </div>
            </div>
          )}

          {/* Character - bottom left */}
          <div className="absolute bottom-10 left-8 z-1">
            <img src={data.character} alt={data.characterAlt || "Character"} className="w-88 h-auto" style={{ objectFit: "contain" }} />
          </div>

          {/* Container for PixelBox & ContentBox */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-8xl flex justify-center z-10">
            <div className="relative w-11/12 flex justify-center">
              {/* Main PixelBox/Question Box */}
              <div className="pixel-box-border bg-white w-full">
                <h2 className="text-2xl font-bold mb-4 pixel-text">{data.question}</h2>
                <p className="text-gray-700 leading-relaxed">{data.description}</p>
                <div className="w-full flex flex-wrap gap-4 justify-end mt-6">
                  {data.answers?.map((ans, i) => (
                    <button
                      key={i}
                      className="bg-black text-white px-6 py-2 font-bold tracking-wider border-2 border-black hover:bg-white hover:text-black transition-all duration-200"
                      onClick={() => handleAnswer(ans.nextStep)}
                    >
                      {ans.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : viewMode === 'gallery' ? (
        // Gallery View
        <GalleryView projects={projectData} /> // Pass all project data to GalleryView
      ) : viewMode === 'contact' ? (
        // Contact View
        <ContactView /> // Pass all project data to GalleryView
      ) : viewMode === 'award' ? (
        // Award View
        <AwardView /> // Pass all project data to GalleryView
      ) : null}

      {/* Styles */}
      <style jsx>{`
        .pixel-box-border {
          padding: 2rem;
          border: 4px solid #000;
          position: relative;
          box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000;
        }
        .pixel-box-border:before,
        .pixel-box-border:after {
          content: "";
          position: absolute;
          width: calc(100% - 8px);
          height: calc(100% - 8px);
          left: 4px;
          top: 4px;
          pointer-events: none;
        }
        .pixel-box-border:after {
          box-shadow: -8px 0 0 0 #000, 8px 0 0 0 #000, 0 -8px 0 0 #000, 0 8px 0 0 #000;
          width: 8px;
          height: 8px;
          background: transparent;
          pointer-events: none;
        }
        .pixel-text {
          font-family: "Press Start 2P", cursive;
          letter-spacing: 1px;
          text-shadow: 1px 1px #000;
        }
        /* Flicker Animation */
        .flicker-animation {
          animation: flicker 0.7s linear;
        }
        @keyframes flicker {
          /* Start at opacity 0, then jump to 1 for the first flicker */
          0% {
            opacity: 0;
          }
          1% {
            opacity: 1; /* Immediately become visible after the delay */
          }
          10% {
            opacity: 0.2;
          }
          20% {
            opacity: 1;
          }
          30% {
            opacity: 0.2;
          }
          40% {
            opacity: 1;
          }
          50% {
            opacity: 0.2;
          }
          60% {
            opacity: 1;
          }
          70% {
            opacity: 0.2;
          }
          80% {
            opacity: 1;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            opacity: 1; /* Ensure it stays visible after animation */
          }
        }
        .pixelated-image { /* Added here as well for consistency */
          image-rendering: crisp-edges;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: -moz-crisp-edges;
          image-rendering: pixelated;
        }
      `}</style>
    </div>
  );
}