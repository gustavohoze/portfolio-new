import { SetStateAction, useEffect, useState } from "react";

export const visitorModelData = [
  {
    question: "???",
    description: <>Hey There! I'm your guide for this journey. Let's get started!</>,
    background: "roomBg.png",
    character: "wave.png",
    characterAlt: "Smiling character waving",
    answers: [{ text: "Start Adventure", nextStep: 1 }],
  },
  {
    question: "???",
    description: <>Well, I'm not sure what you're looking for, but I'm here to help you find it.</>,
    background: "roomBg.png",
    character: "confused.png",
    characterAlt: "Character confused",
    answers: [{ text: "Umm, I'm not sure either. Anyway, who are you?", nextStep: 2 }],
  },
  {
    question: "Vovo",
    description: (
      <>
        Well, I forgot about that. I’m <b>Vovo</b>, a Computer Science student at BINUS University, focusing on web and iOS
        development. Currently, I’m a Junior iOS Developer at the Apple Developer Academy. I’ve also worked as a
        Front-End Developer and mentor at BNCC.
      </>
    ),
    background: "roomBg.png",
    character: "careless.png",
    characterAlt: "Character careless",
    answers: [{ text: "Oh, Nice to meet you! So, what can I do here?", nextStep: 3 }],
    contentBox: (
      <div>
        <h3 className="pixel-text text-lg mb-2 text-white text-bold">New Notification!</h3>
        <a
          href="https://docs.google.com/document/d/12TEgHTNlh4rFxdjlUMzFQn4gq9WWhF3XQhGhrNtygNE/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-gray-200 pixel-text"
        >
          View or Download CV
        </a>
        <div className="mt-4">
          <div className="flex flex-row gap-4 items-center flex-wrap">
            <a
              href="https://linkedin.com/in/gustavohoze"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label="LinkedIn Profile"
            >
              <img src="linkedin.png" alt="LinkedIn Logo" className="w-8 h-8 pixelated-image" />
            </a>
            <a
              href="https://github.com/gustavohoze"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label="GitHub Profile"
            >
              <img src="github.png" alt="GitHub Logo" className="w-8 h-8 pixelated-image" />
            </a>
            <a
              href="https://wa.me/6285104937022"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label="WhatsApp Contact"
            >
              <img src="phone.png" alt="WhatsApp Logo" className="w-8 h-8 pixelated-image" />
            </a>
            <a
              href="mailto:gustaveronic@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label="Email Contact"
            >
              <img src="mail.png" alt="Email Icon" className="w-8 h-8 pixelated-image" />
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    question: "Vovo",
    description: <>Well, what are you looking for?</>,
    background: "roomBg.png",
    character: "confused.png",
    characterAlt: "Character confused",
    answers: [{ text: "I want to see your projects", nextStep: 4 }, { text: "I want to ask you something", nextStep: 4 }, { text: "Do you have any awards?", nextStep: 4 }],
  },
  {
    question: "Vovo",
    description: <>
    Tadaa! Here are some of my projects! <br />
    I'm not feeling well, so I'll just leave you here. If you need anything, just click the done button up there
    </>,
    background: "gallery.png",
    character: "wave.png",
    characterAlt: "Character wave",
    answers: [{ text: "Umm Okay, I'll have my time here.", nextStep: 0 }],
  },
];

export default function VisitorView() {
  const [step, setStep] = useState(0);
  const data = visitorModelData[step] ?? visitorModelData[0];
  const [contentBoxFlicker, setContentBoxFlicker] = useState(false);
  const [contentBoxVisible, setContentBoxVisible] = useState(false);

  useEffect(() => {
    let initialDelayTimer: NodeJS.Timeout | null = null;
    let flickerDurationTimer: NodeJS.Timeout | null = null;

    if (data.contentBox) {
      setContentBoxVisible(false);
      setContentBoxFlicker(false);

      initialDelayTimer = setTimeout(() => {
        setContentBoxVisible(true);
        setContentBoxFlicker(true);
        flickerDurationTimer = setTimeout(() => {
          setContentBoxFlicker(false);
        }, 700);
      }, 1000);
    } else {
      setContentBoxVisible(false);
      setContentBoxFlicker(false);
    }

    return () => {
      if (initialDelayTimer) clearTimeout(initialDelayTimer);
      if (flickerDurationTimer) clearTimeout(flickerDurationTimer);
    };
  }, [step, data.contentBox]);

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
    else {
      localStorage.removeItem("userRole");
      window.location.reload();
    }
  };

  const handleAnswer = (nextStep: number) => {
    if (typeof nextStep === "number" && nextStep < visitorModelData.length) setStep(nextStep);
    else setStep(0);
  };

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${data.background})` }}>
      {/* Back/Exit Button */}
      <div className="absolute top-10 left-10 z-10">
        <button
          className="bg-black text-white px-6 py-2 font-bold tracking-wider border-2 border-black hover:bg-white hover:text-black transition-all duration-200"
          onClick={handleBack}
        >
          {step === 0 ? "Exit" : "< Back"}
        </button>
      </div>

      {/* Optional ContentBox - floating top right (only if exists) */}
      {data.contentBox && (
        <div
          // Added contentBoxVisible for initial opacity control
          // Restyled for mobile responsiveness: use 'top-4', 'right-4' for small screens
          // and 'md:top-20 md:right-15' for medium screens and up.
          className={`absolute top-10 right-4 z-20 ${contentBoxFlicker ? "flicker-animation" : ""} ${
            !contentBoxVisible ? "opacity-0" : ""
          } w-11/12 max-w-sm md:max-w-md lg:max-w-lg md:top-10 md:right-15`}
          style={{ pointerEvents: "auto" }} // Removed minWidth/maxWidth from style prop
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
      `}</style>
    </div>
  );
}