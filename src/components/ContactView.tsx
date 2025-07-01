// src/app/(View)/ContactView.tsx

import React from "react";

const contactLinks = [
  {
    href: "mailto:gustaveronic@gmail.com",
    label: "gustaveronic@gmail.com",
    icon: "mail.png",
    alt: "Mail Icon"
  },
  {
    href: "https://linkedin.com/in/gustavohoze",
    label: "LinkedIn",
    icon: "linkedin.png",
    alt: "LinkedIn Icon"
  },
  {
    href: "https://github.com/gustavohoze",
    label: "GitHub",
    icon: "github.png",
    alt: "GitHub Icon"
  },
  {
    href: "https://wa.me/6285104937022",
    label: "WhatsApp",
    icon: "phone.png",
    alt: "WhatsApp Icon"
  }
];

export default function ContactView() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-fixed bg-center" style={{ backgroundImage: `url(contactBg.png)` }}>
      <div className="book-cover flex items-center justify-center w-full max-w-3xl min-h-[500px] mx-4">
        <div className="book-container relative flex flex-row w-full min-h-[480px] shadow-xl">
          {/* Left Page */}
          <div className="book-page left flex-1 flex flex-col justify-center items-center p-8 bg-white border-r-4 border-black relative z-10">
            <h2 className="pixel-text text-3xl mb-4 text-black text-center uppercase">Contact Me</h2>
            <p className="pixel-text text-base text-black text-center opacity-80 max-w-xs">
              "Let's connect! Whether you're a recruiter, collaborator, or just want to say hi, my inbox is always open."
            </p>
          </div>
          {/* Spine */}
          <div className="book-spine w-2 bg-gradient-to-b from-black/80 via-black to-black/80 shadow-inner z-20" />
          {/* Right Page */}
          <div className="book-page right flex-1 flex flex-col justify-between items-center p-8 bg-white border-l-4 border-black relative z-10">
            <div className="w-full flex flex-col items-center">
              <h3 className="pixel-text text-xl text-black mb-6 text-center uppercase tracking-wide">Contact Information</h3>
              <div className="w-full flex flex-col gap-0.5">
                {contactLinks.map((link, idx) => (
                  <div key={link.label} className="flex items-center gap-4 py-3 px-2 w-full">
                    <img src={link.icon} alt={link.alt} className="w-7 h-7 pixel-icon" />
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="pixel-text text-sm text-black underline underline-offset-4 hover:text-blue-700 transition"
                    >
                      {link.label}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex justify-end mt-8">
              <span className="pixel-text text-xs text-black opacity-60 pr-2">— Gustavo H.</span>
              <span className="pixel-stamp">✦</span>
            </div>
          </div>
          {/* Pixel-art border overlay */}
          <div className="pointer-events-none absolute inset-0 z-30 book-pixel-border" />
        </div>
      </div>
      <style jsx>{`
        .book-cover {
          background: linear-gradient(120deg, #2563eb 60%, #1e40af 100%);
          border-radius: 18px;
          padding: 24px 8px;
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18), 0 0 0 4px #000;
        }
        .book-container {
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.10), 0 0 0 4px #000;
        }
        .book-page {
          min-width: 0;
        }
        .book-spine {
          min-width: 8px;
          max-width: 12px;
        }
        .book-pixel-border {
          border: 4px solid #000;
          border-radius: 12px;
          box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000;
        }
        .pixel-text {
          font-family: "Press Start 2P", cursive;
          letter-spacing: 1px;
        }
        .pixel-icon {
          image-rendering: pixelated;
          filter: invert(1) grayscale(1) contrast(2);
        }
        .pixel-stamp {
          font-size: 1.5rem;
          margin-left: 2px;
          vertical-align: middle;
          filter: grayscale(1) brightness(1.2);
        }
        .book-page.right .flex.flex-col.gap-0\.5 > div:not(:last-child) {
          border-bottom: 2px dashed #e5e7eb;
        }
        @media (max-width: 700px) {
          .book-container {
            flex-direction: column;
            min-width: 0;
            max-width: 98vw;
          }
          .book-spine {
            min-width: 100%;
            max-width: 100%;
            height: 8px;
            width: 100%;
          }
          .book-page.left {
            border-right: none;
            border-bottom: 4px solid #000;
            border-radius: 12px 12px 0 0;
          }
          .book-page.right {
            border-left: none;
            border-top: 4px solid #000;
            border-radius: 0 0 12px 12px;
          }
        }
      `}</style>
    </div>
  );
}