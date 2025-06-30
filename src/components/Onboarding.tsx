'use client';

import { useState, useEffect } from 'react';
import PixelBox from './PixelBox';
import DescriptionBox from './DescriptionBox';

type Phase = 'idle' | 'flicker' | 'zoom' | 'white' | 'done';

interface OnboardingProps {
  onPhaseChange: (nextPhase: Phase, role?: 'recruiter' | 'visitor') => void;
}

const DESCRIPTIONS = {
  recruiter: 'See a concise, professional summary of my skills, experience, and projects.',
  visitor: 'Explore my creative work, personal projects, and artistic journey.',
  default: 'Hover on one of the choices to know more detail about each role',
};

export default function Onboarding({ onPhaseChange }: OnboardingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState<'recruiter' | 'visitor' | null>(null);
  const [flicker, setFlicker] = useState<'recruiter' | 'visitor' | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [selectedRole, setSelectedRole] = useState<'recruiter' | 'visitor' | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      setIsVisible(true);
    } else {
      setPhase('done');
      onPhaseChange('done', userRole as 'recruiter' | 'visitor');
    }
  }, [onPhaseChange]);

  // Handle transition sequence
  useEffect(() => {
    if (phase === 'flicker') {
      setTimeout(() => {
        setPhase('zoom');
        onPhaseChange('zoom', selectedRole || undefined);
      }, 700); // Flicker duration
    } else if (phase === 'zoom') {
      setTimeout(() => {
        setPhase('white');
        onPhaseChange('white', selectedRole || undefined);
      }, 700); // Zoom duration
    } else if (phase === 'white') {
      setTimeout(() => {
        if (selectedRole) {
          localStorage.setItem('userRole', selectedRole);
          setIsVisible(false);
          setPhase('done');
          onPhaseChange('done', selectedRole);
        }
      }, 400); // White flicker duration
    }
  }, [phase, selectedRole, onPhaseChange]);

  const handleRoleSelect = (role: 'recruiter' | 'visitor') => {
    setFlicker(role);
    setSelectedRole(role);
    setPhase('flicker');
    onPhaseChange('flicker', role);
  };

  if (!isVisible || phase === 'done') return null;

  // Overlay and transition logic
  const showOverlay = phase === 'idle' || phase === 'flicker';
  // Onboarding UI is hidden when phase is zoom or white (handled by parent)

  return (
    <>
      {/* Black overlay (hidden during zoom/white) */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/80 z-40 transition-all duration-300" />
      )}
      {/* Main onboarding UI */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 gap-8 transition-opacity duration-500`}
        style={{
          opacity: phase === 'zoom' || phase === 'white' ? 0 : 1,
          pointerEvents: phase === 'zoom' || phase === 'white' ? 'none' : 'auto',
        }}
      >
        {/* Question Box */}
        <PixelBox className="w-full max-w-lg mb-4" style={{ minHeight: 100 }}>
          <h2 className="text-xl font-bold text-black text-center pixel-text">
            WHO ARE YOU?
          </h2>
          <p className="text-gray-700 text-sm text-center mt-2">
            Help me tailor your experience by selecting your role
          </p>
        </PixelBox>

        {/* Answers Box */}
        <PixelBox className="w-full max-w-lg flex flex-row items-center justify-center gap-8" style={{ minHeight: 60, padding: 0 }}>
          <button
            onClick={() => handleRoleSelect('recruiter')}
            onMouseEnter={() => setHovered('recruiter')}
            onMouseLeave={() => setHovered(null)}
            className={`flex-1 h-full pixel-text py-3 border-2 border-black bg-black text-white transition-all duration-200 hover:bg-white hover:text-black focus:bg-white focus:text-black rounded-l-lg${flicker === 'recruiter' && phase === 'flicker' ? ' flicker' : ''}`}
            style={{ minWidth: 0 }}
            disabled={phase !== 'idle'}
          >
            RECRUITER
          </button>
          <button
            onClick={() => handleRoleSelect('visitor')}
            onMouseEnter={() => setHovered('visitor')}
            onMouseLeave={() => setHovered(null)}
            className={`flex-1 h-full pixel-text py-3 border-2 border-black bg-black text-white transition-all duration-200 hover:bg-white hover:text-black focus:bg-white focus:text-black rounded-r-lg${flicker === 'visitor' && phase === 'flicker' ? ' flicker' : ''}`}
            style={{ minWidth: 0 }}
            disabled={phase !== 'idle'}
          >
            VISITOR
          </button>
        </PixelBox>

        {/* Description always visible, fixed height */}
        <DescriptionBox className="w-full max-w-lg mt-2 text-center" style={{ minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="text-xs text-black px-2 w-full block">
            {hovered ? DESCRIPTIONS[hovered] : DESCRIPTIONS.default}
          </span>
        </DescriptionBox>
      </div>
      {/* Flicker animation CSS */}
      <style jsx>{`
        .flicker {
          animation: flicker 0.7s linear;
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          10% { opacity: 0.2; }
          20% { opacity: 1; }
          30% { opacity: 0.2; }
          40% { opacity: 1; }
          50% { opacity: 0.2; }
          60% { opacity: 1; }
          70% { opacity: 0.2; }
          80% { opacity: 1; }
          90% { opacity: 0.2; }
        }
      `}</style>
    </>
  );
}
 