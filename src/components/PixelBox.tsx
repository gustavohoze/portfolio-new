import React from 'react';

interface PixelBoxProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function PixelBox({ children, className = '', style = {} }: PixelBoxProps) {
  return (
    <div
      className={`relative bg-white pixel-box-border ${className}`}
      style={style}
    >
      {children}
      <style jsx>{`
        .pixel-box-border {
          box-sizing: border-box;
          position: relative;
          padding: 1.5rem 2rem;
        }
        .pixel-box-border:before, .pixel-box-border:after {
          content: '';
          position: absolute;
          width: calc(100% - 8px);
          height: calc(100% - 8px);
          left: 4px;
          top: 4px;
          border: 0;
          pointer-events: none;
        }
        .pixel-box-border {
          border: 4px solid #000;
          border-radius: 0;
          box-shadow:
            0 0 0 2px #fff,
            0 0 0 4px #000;
        }
        /* Pixel corners */
        .pixel-box-border:after {
          box-shadow:
            -8px 0 0 0 #000,
            8px 0 0 0 #000,
            0 -8px 0 0 #000,
            0 8px 0 0 #000;
          width: 8px;
          height: 8px;
          left: -4px;
          top: -4px;
          background: transparent;
        }
      `}</style>
    </div>
  );
} 