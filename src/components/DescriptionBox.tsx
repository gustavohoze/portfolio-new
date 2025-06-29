import React from 'react';

interface DescriptionBoxProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function DescriptionBox({ children, className = '', style = {} }: DescriptionBoxProps) {
  return (
    <div
      className={`relative bg-white pixel-box-border flex items-center justify-center ${className}`}
      style={{ height: 76, minHeight: 76, padding: '0.5rem 1rem', overflow: 'hidden', ...style }}
    >
      <span style={{ width: '100%', textAlign: 'center', whiteSpace: 'pre-line', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
        {children}
      </span>
      <style jsx>{`
        .pixel-box-border {
          box-sizing: border-box;
          position: relative;
          border: 4px solid #000;
          border-radius: 0;
          box-shadow:
            0 0 0 2px #fff,
            0 0 0 4px #000;
        }
        .pixel-box-border:after {
          content: '';
          position: absolute;
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
          pointer-events: none;
        }
      `}</style>
    </div>
  );
} 