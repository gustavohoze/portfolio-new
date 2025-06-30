// src/app/(View)/ContactView.tsx

import React from "react";

export default function ContactView() {
  return (
    <div className="relative w-full min-h-screen bg-fixed bg-center" style={{ backgroundImage: `url(contactBg.png)` }}>
      <div className="flex flex-col items-center justify-center min-h-screen py-24">
        <div className="pixel-box-border bg-white w-full max-w-xl mx-auto p-8">
          <h2 className="pixel-text text-3xl mb-8 text-black text-center uppercase">Contact Me</h2>
          <div className="flex flex-col gap-6 items-center">
            <a href="mailto:gustaveronic@gmail.com" className="pixel-text text-lg text-black underline">gustaveronic@gmail.com</a>
            <a href="https://linkedin.com/in/gustavohoze" target="_blank" rel="noopener noreferrer" className="pixel-text text-lg text-black underline">LinkedIn</a>
            <a href="https://github.com/gustavohoze" target="_blank" rel="noopener noreferrer" className="pixel-text text-lg text-black underline">GitHub</a>
            <a href="https://wa.me/6285104937022" target="_blank" rel="noopener noreferrer" className="pixel-text text-lg text-black underline">WhatsApp</a>
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
        .pixel-text {
          font-family: "Press Start 2P", cursive;
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  );
}