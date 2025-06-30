'use client';

import { useState, useEffect } from 'react';
import Onboarding from '@/components/Onboarding';
import StarTunnelBackground from '@/components/StarTunnelBackground';
import VisitorView from './(View)/VisitorView';
import RecruiterView from './(View)/RecruiterView';

type UserRole = 'recruiter' | 'visitor' | null;
type Phase = 'idle' | 'flicker' | 'zoom' | 'white' | 'done';

export default function Home() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [whiteFade, setWhiteFade] = useState(false);
  const [showWhiteOverlay, setShowWhiteOverlay] = useState(false);
  const [initialRoleChecked, setInitialRoleChecked] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') as UserRole;
    if (storedRole) {
      setUserRole(storedRole);
      setPhase('done');
    }
    setInitialRoleChecked(true);
  }, []);

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

  if (!initialRoleChecked) {
    return null; // or a loading spinner
  }

  // White overlay logic
  const showWhite = (phase === 'white' || (phase === 'done' && whiteFade)) && showWhiteOverlay;
  const showTunnel = phase !== 'done' && !userRole;
  const showOnboarding = phase !== 'done' && !userRole;
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




