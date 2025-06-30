'use client';

import { useEffect, useRef } from 'react';

type Phase = 'idle' | 'flicker' | 'zoom' | 'white' | 'done';

type Star = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
};

const STAR_COUNT = 180;
const SPEED = 0.035;
const BLUR = 1;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function createStar(width: number, height: number) {
  const angle = randomBetween(0, 2 * Math.PI);
  const radius = randomBetween(0, Math.min(width, height) * 0.1);
  return {
    x: width / 2 + Math.cos(angle) * radius,
    y: height / 2 + Math.sin(angle) * radius,
    angle,
    speed: randomBetween(0.8, 1.5),
    length: randomBetween(0.8, 1.5),
  };
}

export default function StarTunnelBackground({ phase }: { phase: Phase }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    // Initialize stars
    starsRef.current = Array.from({ length: STAR_COUNT }, () => createStar(width, height));

    function animate() {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.filter = `blur(${BLUR}px)`;
      for (const star of starsRef.current as Star[]) {
        // Move star outward
        const dx = star.x - width / 2;
        const dy = star.y - height / 2;
        star.x += dx * SPEED * star.speed;
        star.y += dy * SPEED * star.speed;
        // Draw line from center to star
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2 * star.length;
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();
        // If star is out of bounds, respawn
        if (
          star.x < 0 ||
          star.x > width ||
          star.y < 0 ||
          star.y > height
        ) {
          Object.assign(star, createStar(width, height));
        }
      }
      ctx.restore();
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Animate scale and opacity based on phase
  const scale = phase === 'zoom' || phase === 'white' ? 56 : 1;
  const opacity = phase === 'white' || phase === 'done' ? 0 : 1;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'black',
        display: 'block',
        transition: 'transform 0.7s cubic-bezier(0.77,0,0.175,1), opacity 0.5s cubic-bezier(0.77,0,0.175,1)',
        transform: `scale(${scale})`,
        opacity,
      }}
      aria-hidden="true"
    />
  );
} 