// src/app/(View)/AwardView.tsx

import React from "react";
import Image from 'next/image';

export default function AwardView() {
  // Example awards data
  const awards = [
    {
      title: "Best Pixel Art Game",
      year: 2023,
      description: "Awarded for outstanding pixel art in a 2D platformer game.",
      image: "award_pixelart.png",
    },
    {
      title: "Top Indie Web Project",
      year: 2022,
      description: "Recognized for creative web development in the indie scene.",
      image: "award_indie.png",
    },
    // Add more awards as needed
  ];

  return (
    <div className="relative w-full min-h-screen bg-fixed bg-center" style={{ backgroundImage: `url(awardBg.png)` }}>
      <div className="flex flex-col items-center justify-center min-h-screen py-24">
        <div className="pixel-box-border bg-white w-full max-w-2xl mx-auto p-8">
          <h2 className="pixel-text text-3xl mb-8 text-black text-center uppercase">Awards & Recognition</h2>
          <div className="grid grid-cols-1 gap-8">
            {awards.map((award, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <Image src={award.image} alt={award.title} className="w-24 h-24 pixelated-image" width={96} height={96} />
                <div>
                  <h3 className="pixel-text text-xl text-black mb-2">{award.title} <span className="text-gray-500">({award.year})</span></h3>
                  <p className="text-gray-700">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .pixel-box-border {
          padding: 2rem;
          border: 4px solid #000;
          position: relative;
          box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000;
        }
        .pixelated-image {
          image-rendering: pixelated;
        }
        .pixel-text {
          font-family: "Press Start 2P", cursive;
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  );
}