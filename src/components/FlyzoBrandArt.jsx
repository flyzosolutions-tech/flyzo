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
