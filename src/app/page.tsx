'use client';

import { useState } from 'react';
import Onboarding from '@/components/Onboarding';
import StarTunnelBackground from '@/components/StarTunnelBackground';

type UserRole = 'recruiter' | 'visitor' | null;
type Phase = 'idle' | 'flicker' | 'zoom' | 'white' | 'done';

export default function Home() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [whiteFade, setWhiteFade] = useState(false);
  const [showWhiteOverlay, setShowWhiteOverlay] = useState(false);

  // Handle onboarding transitions
  const handleOnboardingPhase = (nextPhase: Phase, role?: UserRole) => {
    setPhase(nextPhase);
    if (nextPhase === 'white') {
      setWhiteFade(false);
      setShowWhiteOverlay(true);
      setTimeout(() => setWhiteFade(true), 400); // Show white, then fade out
      setTimeout(() => {
        setShowWhiteOverlay(false); // Remove from DOM after fade
        setPhase('done');
        if (role) setUserRole(role);
      }, 900); // Fade out duration (400ms solid + 500ms fade)
    } else if (nextPhase === 'done' && role) {
      setUserRole(role);
    }
  };

  // White overlay logic
  const showWhite = (phase === 'white' || (phase === 'done' && whiteFade)) && showWhiteOverlay;
  const showTunnel = phase !== 'done';
  const showOnboarding = phase !== 'done';
  const showContent = phase === 'done' && userRole;

  return (
    <div>
      {/* Star tunnel background with scaling, only during onboarding/transition */}
      {showTunnel && <StarTunnelBackground phase={phase} />}
      {/* White overlay: solid, then fades out, then removed from DOM */}
      {showWhite && (
        <div
          className={`fixed inset-0 bg-white z-50 transition-opacity duration-500`}
          style={{ opacity: whiteFade ? 0 : 1 }}
        />
      )}
      {/* Onboarding UI */}
      {showOnboarding && (
        <Onboarding onPhaseChange={handleOnboardingPhase} />
      )}
      {/* Main content after onboarding */}
      {showContent && (
        <div className="min-h-screen bg-white" style={{ position: 'relative', zIndex: 1 }}>
          {userRole === 'recruiter' ? <RecruiterView /> : <VisitorView />}
        </div>
      )}
    </div>
  );
}

function RecruiterView() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-black mb-4 tracking-wider">
            RECRUITER VIEW
          </h1>
          <div className="w-24 h-2 bg-black mx-auto"></div>
        </header>
        <div className="bg-white border-4 border-black p-8">
          <h2 className="text-2xl font-bold text-black mb-6 tracking-wide">
            PROFESSIONAL PORTFOLIO
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome, recruiter! This view is tailored to showcase my professional 
            experience, technical skills, and project portfolio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="border-2 border-black p-4">
              <h3 className="text-lg font-bold text-black mb-2">SKILLS</h3>
              <p className="text-gray-700">Technical skills and expertise</p>
            </div>
            <div className="border-2 border-black p-4">
              <h3 className="text-lg font-bold text-black mb-2">EXPERIENCE</h3>
              <p className="text-gray-700">Work history and achievements</p>
            </div>
            <div className="border-2 border-black p-4">
              <h3 className="text-lg font-bold text-black mb-2">PROJECTS</h3>
              <p className="text-gray-700">Portfolio of work</p>
            </div>
            <div className="border-2 border-black p-4">
              <h3 className="text-lg font-bold text-black mb-2">CONTACT</h3>
              <p className="text-gray-700">Professional contact information</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => {
              localStorage.removeItem('userRole');
              window.location.reload();
            }}
            className="bg-black text-white border-2 border-black px-6 py-2 font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-200"
          >
            RESET CHOICE
          </button>
        </div>
      </div>
    </div>
  );
}

function VisitorView() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-black mb-4 tracking-wider">
            VISITOR VIEW
          </h1>
          <div className="w-24 h-2 bg-black mx-auto"></div>
        </header>
        <div className="bg-white border-4 border-black p-8">
          <h2 className="text-2xl font-bold text-black mb-6 tracking-wide">
            CREATIVE PORTFOLIO
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome, visitor! This view showcases my creative work, personal 
            projects, and artistic portfolio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="border-2 border-black p-4">
              <h3 className="text-lg font-bold text-black mb-2">ARTWORK</h3>
              <p className="text-gray-700">Creative projects and designs</p>
            </div>
            <div className="border-2 border-black p-4">
              <h3 className="text-lg font-bold text-black mb-2">BLOG</h3>
              <p className="text-gray-700">Thoughts and insights</p>
            </div>
            <div className="border-2 border-black p-4">
              <h3 className="text-lg font-bold text-black mb-2">ABOUT</h3>
              <p className="text-gray-700">Personal story and interests</p>
            </div>
            <div className="border-2 border-black p-4">
              <h3 className="text-lg font-bold text-black mb-2">CONNECT</h3>
              <p className="text-gray-700">Social media and contact</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => {
              localStorage.removeItem('userRole');
              window.location.reload();
            }}
            className="bg-black text-white border-2 border-black px-6 py-2 font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-200"
          >
            RESET CHOICE
          </button>
        </div>
      </div>
    </div>
  );
}
