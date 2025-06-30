import React, { useEffect, useState } from 'react';

const ROWS = 8;
const COLS = 12;
const ANIMATION_SPEED = 120; // ms per frame

function getDiagonalIndices(step: number) {
  // Returns array of [row, col] for the current diagonal
  const indices: [number, number][] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (row + col === step % (ROWS + COLS - 1)) {
        indices.push([row, col]);
      }
    }
  }
  return indices;
}

export default function MatrixWaveBackground() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setStep(s => s + 1), ANIMATION_SPEED);
    return () => clearInterval(interval);
  }, []);

  const lifted = new Set(
    getDiagonalIndices(step).map(([r, c]) => `${r},${c}`)
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#0a0a12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gap: '0.5vw',
          width: '80vw',
          height: '70vh',
          opacity: 0.18,
        }}
      >
        {Array.from({ length: ROWS * COLS }).map((_, i) => {
          const row = Math.floor(i / COLS);
          const col = i % COLS;
          const isLifted = lifted.has(`${row},${col}`);
          return (
            <div
              key={i}
              style={{
                width: '100%',
                height: '100%',
                background: isLifted ? '#fff' : '#22243a',
                borderRadius: '0.25vw',
                boxShadow: isLifted ? '0 2px 16px 0 #fff8' : undefined,
                transform: isLifted ? 'translateY(-12%) scale(1.08)' : 'none',
                transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
              }}
            />
          );
        })}
      </div>
    </div>
  );
} 