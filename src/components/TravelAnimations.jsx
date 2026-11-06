import React, { useState, useEffect, useRef } from 'react';
import { CaptainZizo } from './FlyzoBrandArt';
import { buildWhatsAppUrl } from '../data/siteData';
import { Sparkles } from 'lucide-react';

/**
 * High-Craft Commercial Widebody Jet Airliner Vector Model (Boeing 787 / A350 profile)
 * Centered at (0, 0) facing right (+X), so it works seamlessly with <animateMotion rotate="auto" />
 */
export function DetailedJetAirliner({ scale = 1 }) {
  return (
    <g transform={`scale(${scale})`}>
      {/* Twin Fading Jet Contrails */}
      <path
        d="M-135 -6 L-28 -6 M-120 8 L-24 8"
        stroke="url(#contrailFade)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Far-Side Swept Wing (behind fuselage) */}
      <path
        d="M-4 -3 L-26 -30 L-16 -32 L14 -3 Z"
        fill="#c99a00"
        stroke="#140f0a"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* Swept Tail Fin (Vertical Stabilizer) with Flyzo Crimson-Gold Livery */}
      <path
        d="M-34 -2 L-56 -32 L-42 -32 L-18 -2 Z"
        fill="#b5391a"
        stroke="#140f0a"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M-48 -22 L-38 -22 L-25 -4 L-35 -4 Z" fill="#fbce12" />

      {/* Horizontal Rear Stabilizer */}
      <path
        d="M-36 1 L-50 11 L-40 12 L-26 2 Z"
        fill="#e06d2b"
        stroke="#140f0a"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />

      {/* Aerodynamic Widebody Fuselage */}
      <path
        d="M-46 -2 C-36 -8, 18 -8, 42 -3 C52 -1, 58 2, 58 4.5 C58 7, 50 9, 36 9 L-34 9 C-42 9, -48 4, -46 -2 Z"
        fill="#fffcf4"
        stroke="#140f0a"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Metallic Belly Shading & Golden Livery Cheatline */}
      <path
        d="M-40 4 L48 4 C44 8, 36 8.5, -34 8.5 Z"
        fill="#e4d9c2"
      />
      <path
        d="M-38 2.5 Q 6 0.5, 48 3.5"
        fill="none"
        stroke="#b5391a"
        strokeWidth="2"
      />

      {/* Wrap-Around Cockpit Windshield */}
      <path
        d="M40 -2.2 C46 -1.5, 51 0.5, 53 2.5 L41 2.5 C39 1, 39 -1, 40 -2.2 Z"
        fill="#0ea5e9"
        stroke="#140f0a"
        strokeWidth="1.1"
      />

      {/* Illuminated Oval Cabin Windows */}
      {[-24, -17, -10, -3, 4, 11, 18, 25, 32].map((wx) => (
        <rect
          key={wx}
          x={wx}
          y="-2"
          width="3.2"
          height="4.2"
          rx="1.6"
          fill="#140f0a"
        />
      ))}

      {/* Near-Side Swept Supercritical Wing + Upturned Winglet */}
      <path
        d="M-6 4 L-32 34 L-20 35 L16 5 Z"
        fill="#fbce12"
        stroke="#140f0a"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Red Wingtip Winglet */}
      <path
        d="M-32 34 L-37 28 L-28 31 L-20 35 Z"
        fill="#b5391a"
        stroke="#140f0a"
        strokeWidth="1.2"
      />

      {/* Under-Wing High-Bypass Turbofan Engine Nacelle */}
      <g transform="translate(-4, 15)">
        <rect
          x="-9"
          y="-3.5"
          width="18"
          height="7.5"
          rx="3.5"
          fill="#f8efdc"
          stroke="#140f0a"
          strokeWidth="1.5"
        />
        <rect x="-7" y="-2.5" width="5" height="5.5" rx="1" fill="#b5391a" />
        <ellipse cx="9" cy="0.2" rx="1.6" ry="3.2" fill="#0ea5e9" stroke="#140f0a" strokeWidth="1" />
      </g>
    </g>
  );
}

/**
 * High-Craft Volvo 9600 Multi-Axle Luxury Sleeper Coach Vector Model
 * Features aerodynamic raked windshield, double-deck tinted panoramic sleeper glass,
 * Flyzo crimson-gold livery swoosh, headlight beam, and rotating alloy wheels!
 */
export function DetailedVolvoCoach({ scale = 1 }) {
  const renderWheel = (cx, cy, r = 8) => (
    <g key={cx} transform={`translate(${cx}, ${cy})`}>
      <circle r={r} fill="#140f0a" stroke="#2c2219" strokeWidth="2" />
      <circle r={r * 0.58} fill="#d6c8ab" stroke="#140f0a" strokeWidth="1" />
      <g>
        <line x1={-r * 0.45} y1="0" x2={r * 0.45} y2="0" stroke="#140f0a" strokeWidth="1.5" />
        <line x1="0" y1={-r * 0.45} x2="0" y2={r * 0.45} stroke="#140f0a" strokeWidth="1.5" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur="0.65s"
          repeatCount="indefinite"
        />
      </g>
      <circle r={r * 0.2} fill="#b5391a" />
    </g>
  );

  return (
    <g transform={`scale(${scale})`}>
      {/* Warm LED Headlight Cone */}
      <polygon
        points="136,28 195,14 195,42"
        fill="url(#headlightBeam)"
        opacity="0.7"
      />

      {/* Ground Shadow */}
      <ellipse cx="68" cy="41" rx="70" ry="3.5" fill="#000000" opacity="0.45" />

      {/* Main Aerodynamic Coach Body */}
      <path
        d="M4 6 C4 2, 8 0, 14 0 H122 C130 0, 135 6, 137 16 L139 32 C139 35, 136 37, 132 37 H8 C4 37, 2 34, 2 30 Z"
        fill="#fffcf4"
        stroke="#140f0a"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Sweeping Flyzo Crimson & Marigold Livery */}
      <path
        d="M3 23 H137 L138 32 C138 35, 135 36, 131 36 H6 C3 36, 3 33, 3 30 Z"
        fill="#b5391a"
      />
      <path
        d="M3 21 C45 21, 82 16, 136 19 L137 25 C85 22, 45 27, 3 27 Z"
        fill="#fbce12"
        stroke="#140f0a"
        strokeWidth="1"
      />

      {/* Continuous Flush Panoramic Dark-Tinted Glass Band (Upper & Lower Sleeper Berths) */}
      <path
        d="M8 4 H116 C120 4, 122 6, 123 11 L124 18 H8 Z"
        fill="#140f0a"
         rx="3"
      />
      {/* Subtle Berth Window Pillars & Warm Interior Reading Lights */}
      {[26, 46, 66, 86, 106].map((px) => (
        <g key={px}>
          <line x1={px} y1="4" x2={px - 2} y2="18" stroke="#fffcf4" strokeWidth="1.5" opacity="0.7" />
          <circle cx={px - 10} cy="8" r="1.3" fill="#fbce12" opacity="0.85" />
          <circle cx={px - 10} cy="14" r="1.3" fill="#f9823f" opacity="0.75" />
        </g>
      ))}

      {/* Raked Front Panoramic Cockpit Windshield */}
      <path
        d="M125 4 H131 C134 6, 136 12, 137 19 H126 Z"
        fill="#38bdf8"
        stroke="#140f0a"
        strokeWidth="1.4"
      />

      {/* Aerodynamic Horn Side Mirror */}
      <path
        d="M132 7 L141 5 L140 12 L135 9 Z"
        fill="#fbce12"
        stroke="#140f0a"
        strokeWidth="1.2"
      />

      {/* LED Daytime Running Lamp & Tail Lamp */}
      <rect x="134" y="27" width="4.5" height="5" rx="1.5" fill="#fff3b0" stroke="#140f0a" strokeWidth="1" />
      <rect x="2" y="24" width="3" height="8" rx="1" fill="#ef4444" />

      {/* FLYZO Brand Text on Coach Flank */}
      <text
        x="52"
        y="33"
        fontSize="6.5"
        fontWeight="900"
        fill="#fffcf4"
        letterSpacing="1.2"
        fontFamily="Outfit, sans-serif"
      >
        FLYZO SLEEPER
      </text>

      {/* Multi-Axle Wheels (Rear Tag Axle + Rear Drive Axle + Front Steer Axle) */}
      {renderWheel(26, 37, 7.5)}
      {renderWheel(44, 37, 7.5)}
      {renderWheel(112, 37, 7.5)}
    </g>
  );
}

/**
 * High-Craft Aerodynamic Express Bullet Train Vector Model (Vande Bharat / Eurostar style)
 */
export function DetailedExpressTrain({ scale = 1 }) {
  return (
    <g transform={`scale(${scale})`}>
      {/* Rear Coupled Coach */}
      <path
        d="M-118 4 H-6 V30 H-118 Z"
        fill="#fffcf4"
        stroke="#140f0a"
        strokeWidth="1.8"
      />
      <rect x="-118" y="18" width="112" height="5" fill="#1aa3e4" />
      <rect x="-118" y="23" width="112" height="3" fill="#fbce12" />
      {[-108, -90, -72, -54, -36, -18].map((wx) => (
        <rect key={wx} x={wx} y="8" width="13" height="7.5" rx="2" fill="#140f0a" />
      ))}

      {/* Flexible Accordion Gangway Bellows */}
      <rect x="-6" y="5" width="6" height="24" fill="#2c2219" stroke="#140f0a" strokeWidth="1.2" />

      {/* Electric Roof Pantograph */}
      <path
        d="M22 4 L34 -8 L46 4 M28 -2 H40"
        fill="none"
        stroke="#fbce12"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Aerodynamic Lead Locomotive Car */}
      <path
        d="M0 4 H104 C122 4, 138 14, 146 25 C148 28, 146 30, 142 30 H0 Z"
        fill="#fffcf4"
        stroke="#140f0a"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Speed Livery Stripes */}
      <path d="M0 18 H136 L141 23 H0 Z" fill="#1aa3e4" />
      <path d="M0 23 H141 L145 26 H0 Z" fill="#fbce12" />

      {/* Wrap-Around Driver Cab Visor */}
      <path
        d="M106 7 H121 C128 9, 134 14, 136 17 H106 Z"
        fill="#0ea5e9"
        stroke="#140f0a"
        strokeWidth="1.4"
      />

      {/* Passenger Vistadome Windows */}
      {[8, 26, 44, 62, 80].map((wx) => (
        <rect key={wx} x={wx} y="8" width="14" height="7.5" rx="2" fill="#140f0a" />
      ))}

      {/* Rail Bogies & Wheels */}
      {[-98, -78, -32, -14, 18, 38, 92, 112].map((cx) => (
        <circle key={cx} cx={cx} cy="31" r="4.2" fill="#140f0a" stroke="#fbce12" strokeWidth="1.5" />
      ))}
    </g>
  );
}

/**
 * SAXAZ-style Vector Confetti Burst — shoots 22 colorful paper airplanes & chevrons from any clicked element!
 */
export function burstAirplanes(el) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const rect =
    el && el.getBoundingClientRect
      ? el.getBoundingClientRect()
      : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };

  const cols = ['#f9823f', '#8bc34f', '#b8a0d0', '#2fb1e8', '#fbce12', '#b5391a'];
  const paths = Array.from({ length: 22 }, (_, i) => {
    const a = (i / 22) * Math.PI * 2;
    const d = 65 + ((i * 37) % 95);
    const dx = Math.cos(a) * d;
    const dy = Math.sin(a) * d;
    const rot = (i * 97) % 360;
    const isPlane = i % 2 === 0;
    return isPlane
      ? `<path d="M-8 4L8 0L-8 -4L-4 0Z" fill="${cols[i % 6]}" style="--dx:${dx}px;--dy:${dy}px;--rot:${rot}deg"/>`
      : `<path d="M-7 5L0 -6l7 11" fill="none" stroke="${cols[i % 6]}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" style="--dx:${dx}px;--dy:${dy}px;--rot:${rot}deg"/>`;
  }).join('');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'saxaz-burst');
  svg.setAttribute('width', '2');
  svg.setAttribute('height', '2');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.left = `${rect.left + rect.width / 2}px`;
  svg.style.top = `${rect.top + rect.height / 2}px`;
  svg.innerHTML = paths;
  document.body.appendChild(svg);
  setTimeout(() => svg.remove(), 1050);
}

/**
 * SAXAZ-style Flying Reward Pill — flies from clicked element into the top navbar Miles counter!
 */
export function flyMilesToNav(el, miles = 250) {
  if (typeof window === 'undefined') return;
  burstAirplanes(el);
  window.dispatchEvent(new CustomEvent('flyzo:miles', { detail: { miles } }));

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const from =
    el && el.getBoundingClientRect
      ? el.getBoundingClientRect()
      : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0 };
  const navChip = document.getElementById('flyzo-nav-miles');
  if (!navChip) return;

  const to = navChip.getBoundingClientRect();
  const flyer = document.createElement('div');
  flyer.className = 'saxaz-xp-fly';
  flyer.textContent = `+${miles} MILES ✈`;
  flyer.style.left = `${from.left + from.width / 2 - 48}px`;
  flyer.style.top = `${from.top - 10}px`;
  document.body.appendChild(flyer);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top - from.top + 10;

  const anim = flyer.animate(
    [
      { transform: 'translate(0, 0) scale(0.7)', opacity: 0 },
      { transform: 'translate(0, -36px) scale(1.15)', opacity: 1, offset: 0.22 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.8)`, opacity: 1 },
    ],
    { duration: 980, easing: 'cubic-bezier(0.5, 0, 0.2, 1)' }
  );
  anim.onfinish = () => {
    flyer.remove();
    navChip.classList.remove('pop-seed');
    void navChip.offsetWidth;
    navChip.classList.add('pop-seed');
  };
}

/**
 * 1. ANIMATED PANORAMIC TRAVEL SKY & HIGHWAY DIORAMA
 * Uses native SVG <animateMotion rotate="auto" /> so the detailed Boeing 787 jet smoothly banks along the curved trajectory,
 * while the detailed Volvo 9600 Multi-Axle Sleeper Coach & Express Train glide below!
 */
export function AnimatedTransitPanorama() {
  const flightArcPath = 'M -140 78 C 360 12, 1020 12, 1580 68';

  return (
    <div className="relative w-full overflow-hidden bg-[#140f0a] border-b-2 border-[#1c140c] select-none">
      <svg
        viewBox="0 0 1440 156"
        className="w-full h-[112px] sm:h-[142px] block"
        preserveAspectRatio="xMidYMid slice"
        aria-label="Animated Flyzo widebody airliner banking across the sky with luxury Volvo sleeper coach and express train below"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#110d09" />
            <stop offset="65%" stopColor="#241911" />
            <stop offset="100%" stopColor="#140f0a" />
          </linearGradient>
          <linearGradient id="contrailFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fbce12" stopOpacity="0" />
            <stop offset="60%" stopColor="#fbce12" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#fffcf4" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="headlightBeam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="1440" height="156" fill="url(#skyGrad)" />

        {/* Subtle Airport Waypoint Badges along the Sky */}
        <g fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="800" fill="#f8efdc" opacity="0.45">
          <text x="90" y="26">COK • BOM • DEL</text>
          <text x="510" y="22">DXB •AUH • KWI</text>
          <text x="920" y="22">JED • MED (UMRAH)</text>
          <text x="1270" y="26">LHR • CDG • SIN</text>
        </g>

        {/* Soft Layered Clouds */}
        <g className="anim-cloud-slow" opacity="0.16" fill="#f8efdc">
          <path d="M180 52h64a14 14 0 0 0 0-28 22 22 0 0 0-42-5 16 16 0 0 0-22 33z" />
          <path d="M690 42h78a16 16 0 0 0 0-32 24 24 0 0 0-46-6 18 18 0 0 0-32 38z" />
          <path d="M1160 54h66a14 14 0 0 0 0-28 20 20 0 0 0-38-4 15 15 0 0 0-28 32z" />
        </g>

        {/* Curved Global Flight Arc */}
        <path
          d={flightArcPath}
          fill="none"
          stroke="#fbce12"
          strokeWidth="1.8"
          strokeDasharray="7 9"
          opacity="0.38"
        />

        {/* Landmarks Silhouette Band (Burj Khalifa, Makkah Clock Tower, Viaduct) */}
        <g fill="#2b2017" opacity="0.9">
          <polygon points="460,124 467,38 474,124" />
          <rect x="478" y="76" width="22" height="48" rx="2" />
          <rect x="880" y="56" width="28" height="68" rx="2" />
          <circle cx="894" cy="72" r="8" fill="#fbce12" opacity="0.35" />
          <polygon points="1240,124 1249,52 1258,124" />
        </g>

        {/* EXPRESS TRAIN GLIDING ACROSS ELEVATED RAIL TRACK */}
        <line x1="0" y1="124" x2="1440" y2="124" stroke="#473828" strokeWidth="2" />
        <g>
          <DetailedExpressTrain scale={0.78} />
          <animateMotion
            dur="13s"
            begin="-5s"
            repeatCount="indefinite"
            path="M -220 99 L 1640 99"
          />
        </g>

        {/* FOREGROUND EXPRESSWAY & MOVING LANE DASHES */}
        <rect x="0" y="126" width="1440" height="30" fill="#17110b" />
        <line x1="0" y1="126" x2="1440" y2="126" stroke="#3d2f22" strokeWidth="1.5" />
        <line
          x1="0"
          y1="142"
          x2="1440"
          y2="142"
          stroke="#fbce12"
          strokeWidth="2"
          strokeDasharray="22 20"
          className="anim-road-dashes"
          opacity="0.75"
        />

        {/* VOLVO 9600 LUXURY SLEEPER COACH CRUISING ALONG EXPRESSWAY */}
        <g>
          <DetailedVolvoCoach scale={0.86} />
          <animateMotion
            dur="15s"
            repeatCount="indefinite"
            path="M -180 108 L 1600 108"
          />
        </g>

        {/* WIDEBODY JET AIRLINER BANKING SMOOTHLY ALONG CURVED FLIGHT ARC */}
        <g>
          <DetailedJetAirliner scale={1.08} />
          <animateMotion
            dur="10.5s"
            repeatCount="indefinite"
            rotate="auto"
            path={flightArcPath}
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * 2. SCROLL-PINNED LIVE TRANSIT SHOWCASE (Exact SAXAZ .sw-pin + .mini circular clip-path wipe!)
 */
const TRANSIT_BANDS = [
  {
    key: 'flights',
    code: '01 • AIR',
    name: 'Flights & Charters',
    badge: 'IATA Instant Ticketing',
    accent: '#2fb1e8',
    title: 'Domestic & Global Airfare',
    points: [
      'Special GCC, Kuwait, UAE, Saudi & Europe NRI net fares with 30kg–45kg baggage',
      'Zero-markup group PNR blocking for families & corporate teams',
      '24/7 WhatsApp boarding pass, web check-in & date-change desk',
    ],
    cta: 'Book Flight Ticket ↓',
    target: '#tickets',
    zizoTransform: 'translate(182px, 46px) scale(0.72)',
  },
  {
    key: 'buses',
    code: '02 • BUS',
    name: 'Luxury Sleeper Buses',
    badge: 'Volvo / Scania Multi-Axle',
    accent: '#f9823f',
    title: 'Intercity AC Sleeper Fleet',
    points: [
      'Confirmed lower/upper AC sleeper berths across Bangalore, Chennai, Hyderabad, Kochi & Mumbai',
      'Live GPS boarding point tracking & sanitized blanket/pillow coaches',
      'Instant group bus charter for weddings, college tours & pilgrimages',
    ],
    cta: 'Reserve Bus Berth ↓',
    target: '#tickets',
    zizoTransform: 'translate(18px, 52px) scale(0.76)',
  },
  {
    key: 'trains',
    code: '03 • RAIL',
    name: 'IRCTC & Tatkal Rail',
    badge: 'Authorized Rail Desk',
    accent: '#8bc34f',
    title: 'Vande Bharat, Rajdhani & Tatkal',
    points: [
      'High-speed Tatkal & Premium Tatkal reservation assistance',
      '1A, 2A, 3A & Executive Chair Car confirmed seat optimization',
      'Live PNR prediction & station transfer coordination',
    ],
    cta: 'Book Train Seat ↓',
    target: '#tickets',
    zizoTransform: 'translate(188px, 134px) scale(0.62)',
  },
  {
    key: 'umrah',
    code: '04 • UMRAH & VISA',
    name: 'Umrah, Visas & Jobs',
    badge: '99.8% Approval Desk',
    accent: '#fbce12',
    title: 'Sacred Umrah, Visas & Attestation',
    points: [
      '0-Meter Haram view 5★ Makkah & Madinah packages with direct Saudia flights',
      'Express Tourist & Work Visas + MEA/Embassy/MOFA Certificate Attestation',
      'Verified GCC & European overseas job recruitment with Wakala clearance',
    ],
    cta: 'Explore Umrah & Visas ↓',
    target: '#umrah-packages',
    zizoTransform: 'translate(178px, 38px) scale(0.68)',
  },
];

export function ScrollPinnedTransitShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [subProgress, setSubProgress] = useState(0.5);
  const pinRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = pinRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const range = Math.max(1, r.height - (window.innerHeight - 76));
      if (r.top > window.innerHeight || r.bottom < 0) return;

      const p = Math.max(0, Math.min(1, (76 - r.top) / range));
      const pos = p * 4;
      const idx = Math.min(3, Math.floor(pos));
      setScrollProgress(p);
      setSubProgress(pos - idx);
      setActiveIdx(idx);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTabClick = (idx, e) => {
    setActiveIdx(idx);
    burstAirplanes(e.currentTarget);
    const el = pinRef.current;
    if (el && window.innerWidth >= 960) {
      const r = el.getBoundingClientRect();
      const range = r.height - (window.innerHeight - 76);
      if (range > 200) {
        window.scrollTo({
          top: window.scrollY + r.top - 76 + (range * (idx + 0.5)) / 4,
          behavior: 'smooth',
        });
      }
    }
  };

  const current = TRANSIT_BANDS[activeIdx];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-8 relative">
      <div
        ref={pinRef}
        className="max-w-[1240px] mx-auto lg:h-[250vh] relative"
      >
        <div className="lg:sticky lg:top-[82px] lg:min-h-[calc(100dvh-96px)] grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT 7 COLS: Heading, Sliding Pill Switcher (.sw-tabs) & Morphing Card */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#140f0a] text-[#fbce12] text-xs font-extrabold uppercase tracking-widest mb-2">
                SCROLL-DRIVEN TRANSIT ENGINE • CLICK OR SCROLL
              </span>
              <h2
                className="poster-h2 transition-transform duration-200 origin-left"
                style={{
                  transform: `scale(${0.92 + 0.08 * scrollProgress})`,
                }}
              >
                One travel desk for every runway, highway &amp; railway.
              </h2>
              <p className="text-sm sm:text-base text-[var(--muted)] font-semibold mt-2 max-w-xl">
                Scroll down through this stage (or tap any mode below) to watch the live Flyzo transit simulator morph in real time.
              </p>
            </div>

            {/* SAXAZ .sw-tabs Sliding Pill Switcher */}
            <div
              role="group"
              aria-label="Choose a travel mode"
              className="relative grid grid-cols-4 p-1.5 rounded-full border-2 border-[#140f0a] bg-[var(--surface)] shadow-[0_6px_0_#140f0a]"
            >
              <i
                aria-hidden="true"
                className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc((100%-12px)/4)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.3,1.3,0.5,1)]"
                style={{
                  backgroundColor: current.accent,
                  transform: `translateX(${activeIdx * 100}%)`,
                }}
              />
              {TRANSIT_BANDS.map((b, i) => (
                <button
                  key={b.key}
                  type="button"
                  onClick={(e) => handleTabClick(i, e)}
                  className={`relative z-10 py-2.5 px-2 rounded-full text-center transition-colors ${
                    activeIdx === i ? 'text-[#140f0a] font-black' : 'text-[var(--muted)] font-bold hover:text-[var(--ink)]'
                  }`}
                >
                  <b className="block font-mono text-[11px] sm:text-xs">{b.code}</b>
                  <span className="hidden sm:block text-xs truncate">{b.name}</span>
                </button>
              ))}
            </div>

            {/* Active Mode Card (.age) */}
            <article
              className="relative p-6 sm:p-8 rounded-[28px] border-2 border-[#140f0a] shadow-[0_12px_0_#140f0a] overflow-hidden transition-colors duration-500"
              style={{
                backgroundColor: `color-mix(in srgb, ${current.accent} 16%, var(--surface))`,
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-35"
                style={{
                  background: `radial-gradient(closest-side, ${current.accent}, transparent)`,
                }}
              />

              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#140f0a] text-[#fbce12] text-xs font-extrabold uppercase">
                    {current.badge}
                  </span>
                  <span className="font-mono text-xs font-extrabold text-[var(--muted)]">
                    MODE {activeIdx + 1} OF 4
                  </span>
                </div>

                <h3 className="poster-h2 !text-3xl sm:!text-4xl">{current.title}</h3>

                <ul className="space-y-2.5 text-sm sm:text-base font-bold text-[var(--ink)]">
                  {current.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full mt-2 shrink-0 border border-[#140f0a]"
                        style={{ backgroundColor: current.accent }}
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={current.target}
                    onClick={(e) => flyMilesToNav(e.currentTarget, 150)}
                    className="tactile-btn py-3 px-6 bg-[#140f0a] text-[#fbce12] text-sm"
                  >
                    <span>{current.cta}</span>
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* RIGHT 5 COLS: SAXAZ .mini Phone Stage with Circular Clip-Path Wipe & High-Detail Vehicles */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative transition-transform duration-200"
              style={{
                transform: `translateY(${(0.5 - subProgress) * 22}px) rotate(${(subProgress - 0.5) * 3}deg)`,
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-10 rounded-full opacity-35 blur-2xl transition-colors duration-500"
                style={{ backgroundColor: current.accent }}
              />

              {/* Hand-crafted .mini Phone Frame */}
              <div
                className="relative w-[290px] sm:w-[310px] h-[560px] rounded-[42px] bg-[#0d0a07] overflow-hidden border-[8px] border-[#0d0a07] shadow-2xl"
                style={{
                  boxShadow: `0 0 0 8px #0d0a07, 0 0 0 11px ${current.accent}, 0 35px 65px -20px rgba(0,0,0,0.75)`,
                }}
              >
                <span className="absolute z-30 top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-[#0d0a07]" />

                {/* Floating Captain Zizo */}
                <div
                  className="absolute z-20 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.4,1.25,0.5,1)]"
                  style={{ transform: current.zizoTransform }}
                >
                  <CaptainZizo size={92} />
                </div>

                {/* SCREEN 1: AIR FLIGHTS (High-Detail Widebody Airliner Banking in Clouds) */}
                <div
                  className={`ms-screen absolute inset-0 bg-gradient-to-b from-[#0b2239] via-[#1aa3e4] to-[#dff6ff] text-[#140f0a] p-5 pt-12 flex flex-col justify-between ${
                    activeIdx === 0 ? 'ms-on' : ''
                  }`}
                >
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#140f0a] text-[#fbce12] text-xs font-extrabold">
                      ✈ LIVE FLIGHT RADAR
                    </span>
                    <h4 className="poster-h2 !text-3xl !text-white drop-shadow">
                      COK ✈ KWI / DXB
                    </h4>
                  </div>

                  <svg viewBox="0 0 260 220" className="w-full h-auto my-auto overflow-visible">
                    <g className="anim-cloud-fast" fill="#ffffff" opacity="0.88">
                      <circle cx="48" cy="172" r="20" />
                      <circle cx="72" cy="166" r="26" />
                      <circle cx="98" cy="174" r="18" />
                    </g>
                    <g className="anim-cloud-slow" fill="#ffffff" opacity="0.65">
                      <circle cx="185" cy="52" r="16" />
                      <circle cx="206" cy="48" r="22" />
                    </g>
                    <path
                      d="M15 155 Q 115 95, 240 58"
                      fill="none"
                      stroke="#fbce12"
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                    />
                    <g className="anim-plane-bob">
                      <g transform="translate(132, 102) rotate(-19)">
                        <DetailedJetAirliner scale={1.38} />
                      </g>
                    </g>
                  </svg>

                  <div className="bg-[#140f0a] text-[#f8efdc] p-3.5 rounded-2xl space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#fbce12]">BAGGAGE INCLUDED</span>
                      <span>30 KG + 7 KG</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white/70">NRI SPECIAL FARE</span>
                      <span className="text-[#8ae2a5] font-mono">₹13,499</span>
                    </div>
                  </div>
                </div>

                {/* SCREEN 2: LUXURY SLEEPER BUS (Detailed Volvo 9600 Multi-Axle Coach) */}
                <div
                  className={`ms-screen absolute inset-0 bg-gradient-to-b from-[#23120b] via-[#7a2810] to-[#f9823f] text-[#f8efdc] p-5 pt-12 flex flex-col justify-between ${
                    activeIdx === 1 ? 'ms-on' : ''
                  }`}
                >
                  <div className="space-y-1 text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#fbce12] text-[#140f0a] text-xs font-extrabold">
                      🚌 VOLVO 9600 SLEEPER
                    </span>
                    <h4 className="poster-h2 !text-3xl !text-[#fffaf0]">
                      BLR ➔ COK
                    </h4>
                  </div>

                  <svg viewBox="0 0 260 210" className="w-full h-auto my-auto overflow-visible">
                    <circle cx="212" cy="38" r="18" fill="#fbce12" opacity="0.9" />
                    <rect x="0" y="148" width="260" height="36" rx="6" fill="#140f0a" />
                    <line
                      x1="0"
                      y1="166"
                      x2="260"
                      y2="166"
                      stroke="#fbce12"
                      strokeWidth="2.5"
                      strokeDasharray="16 14"
                      className="anim-road-dashes"
                    />
                    <g transform="translate(26, 98)">
                      <DetailedVolvoCoach scale={1.32} />
                    </g>
                  </svg>

                  <div className="bg-[#140f0a] text-[#f8efdc] p-3.5 rounded-2xl space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#fbce12]">COACH TYPE</span>
                      <span>2+1 AC Sleeper Pod</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white/70">LIVE BERTH FARE</span>
                      <span className="text-[#8ae2a5] font-mono">₹1,450</span>
                    </div>
                  </div>
                </div>

                {/* SCREEN 3: EXPRESS RAIL (Detailed Vande Bharat Train on Viaduct) */}
                <div
                  className={`ms-screen absolute inset-0 bg-gradient-to-b from-[#132a1a] via-[#2b6e3f] to-[#8bc34f] text-[#f8efdc] p-5 pt-12 flex flex-col justify-between ${
                    activeIdx === 2 ? 'ms-on' : ''
                  }`}
                >
                  <div className="space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#fbce12] text-[#140f0a] text-xs font-extrabold">
                      🚆 TATKAL &amp; VISTADOME
                    </span>
                    <h4 className="poster-h2 !text-3xl !text-white">
                      EXPRESS RAIL
                    </h4>
                  </div>

                  <svg viewBox="0 0 260 210" className="w-full h-auto my-auto overflow-visible">
                    <line x1="0" y1="82" x2="260" y2="82" stroke="#fbce12" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path
                      d="M0 144 H260 V192 H230 A22 22 0 0 0 186 192 H152 A22 22 0 0 0 108 192 H74 A22 22 0 0 0 30 192 H0 Z"
                      fill="#140f0a"
                    />
                    <g transform="translate(96, 102)">
                      <DetailedExpressTrain scale={0.98} />
                    </g>
                  </svg>

                  <div className="bg-[#140f0a] text-[#f8efdc] p-3.5 rounded-2xl space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#fbce12]">TATKAL QUOTA</span>
                      <span>1A • 2A • 3A • EC</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white/70">CONFIRMATION</span>
                      <span className="text-[#8ae2a5] font-mono">INSTANT PNR</span>
                    </div>
                  </div>
                </div>

                {/* SCREEN 4: SACRED UMRAH & GLOBAL VISAS */}
                <div
                  className={`ms-screen absolute inset-0 bg-gradient-to-b from-[#171230] via-[#2a1f66] to-[#140f0a] text-[#f8efdc] p-5 pt-12 flex flex-col justify-between ${
                    activeIdx === 3 ? 'ms-on' : ''
                  }`}
                >
                  <div className="space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#fbce12] text-[#140f0a] text-xs font-extrabold">
                      🕋 UMRAH &amp; GLOBAL VISAS
                    </span>
                    <h4 className="poster-h2 !text-3xl !text-[#fbce12]">
                      MAKKAH &amp; GCC
                    </h4>
                  </div>

                  <svg viewBox="0 0 260 210" className="w-full h-auto my-auto">
                    {[
                      [32, 34],
                      [88, 22],
                      [148, 38],
                      [220, 28],
                      [46, 82],
                      [214, 88],
                    ].map(([sx, sy], i) => (
                      <circle
                        key={i}
                        cx={sx}
                        cy={sy}
                        r="2.5"
                        fill="#fbce12"
                        className="anim-star-twinkle"
                        style={{ animationDelay: `${i * 0.4}s` }}
                      />
                    ))}
                    <circle cx="130" cy="118" r="58" fill="#fbce12" opacity="0.16" className="anim-pulse-ring" />
                    <rect
                      x="92"
                      y="74"
                      width="76"
                      height="82"
                      rx="4"
                      fill="#140f0a"
                      stroke="#fbce12"
                      strokeWidth="2.5"
                    />
                    <rect x="92" y="94" width="76" height="14" fill="#fbce12" />
                    <rect x="136" y="118" width="16" height="26" rx="2" fill="#e7c15c" />
                    <g transform="translate(148, 138) rotate(-12)">
                      <rect
                        x="0"
                        y="0"
                        width="96"
                        height="32"
                        rx="6"
                        fill="#8ae2a5"
                        stroke="#140f0a"
                        strokeWidth="2"
                      />
                      <text x="48" y="20" textAnchor="middle" fontSize="11" fontWeight="900" fill="#0c2d17">
                        VISA APPROVED
                      </text>
                    </g>
                  </svg>

                  <div className="bg-white/10 backdrop-blur p-3.5 rounded-2xl space-y-1.5 border border-white/15">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#fbce12]">HARAM PROXIMITY</span>
                      <span>0m – 350m 5★ Hotels</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white/70">VISA &amp; MOFA</span>
                      <span className="text-[#8ae2a5] font-mono">99.8% SUCCESS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 3. HANDS-ON INTERACTIVE TRAVEL LAB (Uses DetailedJetAirliner along Quadratic Bezier Curve!)
 */
const LAB_MODES = [
  {
    key: 'flight-sim',
    badge: '01 • AIRCRAFT SIMULATOR',
    title: 'Fly the Jet & Calculate Baggage',
    bg: '#0f2747',
    ink: '#f8efdc',
    muted: '#c9d6e6',
  },
  {
    key: 'bus-berth',
    badge: '02 • SLEEPER BUS DECK',
    title: 'Interactive Volvo Sleeper Coach',
    bg: '#b5391a',
    ink: '#f8efdc',
    muted: '#fbd9cc',
  },
  {
    key: 'visa-stamp',
    badge: '03 • EMBASSY & MOFA PRESS',
    title: 'Interactive Passport Visa Stamper',
    bg: '#1c3b2b',
    ink: '#f8efdc',
    muted: '#c6e6d4',
  },
  {
    key: 'job-salary',
    badge: '04 • GCC / EUROPE SALARY LAB',
    title: 'Tax-Free Overseas Package Estimator',
    bg: '#2a1f66',
    ink: '#f8efdc',
    muted: '#d6d0ef',
  },
];

export function InteractiveTravelLab() {
  const [labKey, setLabKey] = useState('flight-sim');
  const [flightProgress, setFlightProgress] = useState(55);
  const [baggageKg, setBaggageKg] = useState(35);
  const [selectedBerths, setSelectedBerths] = useState(['L2', 'L3']);
  const [stampPressed, setStampPressed] = useState(false);
  const [stampCount, setStampCount] = useState(1);
  const [stampCountry, setStampCountry] = useState('KUWAIT / UAE 5-YR MULTI');
  const [monthlyAed, setMonthlyAed] = useState(4500);

  const activeLab = LAB_MODES.find((m) => m.key === labKey) || LAB_MODES[0];

  // Quadratic bezier point helper for the airplane simulator (P0=(48,162), P1=(210,24), P2=(372,152))
  const t = flightProgress / 100;
  const planeX = (1 - t) * (1 - t) * 48 + 2 * (1 - t) * t * 210 + t * t * 372;
  const planeY = (1 - t) * (1 - t) * 162 + 2 * (1 - t) * t * 24 + t * t * 152;
  const tangentX = 2 * (1 - t) * (210 - 48) + 2 * t * (372 - 210);
  const tangentY = 2 * (1 - t) * (24 - 162) + 2 * t * (152 - 24);
  const planeAngle = (Math.atan2(tangentY, tangentX) * 180) / Math.PI;

  const toggleBerth = (id, e) => {
    burstAirplanes(e.currentTarget);
    setSelectedBerths((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const triggerStamp = (e) => {
    setStampPressed(true);
    setStampCount((c) => c + 1);
    flyMilesToNav(e.currentTarget, 300);
    setTimeout(() => setStampPressed(false), 550);
  };

  return (
    <section
      id="travel-lab"
      className="py-16 sm:py-24 px-4 sm:px-8 transition-colors duration-500"
      style={{ backgroundColor: activeLab.bg, color: activeLab.ink }}
    >
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-12 gap-10 items-center">
        {/* LEFT 5 COLS */}
        <div className="lg:col-span-5 space-y-5">
          <span className="inline-block px-3 py-1 rounded bg-black/30 text-[#fbce12] font-mono text-xs font-extrabold uppercase tracking-wider">
            INTERACTIVE TRAVEL SANDBOX • TRY WITH YOUR HANDS
          </span>
          <h2 className="poster-h2 !text-[#f8efdc]">
            Don&apos;t just browse. Test-drive your trip.
          </h2>
          <p className="text-sm sm:text-base font-medium" style={{ color: activeLab.muted }}>
            Slide the widebody jet across the flight arc, tap sleeper berths on our Volvo coach deck, or slam the embassy visa stamp below.
          </p>

          <div className="grid grid-cols-2 gap-2.5 pt-2" role="group" aria-label="Choose interactive travel lab">
            {LAB_MODES.map((m) => {
              const isSelected = m.key === labKey;
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={(e) => {
                    setLabKey(m.key);
                    burstAirplanes(e.currentTarget);
                  }}
                  aria-pressed={isSelected}
                  className={`text-left p-3.5 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'bg-[#fbce12] text-[#140f0a] border-[#fbce12] -translate-y-0.5 shadow-lg'
                      : 'bg-transparent text-[#f8efdc] border-current hover:-translate-y-0.5'
                  }`}
                >
                  <b className="block text-[11px] font-extrabold uppercase tracking-wider opacity-85">
                    {m.badge}
                  </b>
                  <span className="text-xs sm:text-sm font-extrabold leading-snug block mt-1">
                    {m.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT 7 COLS */}
        <div className="lg:col-span-7">
          <div className="bg-[#fbf5e6] text-[#1c140c] rounded-xl p-5 sm:p-7 shadow-2xl border-2 border-[#140f0a]">
            {/* LAB 1: FLIGHT SIMULATOR */}
            {labKey === 'flight-sim' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="poster-h2 !text-2xl !text-[#1c140c]">
                    ✈ Live Widebody Jet &amp; Baggage Simulator
                  </h3>
                  <span className="px-2.5 py-1 rounded bg-[#140f0a] text-[#fbce12] font-mono text-xs font-extrabold">
                    ALTITUDE: {Math.round(Math.sin(t * Math.PI) * 38000).toLocaleString()} FT
                  </span>
                </div>

                <svg
                  viewBox="0 0 420 205"
                  className="w-full h-auto rounded-lg bg-gradient-to-b from-[#bae6fd] to-[#e0f2fe] border-2 border-[#140f0a] select-none overflow-hidden"
                >
                  <circle cx="368" cy="40" r="20" fill="#fbce12" />
                  <g fill="#ffffff" opacity="0.88" className="anim-cloud-slow">
                    <circle cx="105" cy="52" r="15" />
                    <circle cx="124" cy="48" r="19" />
                    <circle cx="268" cy="60" r="16" />
                  </g>

                  {/* Landmasses & Ocean */}
                  <path d="M0 172 Q 68 156, 120 182 L 120 205 L 0 205 Z" fill="#8bc34f" />
                  <path d="M300 164 Q 360 150, 420 172 L 420 205 L 300 205 Z" fill="#e7c15c" />
                  <rect x="120" y="180" width="180" height="25" fill="#0284c7" />

                  <text x="16" y="196" fontSize="10.5" fontWeight="900" fill="#140f0a">
                    INDIA (COK / BOM)
                  </text>
                  <text x="308" y="196" fontSize="10.5" fontWeight="900" fill="#140f0a">
                    KUWAIT / DUBAI / JED
                  </text>

                  {/* Dashed Flight Trajectory */}
                  <path
                    d="M 48 162 Q 210 24 372 152"
                    fill="none"
                    stroke="#140f0a"
                    strokeWidth="2.2"
                    strokeDasharray="6 6"
                    opacity="0.35"
                  />

                  <circle cx="48" cy="162" r="6" fill="#2a1f66" />
                  <circle cx="372" cy="152" r="6" fill="#b5391a" />

                  {/* Detailed Jet Airliner Positioned & Rotated Tangent to Curve */}
                  <g transform={`translate(${planeX}, ${planeY}) rotate(${planeAngle})`}>
                    <DetailedJetAirliner scale={0.78} />
                  </g>
                </svg>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <div className="flex justify-between text-xs font-extrabold uppercase mb-1">
                      <span>Slide Aircraft Along Route</span>
                      <b className="font-mono text-sm text-[#b5391a]">{flightProgress}% Flown</b>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={flightProgress}
                      onChange={(e) => setFlightProgress(Number(e.target.value))}
                      className="saxaz-range w-full"
                    />
                  </label>

                  <label className="block">
                    <div className="flex justify-between text-xs font-extrabold uppercase mb-1">
                      <span>Luggage Allowance (KG)</span>
                      <b className="font-mono text-sm text-[#0077b6]">{baggageKg} KG</b>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="60"
                      step="5"
                      value={baggageKg}
                      onChange={(e) => setBaggageKg(Number(e.target.value))}
                      className="saxaz-range w-full"
                    />
                  </label>
                </div>

                <div className="p-3.5 rounded-lg bg-[#e9dec6] flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs sm:text-sm font-bold">
                    {flightProgress === 100
                      ? '🎉 Touchdown! Priority immigration & baggage belt ready.'
                      : `✈️ Cruising at Mach 0.84 with ${baggageKg}kg student/NRI baggage allowance.`}
                  </div>
                  <a
                    href={buildWhatsAppUrl(
                      `Hello Flyzo Travels! I want to book a flight with ${baggageKg}KG baggage allowance.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded bg-[#140f0a] text-[#fbce12] text-xs font-extrabold"
                  >
                    Lock {baggageKg}KG Fare →
                  </a>
                </div>
              </div>
            )}

            {/* LAB 2: INTERACTIVE LUXURY SLEEPER BUS DECK */}
            {labKey === 'bus-berth' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="poster-h2 !text-2xl !text-[#1c140c]">
                    🚌 Tap Berths on the Volvo Multi-Axle Deck
                  </h3>
                  <span className="px-2.5 py-1 rounded bg-[#140f0a] text-[#fbce12] font-mono text-xs font-extrabold">
                    SELECTED: {selectedBerths.length ? selectedBerths.join(', ') : 'NONE'}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[#fffaf0] border-2 border-[#140f0a]">
                  <div className="flex items-center justify-between text-xs font-extrabold uppercase text-[#5a4d3c] mb-3 pb-2 border-b border-[#d6c8ab]">
                    <span>🛞 FRONT COCKPIT • CAPTAIN CABIN</span>
                    <span className="text-[#1f6b35]">● GREEN = SELECTED ({selectedBerths.length} BERTHS)</span>
                  </div>

                  <div className="grid grid-cols-6 gap-2.5">
                    {['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'U1', 'U2', 'U3', 'U4', 'U5', 'U6'].map((berth) => {
                      const isSel = selectedBerths.includes(berth);
                      return (
                        <button
                          key={berth}
                          type="button"
                          onClick={(e) => toggleBerth(berth, e)}
                          className={`py-3 px-2 rounded-lg border-2 border-[#140f0a] font-mono text-xs font-extrabold transition-all flex flex-col items-center gap-1 ${
                            isSel
                              ? 'bg-[#8ae2a5] text-[#0c2d17] -translate-y-1 shadow-[0_4px_0_#140f0a]'
                              : 'bg-[#efe7d5] text-[#1c140c] hover:bg-[#fbce12]'
                          }`}
                        >
                          <span>{berth}</span>
                          <span className="text-[9px] uppercase opacity-75">
                            {berth.startsWith('L') ? 'Lower' : 'Upper'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#e9dec6] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-[#5a4d3c] block">ESTIMATED TOTAL FARE</span>
                    <b className="poster-num text-2xl text-[#1c140c]">
                      ₹{(selectedBerths.length * 1450).toLocaleString('en-IN')}
                    </b>{' '}
                    <span className="text-xs font-bold">({selectedBerths.length} AC Sleeper Berths)</span>
                  </div>
                  <a
                    href={buildWhatsAppUrl(
                      `Hello Flyzo Travels! Please reserve AC Sleeper Bus Berths: ${selectedBerths.join(', ')}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded bg-[#140f0a] text-[#fbce12] text-xs font-extrabold"
                  >
                    Book Selected Berths on WhatsApp →
                  </a>
                </div>
              </div>
            )}

            {/* LAB 3: PASSPORT VISA & ATTESTATION STAMP PRESS */}
            {labKey === 'visa-stamp' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="poster-h2 !text-2xl !text-[#1c140c]">
                    🛂 Slam the Official Embassy / Visa Stamp!
                  </h3>
                  <span className="px-2.5 py-1 rounded bg-[#140f0a] text-[#fbce12] font-mono text-xs font-extrabold">
                    STAMPS ISSUED: {stampCount}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    'KUWAIT / UAE 5-YR MULTI',
                    'SAUDI UMRAH E-VISA',
                    'SCHENGEN EUROPE VISA',
                    'MEA + MOFA ATTESTED',
                  ].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setStampCountry(c)}
                      className={`px-3 py-1.5 rounded-full text-xs font-extrabold border border-[#140f0a] ${
                        stampCountry === c ? 'bg-[#140f0a] text-[#fbce12]' : 'bg-white text-[#140f0a]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div className="relative h-48 rounded-lg bg-[#fffdf7] border-2 border-[#140f0a] p-4 overflow-hidden flex items-center justify-between">
                  <div className="space-y-1 z-10">
                    <span className="text-[10px] font-mono font-extrabold uppercase text-[#8a2f10]">
                      REPUBLIC PASSPORT • VISA ENDORSEMENT PAGE
                    </span>
                    <p className="text-sm font-extrabold text-[#1c140c]">
                      Selected Clearance: <span className="text-[#b5391a]">{stampCountry}</span>
                    </p>
                    <p className="text-xs text-[#5a4d3c] font-semibold max-w-xs">
                      Click the Stamp Handle below to physically press the ink seal onto the passport!
                    </p>
                  </div>

                  <div
                    className={`transition-transform duration-300 select-none ${
                      stampPressed ? 'scale-125 rotate-[-14deg]' : 'scale-100 rotate-[-8deg]'
                    }`}
                  >
                    <div className="border-4 border-[#1f6b35] text-[#1f6b35] rounded-xl px-4 py-2 text-center font-mono font-black shadow-sm bg-[#dcf0d6]/60">
                      <span className="block text-[10px] tracking-widest">FLYZO EMBASSY DESK</span>
                      <strong className="block text-sm sm:text-base">{stampCountry}</strong>
                      <span className="block text-[10px]">APPROVED • 99.8% VERIFIED</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={triggerStamp}
                    className="tactile-btn flex-1 py-3.5 px-6 bg-[#fbce12] text-[#140f0a] border-2 border-[#140f0a] text-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>SLAM VISA STAMP (+300 MILES)</span>
                  </button>
                  <a
                    href="#visa-services"
                    className="tactile-btn py-3.5 px-5 bg-[#140f0a] text-[#fbce12] text-sm"
                  >
                    Open Visa Desk ↓
                  </a>
                </div>
              </div>
            )}

            {/* LAB 4: OVERSEAS JOB SALARY CALCULATOR */}
            {labKey === 'job-salary' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="poster-h2 !text-2xl !text-[#1c140c]">
                    💼 GCC &amp; Europe Tax-Free Remittance Calculator
                  </h3>
                  <span className="px-2.5 py-1 rounded bg-[#140f0a] text-[#fbce12] font-mono text-xs font-extrabold">
                    FREE FOOD + ACCOMMODATION
                  </span>
                </div>

                <label className="block pt-2">
                  <div className="flex justify-between text-xs font-extrabold uppercase mb-1">
                    <span>Monthly GCC Salary (AED / SAR / KWD Equiv.)</span>
                    <b className="font-mono text-base text-[#2a1f66]">{monthlyAed.toLocaleString()} AED / mo</b>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="15000"
                    step="500"
                    value={monthlyAed}
                    onChange={(e) => setMonthlyAed(Number(e.target.value))}
                    className="saxaz-range w-full"
                  />
                </label>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-lg bg-[#e9dec6] border border-[#140f0a]/20">
                    <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block">
                      MONTHLY IN-HAND (INR)
                    </span>
                    <b className="poster-num text-2xl sm:text-3xl text-[#1c140c]">
                      ₹{Math.round(monthlyAed * 22.8).toLocaleString('en-IN')}
                    </b>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#dcf0d6] border border-[#1f6b35]/30">
                    <span className="text-[10px] font-extrabold uppercase text-[#1f6b35] block">
                      2-YEAR CONTRACT SAVINGS
                    </span>
                    <b className="poster-num text-2xl sm:text-3xl text-[#0c2d17]">
                      ₹{Math.round(monthlyAed * 22.8 * 24).toLocaleString('en-IN')}
                    </b>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="text-xs font-bold text-[#5a4d3c]">
                    100% Verified Wakala • Direct Company Visa
                  </span>
                  <a
                    href="#jobs"
                    className="px-4 py-2.5 rounded bg-[#140f0a] text-[#fbce12] text-xs font-extrabold"
                  >
                    View Matching Jobs ↓
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 4. SCROLL-PINNED "365 DAYS OF GLOBAL DEPARTURES" WALL (Exact SAXAZ .wall.pinned + palmSVG!)
 * Fixed the palm & aircraft illustration so it uses the exact SAXAZ coconut palm plus a crisp widebody airliner!
 */
const WALL_MILESTONES = [
  [1, '1st Morning Takeoff — Kuwait, Dubai & Kochi Boarding Gates Open.'],
  [14, '14 Days of Sacred Makkah & Madinah Umrah Groups Departing.'],
  [60, '60+ Daily Express Visas, MEA & MOFA Certificates Stamped.'],
  [180, 'Half a Year of Non-Stop Flights, IRCTC Trains & Luxury Buses.'],
  [365, '365 Days a Year — 24/7 Live Human Travel & Recruitment Desk!'],
];

const TILE_COLORS = ['#f9823f', '#fbce12', '#8bc34f', '#2fb1e8', '#b8a0d0', '#8fbaab'];

export function ScrollPinnedDepartureWall() {
  const [litDays, setLitDays] = useState(365);
  const wallRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = wallRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) return;

      const range = Math.max(1, r.height - (window.innerHeight - 76));
      const p = Math.max(0, Math.min(1, (76 - r.top) / range));
      const computed = Math.max(1, Math.round(365 * Math.pow(Math.min(1, p / 0.94), 1.8)));
      setLitDays(computed);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const milestone =
    [...WALL_MILESTONES].reverse().find(([d]) => litDays >= d) || WALL_MILESTONES[0];
  const growScale = Math.sqrt(litDays / 365);

  return (
    <section
      ref={wallRef}
      className="bg-[#120e0b] text-[#f8efdc] lg:h-[240vh] relative px-4 sm:px-8 py-16 lg:py-0"
    >
      <div className="lg:sticky lg:top-[76px] lg:h-[calc(100dvh-76px)] max-w-[1240px] mx-auto flex flex-col justify-center gap-6 overflow-hidden">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#fbce12] block mb-1">
              SCROLL TO LIGHT UP ALL 365 DEPARTURE DAYS
            </span>
            <h2 className="poster-h2 !text-[#f8efdc]">
              What 365 days of non-stop departures looks like.
            </h2>
          </div>
          <div className="flex gap-2">
            {[1, 60, 180, 365].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={(e) => {
                  setLitDays(preset);
                  burstAirplanes(e.currentTarget);
                }}
                className={`px-3 py-1 rounded-full font-mono text-xs font-extrabold border ${
                  litDays === preset
                    ? 'bg-[#fbce12] text-[#140f0a] border-[#fbce12]'
                    : 'border-white/20 text-white/70 hover:text-white'
                }`}
              >
                Day {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left 5 Cols: Giant Animated Number Counter + Exact SAXAZ Growing Palm & Detailed Jet */}
          <div className="lg:col-span-5 relative flex items-center justify-between bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="space-y-1 z-10">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#fbce12]">
                DEPARTURE DAY
              </p>
              <b
                className="block font-extrabold leading-[0.86] text-[#f8efdc] font-mono"
                style={{
                  fontFamily: 'var(--display)',
                  fontStretch: '75%',
                  fontSize: 'clamp(4.5rem, 11vw, 8.2rem)',
                }}
              >
                {litDays}
              </b>
              <p
                key={milestone[0]}
                className="text-sm sm:text-base font-bold text-[#fbce12] max-w-[24ch] pt-1 animate-fadeIn"
              >
                {milestone[1]}
              </p>
            </div>

            {/* Exact SAXAZ Growing Kerala Palm + Detailed Widebody Jet Soaring Overhead */}
            <svg viewBox="0 0 170 210" className="w-32 sm:w-40 h-44 shrink-0 overflow-visible" aria-hidden="true">
              <g
                style={{
                  transformOrigin: '70px 196px',
                  transform: `scale(${0.22 + 0.78 * growScale})`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                {/* Palm Trunk */}
                <path d="M70 198Q62 120 78 62" fill="none" stroke="#a9794a" strokeWidth="9" strokeLinecap="round" />
                {/* Palm Fronds */}
                <g fill="#8bc34f">
                  <path transform="translate(78 62) rotate(-16)" d="M0 0Q30-20 62 6Q30-5 0 0z" />
                  <path transform="translate(78 62) rotate(26) scale(.95)" d="M0 0Q30-20 62 6Q30-5 0 0z" />
                  <path transform="translate(78 62) rotate(64) scale(.8)" d="M0 0Q30-20 62 6Q30-5 0 0z" />
                  <path transform="translate(78 62) rotate(-58) scale(.85)" d="M0 0Q30-20 62 6Q30-5 0 0z" />
                  <path transform="translate(78 62) rotate(160)" d="M0 0Q30-20 62 6Q30-5 0 0z" />
                  <path transform="translate(78 62) rotate(198) scale(.95)" d="M0 0Q30-20 62 6Q30-5 0 0z" />
                  <path transform="translate(78 62) rotate(236) scale(.8)" d="M0 0Q30-20 62 6Q30-5 0 0z" />
                </g>
                {/* Coconuts */}
                <g
                  fill="#7a4a22"
                  style={{ opacity: Math.max(0, Math.min(1, (growScale - 0.72) * 5)) }}
                >
                  <circle cx="70" cy="72" r="6.5" />
                  <circle cx="84" cy="74" r="6.5" />
                  <circle cx="77" cy="82" r="6.5" />
                </g>
                {/* Detailed Jet Airliner Soaring Above the Palm */}
                <g transform={`translate(${92}, ${22}) rotate(-18)`}>
                  <DetailedJetAirliner scale={0.68} />
                </g>
              </g>
              <path d="M18 198h120" stroke="#f8efdc" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Right 7 Cols: 365 Departure Tiles Grid */}
          <div
            className="lg:col-span-7 grid gap-[3px] sm:gap-1"
            style={{ gridTemplateColumns: 'repeat(25, minmax(0, 1fr))' }}
            aria-hidden="true"
          >
            {Array.from({ length: 365 }, (_, i) => {
              const isOn = i < litDays;
              const isTip = i === litDays - 1 && litDays < 365;
              const color = TILE_COLORS[Math.floor(i / 30.42) % TILE_COLORS.length];
              return (
                <i
                  key={i}
                  className={`aspect-square rounded-[3px] transition-transform duration-200 ${
                    isTip ? 'scale-150 ring-2 ring-white z-10' : isOn ? 'scale-100' : 'scale-90'
                  }`}
                  style={{
                    backgroundColor: isOn ? color : 'rgba(248, 239, 220, 0.09)',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
