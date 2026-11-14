import React, { useEffect, useRef, useState } from 'react';

/**
 * Official Flyzo Brand Wordmark & Wing Emblem Component
 * Supports 'light' (black text on light surface) and 'dark' (cream text on dark surface)
 */
export function FlyzoMarkSVG({ className = "h-8 w-auto", variant = "light" }) {
  const src = variant === "dark" ? "/flyzo-logo-light.png" : "/flyzo-logo.png";
  return (
    <img
      src={src}
      alt="FLYZO Travels Official Logo"
      className={`${className} object-contain select-none transition-transform duration-300 hover:scale-[1.03]`}
      draggable={false}
    />
  );
}

/**
 * Interactive Captain Zizo Mascot whose "^ ^" chevron eyes follow the user's cursor
 * Inspired by SAXAZ's Axo mascot — uses a direct DOM ref to avoid React re-renders on pointermove
 */
export function CaptainZizo({ size = 84, mood = 'happy', onClick }) {
  const eyesRef = useRef(null);
  const [cheering, setCheering] = useState(false);

  useEffect(() => {
    let rafId = null;
    const handleMove = (e) => {
      if (rafId || !eyesRef.current) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!eyesRef.current) return;
        const nx = ((clientX / window.innerWidth) - 0.5) * 7;
        const ny = ((clientY / window.innerHeight) - 0.5) * 6;
        eyesRef.current.style.transform = `translate(${nx.toFixed(1)}px, ${ny.toFixed(1)}px)`;
      });
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handlePoke = () => {
    setCheering(true);
    setTimeout(() => setCheering(false), 900);
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handlePoke}
      className={`inline-block cursor-pointer select-none transition-transform duration-300 ${
        cheering ? '-translate-y-3 rotate-[-6deg] scale-110' : 'hover:-translate-y-1'
      }`}
      title="Hi! I'm Captain Zizo, your Flyzo Travel Pilot!"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        role="img"
        aria-label="Captain Zizo, the Flyzo travel buddy"
      >
        {/* Body Dome */}
        <path
          d="M60 16c30 0 46 20 46 50 0 28-16 44-46 44S14 94 14 66c0-30 16-50 46-50z"
          fill="#140f0a"
          stroke="#fbce12"
          strokeWidth="3"
        />
        {/* Pilot Goggles Strap & Cap Rim */}
        <path
          d="M16 46C22 22 40 12 60 12s38 10 44 34"
          fill="#2fb1e8"
          stroke="#140f0a"
          strokeWidth="3"
        />
        {/* Gold Wing Badge on Cap */}
        <path
          d="M46 27l14-6 14 6-14 4z"
          fill="#fbce12"
        />
        {/* Headset Ear Cups */}
        <rect x="5" y="52" width="14" height="28" rx="7" fill="#f9823f" stroke="#140f0a" strokeWidth="2" />
        <rect x="101" y="52" width="14" height="28" rx="7" fill="#f9823f" stroke="#140f0a" strokeWidth="2" />

        {/* Cursor-Tracking Eyes Group */}
        <g ref={eyesRef} style={{ transition: 'transform 0.12s ease-out' }}>
          <g fill="none" stroke="#fbce12" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round">
            {mood === 'wink' ? (
              <>
                <path d="M34 64l9-12 9 12" />
                <path d="M68 60q9 6 18 0" />
              </>
            ) : (
              <>
                <path d="M34 64l9-12 9 12" />
                <path d="M68 64l9-12 9 12" />
              </>
            )}
          </g>
        </g>

        {/* Warm Smile & Cheeks */}
        <path d="M46 82q14 12 28 0" fill="none" stroke="#f8efdc" strokeWidth="5.5" strokeLinecap="round" />
        <circle cx="29" cy="78" r="5" fill="#f9823f" opacity="0.85" />
        <circle cx="91" cy="78" r="5" fill="#f9823f" opacity="0.85" />
      </svg>
    </div>
  );
}

/**
 * Custom Vector Country Flags (Replaces OS-dependent flag emojis that break on Windows)
 */
export function CountryFlagSVG({ code = 'ae', className = 'w-8 h-5' }) {
  const c = code.toLowerCase();
  return (
    <svg
      viewBox="0 0 36 24"
      className={`${className} inline-block rounded-[4px] border border-[#140f0a]/30 shadow-sm shrink-0 overflow-hidden`}
      aria-hidden="true"
    >
      {c === 'ae' && (
        <>
          <rect width="36" height="8" y="0" fill="#00732f" />
          <rect width="36" height="8" y="8" fill="#ffffff" />
          <rect width="36" height="8" y="16" fill="#000000" />
          <rect width="10" height="24" x="0" y="0" fill="#ff0000" />
        </>
      )}
      {c === 'sa' && (
        <>
          <rect width="36" height="24" fill="#006c35" />
          <rect x="8" y="7" width="20" height="2.2" rx="1" fill="#ffffff" opacity="0.9" />
          <rect x="10" y="11" width="16" height="1.8" rx="0.9" fill="#ffffff" opacity="0.8" />
          <path d="M10 16.5 H24 L26 15.5 L24 17.8 H10 Z" fill="#fbce12" />
          <circle cx="10.5" cy="16.6" r="1.4" fill="#fbce12" />
        </>
      )}
      {c === 'eu' && (
        <>
          <rect width="36" height="24" fill="#003399" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            const cx = 18 + Math.cos(a) * 6.8;
            const cy = 12 + Math.sin(a) * 6.8;
            return <circle key={i} cx={cx} cy={cy} r="1.15" fill="#ffcc00" />;
          })}
        </>
      )}
      {c === 'gb' && (
        <>
          <rect width="36" height="24" fill="#012169" />
          <path d="M0 0 L36 24 M36 0 L0 24" stroke="#ffffff" strokeWidth="4.5" />
          <path d="M0 0 L36 24 M36 0 L0 24" stroke="#c8102e" strokeWidth="2.2" />
          <path d="M18 0 V24 M0 12 H36" stroke="#ffffff" strokeWidth="7" />
          <path d="M18 0 V24 M0 12 H36" stroke="#c8102e" strokeWidth="4" />
        </>
      )}
      {c === 'qa' && (
        <>
          <rect width="36" height="24" fill="#8a1538" />
          <path
            d="M0 0 H11 L14 2 L11 4 L14 6 L11 8 L14 10 L11 12 L14 14 L11 16 L14 18 L11 20 L14 22 L11 24 H0 Z"
            fill="#ffffff"
          />
        </>
      )}
      {c === 'sg' && (
        <>
          <rect width="36" height="12" y="0" fill="#ef3340" />
          <rect width="36" height="12" y="12" fill="#ffffff" />
          <circle cx="9.5" cy="6" r="4.2" fill="#ffffff" />
          <circle cx="11" cy="6" r="3.6" fill="#ef3340" />
          <circle cx="13.5" cy="4.2" r="0.8" fill="#ffffff" />
          <circle cx="15.2" cy="5.5" r="0.8" fill="#ffffff" />
          <circle cx="14.5" cy="7.6" r="0.8" fill="#ffffff" />
          <circle cx="12.2" cy="7.6" r="0.8" fill="#ffffff" />
          <circle cx="11.6" cy="5.5" r="0.8" fill="#ffffff" />
        </>
      )}
      {c === 'om' && (
        <>
          <rect width="36" height="8" y="0" fill="#ffffff" />
          <rect width="36" height="8" y="8" fill="#db161b" />
          <rect width="36" height="8" y="16" fill="#008000" />
          <rect width="10" height="24" x="0" y="0" fill="#db161b" />
          <path d="M3 3 L7 7 M7 3 L3 7" stroke="#ffffff" strokeWidth="1.4" />
        </>
      )}
      {c === 'kw' && (
        <>
          <rect width="36" height="8" y="0" fill="#007a3d" />
          <rect width="36" height="8" y="8" fill="#ffffff" />
          <rect width="36" height="8" y="16" fill="#ce1126" />
          <polygon points="0,0 10,8 10,16 0,24" fill="#000000" />
        </>
      )}
    </svg>
  );
}

/**
 * Custom Vector Travel & Sacred Icons (Replaces all Unicode emojis sitewide)
 */
export function JetVectorIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} inline-block shrink-0`} aria-hidden="true">
      <path d="M22 12c0-.8-.7-1.5-1.8-1.5h-5.3L9.5 3H7.2l2.6 7.5H4.6L2.8 8H1.2l1.2 4-1.2 4h1.6l1.8-2.5h5.2L7.2 21h2.3l5.4-7.5h5.3c1.1 0 1.8-.7 1.8-1.5z" />
    </svg>
  );
}

export function CoachVectorIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} inline-block shrink-0`} aria-hidden="true">
      <rect x="2" y="5" width="20" height="12" rx="2.5" />
      <path d="M2 11h20M7 5v6M13 5v6M18 5v6" />
      <circle cx="6.5" cy="17.5" r="2" fill="currentColor" />
      <circle cx="17.5" cy="17.5" r="2" fill="currentColor" />
    </svg>
  );
}

export function TrainVectorIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} inline-block shrink-0`} aria-hidden="true">
      <path d="M4 15h16a2 2 0 0 0 1.6-3.2l-3.2-4.2A3 3 0 0 0 16 6.4H4a2 2 0 0 0-2 2v4.6a2 2 0 0 0 2 2z" />
      <path d="M2 11h18M9 6.4V11M14 6.4V11M3 19h18" />
      <circle cx="7" cy="16.5" r="1.5" fill="currentColor" />
      <circle cx="16" cy="16.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function KaabaVectorIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} inline-block shrink-0`} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2.5" fill="#140f0a" stroke="#fbce12" strokeWidth="2" />
      <rect x="3" y="7" width="18" height="3.2" fill="#fbce12" />
      <rect x="13" y="12.5" width="4" height="6" rx="0.8" fill="#fbce12" />
    </svg>
  );
}

export function MosqueDomeVectorIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} inline-block shrink-0`} aria-hidden="true">
      <path d="M12 2v3M4 16c0-5 3.6-9 8-9s8 4 8 9H4z" fill="#1f6b35" stroke="#8ae2a5" strokeWidth="1.8" />
      <rect x="3" y="16" width="18" height="5" rx="1" fill="#140f0a" stroke="#8ae2a5" strokeWidth="1.6" />
    </svg>
  );
}

export function PassportStampVectorIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} inline-block shrink-0`} aria-hidden="true">
      <path d="M9 6a3 3 0 1 1 6 0c0 1.5-1.2 2.5-1.2 4.5h-3.6C10.2 8.5 9 7.5 9 6z" />
      <rect x="5" y="13" width="14" height="4" rx="1.5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function SteeringWheelVectorIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`${className} inline-block shrink-0`} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M3.5 10h17M12 14.5V21" />
    </svg>
  );
}

export function StarDiamondVectorIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={`${className} inline-block shrink-0`} aria-hidden="true">
      <path d="M8 0 L10.2 5.8 L16 8 L10.2 10.2 L8 16 L5.8 10.2 L0 8 L5.8 5.8 Z" />
    </svg>
  );
}

