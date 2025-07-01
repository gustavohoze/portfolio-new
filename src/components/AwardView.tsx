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
    {
      title: "Worst Pixel Art Game",
      year: 2023,
      description: "Awarded for outstanding pixel art in a 2D platformer game.",
      image: "award_pixelart.png",
    },
    {
      title: "Not Top Indie Web Project",
      year: 2022,
      description: "Recognized for creative web development in the indie scene.",
      image: "award_indie.png",
    },
    {
      title: "Not so Top Indie Web Project",
      year: 2022,
      description: "Recognized for creative web development in the indie scene.",
      image: "award_indie.png",
    },
    {
      title: "Not so Top Indie Web Project 3",
      year: 2022,
      description: "Recognized for creative web development in the indie scene.",
      image: "award_indie.png",
    },
    {
      title: "Not so Top Indie Web Project 4",
      year: 2022,
      description: "Recognized for creative web development in the indie scene.",
      image: "award_indie.png",
    },
    {
      title: "Not so Top Indie Web Project 5",
      year: 2022,
      description: "Recognized for creative web development in the indie scene.",
      image: "award_indie.png",
    },
    {
      title: "Not so Top Indie Web Project 6",
      year: 2022,
      description: "Recognized for creative web development in the indie scene.",
      image: "award_indie.png",
    },
    {
      title: "Not so Top Indie Web Project 7",
      year: 2022,
      description: "Recognized for creative web development in the indie scene.",
      image: "award_indie.png",
    },
    
    // Add more awards as needed
  ];

  return (
    <div className="relative w-full min-h-screen bg-fixed bg-center" style={{ backgroundImage: `url(awardBg.png)` }}>
      <div className="w-full max-w-7xl mx-auto pt-32 pb-16 px-4">
        <h2 className="pixel-text text-3xl mb-8 text-white text-center uppercase">Awards & Recognition</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {awards.map((award, idx) => (
            <div key={idx} className="bg-amber-950 art-frame-sm flex flex-col items-center p-4 h-full">
              <Image src={award.image} alt={award.title} className="w-24 h-24 pixelated-image mb-4" width={96} height={96} />
              <h3 className="pixel-text text-lg text-white mb-2 text-center">{award.title} <span className="text-gray-200">({award.year})</span></h3>
              <p className="text-gray-100 text-center text-sm">{award.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .pixelated-image {
          image-rendering: pixelated;
        }
        .pixel-text {
          font-family: "Press Start 2P", cursive;
          letter-spacing: 1px;
        }
        /* GalleryView's art-frame-sm style */
        .art-frame-sm {
          border: 2px solid #4D2D1F;
          box-shadow:
            0 0 0 2px #4D2D1F,
            0 0 0 4px #B57937,
            0 0 0 6px #91521A,
            0 0 0 8px #733E17,
            10px 10px 0 0 #4D2D1F;
          image-rendering: pixelated;
          border-radius: 0;
        }
      `}</style>
    </div>
  );
}
