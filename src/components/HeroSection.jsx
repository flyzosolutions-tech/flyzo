import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Plane, Train, Bus, Compass, Moon, ShieldCheck,
  FileCheck2, Briefcase, MessageCircle, ArrowRight, RotateCcw, CheckCircle2
} from 'lucide-react';
import { CaptainZizo, FlyzoMarkSVG, JetVectorIcon, StarDiamondVectorIcon } from './FlyzoBrandArt';
import { AnimatedTransitPanorama, burstAirplanes, flyMilesToNav } from './TravelAnimations';
import { useSiteContent } from '../context/ContentContext';

const TICKER_ITEMS = [
  '1. FLYZO TRAVELS HOME',
  '2. INTERNATIONAL & DOMESTIC TOURIST PACKAGES',
  '3. SACRED UMRAH & RAMADAN ZIYARAT',
  '4. 99.8% GLOBAL VISA STAMPING',
  '5. MEA, EMBASSY & MOFA ATTESTATION',
  '6. GCC & EUROPE JOB RECRUITMENT',
  '7. INSTAGRAM REELS',
  '8. FACEBOOK COMMUNITY',
  '9. LINKEDIN CORPORATE',
  '10. 24/7 WHATSAPP ENQUIRY',
  '11. FLIGHT • IRCTC TRAIN • VOLVO BUS TICKETS',
];

export default function HeroSection({ onSelectEnquiry }) {
  const { content, buildWaUrl } = useSiteContent();
  const hero = content.hero;
  const dailyDeals = content.dailyDeals;
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [tearing, setTearing] = useState(false);
  const [torn, setTorn] = useState(false);
  const [zizoSpeech, setZizoSpeech] = useState('');
  const pendulumRef = useRef(null);
  const physicsRef = useRef({
    angle: -1.4,
    vel: 0,
    rafId: null,
    startLoop: null,
  });

  const kickPendulum = useCallback((impulseDeg = 1.6) => {
    const p = physicsRef.current;
    p.vel = Math.max(-2.2, Math.min(2.2, p.vel + impulseDeg));
    if (p.startLoop) p.startLoop();
  }, []);

  // Touch-Swipe, Scroll & Desktop Pointer Pendulum Physics (strictly bounded inside screen)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let touchStartX = null;
    let lastMouseX = null;
    const p = physicsRef.current;
    const restAngle = -1.4;

    const applyTransform = (deg) => {
      if (!pendulumRef.current) return;
      pendulumRef.current.style.transform = `rotate(${deg.toFixed(2)}deg)`;
    };

    const step = () => {
      const springForce = (restAngle - p.angle) * 0.08;
      p.vel = (p.vel + springForce) * 0.86;
      p.angle = Math.max(-5.2, Math.min(3.6, p.angle + p.vel));

      applyTransform(p.angle);

      if (Math.abs(restAngle - p.angle) > 0.015 || Math.abs(p.vel) > 0.015) {
        p.rafId = requestAnimationFrame(step);
      } else {
        p.angle = restAngle;
        applyTransform(p.angle);
        p.rafId = null;
      }
    };

    const startLoop = () => {
      if (!p.rafId) {
        p.rafId = requestAnimationFrame(step);
      }
    };
    p.startLoop = startLoop;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY;
      lastScrollY = y;
      if (y > window.innerHeight * 1.2 || !dy) return;
      p.vel = Math.max(-1.8, Math.min(1.8, p.vel + Math.max(-0.5, Math.min(0.5, dy * 0.0075))));
      startLoop();
    };

    const el = pendulumRef.current;
    const onTouchStart = (e) => {
      if (e.touches?.length === 1) {
        touchStartX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e) => {
      if (touchStartX === null || !e.touches?.length) return;
      const dx = e.touches[0].clientX - touchStartX;
      touchStartX = e.touches[0].clientX;
      p.vel = Math.max(-1.8, Math.min(1.8, p.vel - dx * 0.038));
      startLoop();
    };
    const onTouchEnd = () => {
      touchStartX = null;
    };

    const onMouseMove = (e) => {
      if (lastMouseX !== null) {
        const dx = e.clientX - lastMouseX;
        p.vel = Math.max(-1.2, Math.min(1.2, p.vel - dx * 0.012));
        startLoop();
      }
      lastMouseX = e.clientX;
    };
    const onMouseLeave = () => {
      lastMouseX = null;
    };

    applyTransform(p.angle);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (el) {
      el.addEventListener('touchstart', onTouchStart, { passive: true });
      el.addEventListener('touchmove', onTouchMove, { passive: true });
      el.addEventListener('touchend', onTouchEnd, { passive: true });
      el.addEventListener('mousemove', onMouseMove, { passive: true });
      el.addEventListener('mouseleave', onMouseLeave, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (el) {
        el.removeEventListener('touchstart', onTouchStart);
        el.removeEventListener('touchmove', onTouchMove);
        el.removeEventListener('touchend', onTouchEnd);
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseleave', onMouseLeave);
      }
      if (p.rafId) cancelAnimationFrame(p.rafId);
    };
  }, []);

  const handleTearPage = (e) => {
    if (e?.currentTarget) burstAirplanes(e.currentTarget);
    setTearing(true);
    kickPendulum(2.0);
    setTimeout(() => {
      setTearing(false);
      setTorn(true);
      kickPendulum(-1.2);
    }, 720);
  };

  const today = new Date();
  const dayNum = today.getDate();
  const monthName = today.toLocaleString('en-US', { month: 'long' });
  const weekdayName = today.toLocaleString('en-US', { weekday: 'long' });

  return (
    <>
      <header id="home" className="oxide-wall relative pt-32 sm:pt-36 pb-16 px-4 sm:px-8 overflow-hidden">
        {/* Giant Ghost Word in Background (exact SAXAZ .p-hero .ghost) */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -left-8 -bottom-24 font-extrabold leading-none text-[#9e2e0e] opacity-90"
          style={{
            fontFamily: 'var(--display)',
            fontStretch: '75%',
            fontSize: 'clamp(16rem, 36vw, 38rem)',
            zIndex: 0,
          }}
        >
          FLYZO
        </span>

        <div className="relative z-10 max-w-[1320px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COLUMN: Massive Poster Headline & 11-Service Quick Matrix */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-[#f8efdc] text-[#f8efdc] text-xs font-extrabold uppercase tracking-[0.14em]">
              <span>{hero.badge}</span>
            </div>

            <h1
              className="poster-h1 text-[#f8efdc]"
              style={{ fontSize: 'clamp(2.85rem, 7.6vw, 7.2rem)' }}
            >
              <mark className="bg-transparent text-[#fbce12]">{hero.headlineHighlight}</mark>{' '}
              {hero.headlineMain}
              <span className="block mt-2 text-[0.46em] leading-[1.08] tracking-normal normal-case font-extrabold text-[#f8efdc]">
                {hero.headlineSub}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#f8efdc] max-w-[50ch] font-medium leading-relaxed">
              {hero.description}
            </p>

            {/* Primary Tactile CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="#tickets"
                className="tactile-btn px-7 py-4 bg-[#140f0a] text-[#fbce12] text-base sm:text-lg"
              >
                <span>Book Flight, Train or Bus</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={buildWaUrl("Hello Flyzo Travels! I want to book / enquire via your WhatsApp Desk.")}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-btn px-6 py-4 border-2 border-[#f8efdc] text-[#f8efdc] hover:bg-[#f8efdc] hover:text-[#140f0a] text-sm sm:text-base"
              >
                <MessageCircle className="w-5 h-5" />
                <span>24/7 WhatsApp Desk</span>
              </a>
            </div>

            {/* Quick Service Jump Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 text-xs sm:text-sm font-bold text-[#f8efdc]">
              <a href="#tourist-packages" className="pr-3 border-r border-[#f8efdc]/40 hover:text-[#fbce12] flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> Tourist Packages
              </a>
              <a href="#umrah-packages" className="px-3 border-r border-[#f8efdc]/40 hover:text-[#fbce12] flex items-center gap-1">
                <Moon className="w-3.5 h-3.5" /> Umrah Packages
              </a>
              <a href="#visa-services" className="px-3 border-r border-[#f8efdc]/40 hover:text-[#fbce12] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Global Visas
              </a>
              <a href="#attestation" className="px-3 border-r border-[#f8efdc]/40 hover:text-[#fbce12] flex items-center gap-1">
                <FileCheck2 className="w-3.5 h-3.5" /> Certificate Attestation
              </a>
              <a href="#jobs" className="pl-3 hover:text-[#fbce12] flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" /> Overseas Jobs
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Hanging Tear-Off Boarding Calendar on a Nail (SAXAZ Signature Hero Artifact) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end pt-12 px-2.5 sm:px-0">
            <div className="relative w-full max-w-[430px]">
              {/* The Iron Nail (Fixed on the Terracotta Wall) */}
              <span
                aria-hidden="true"
                className="absolute z-30 left-1/2 -top-[50px] w-4 h-4 -ml-2 rounded-full bg-[#1b1511]"
                style={{
                  boxShadow:
                    'inset -3px -3px 0 #000, inset 2px 2px 0 #55493d, 3px 8px 6px rgba(60,15,0,0.55)',
                }}
              />

              {/* Gyro + Scroll + Touch Pendulum Assembly swinging from the Iron Nail */}
              <div
                ref={pendulumRef}
                className="relative w-full"
                style={{
                  transform: 'rotate(-1.4deg)',
                  transformOrigin: '50% -46px',
                  willChange: 'transform',
                }}
              >
                <svg
                  viewBox="0 0 200 54"
                  aria-hidden="true"
                  className="absolute z-10 left-1/2 -top-[52px] w-[200px] h-[54px] -ml-[100px] overflow-visible"
                >
                  <path d="M100 4L34 52M100 4l66 48" fill="none" stroke="#1b1511" strokeWidth="2.2" />
                </svg>

              {/* Captain Zizo perched on top right of the calendar */}
              <div className="absolute z-20 right-4 -top-[64px] flex items-center">
                {zizoSpeech && (
                  <span className="mr-2 px-3 py-1.5 rounded-xl bg-[#140f0a] text-[#fbce12] text-xs font-extrabold whitespace-nowrap shadow-md">
                    {zizoSpeech}
                  </span>
                )}
                <CaptainZizo
                  size={68}
                  onClick={() =>
                    setZizoSpeech(
                      zizoSpeech
                        ? ''
                        : 'Marhaba! Pick a dispatch deal below!'
                    )
                  }
                />
              </div>

              {/* Top Black Header Band with Punch Rings */}
              <div className="relative z-20 flex items-center justify-between h-[50px] px-4 bg-[#140f0a] rounded-t-md">
                <FlyzoMarkSVG variant="dark" className="h-5 w-auto" />
                <div className="flex gap-10">
                  <i className="w-3 h-3 rounded-full bg-[#b5391a] shadow-inner block" />
                  <i className="w-3 h-3 rounded-full bg-[#b5391a] shadow-inner block" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#fbce12] uppercase">
                  GATE #01
                </span>
              </div>

              {/* Kasavu Gold Band under Header */}
              <div
                aria-hidden="true"
                className="h-[9px]"
                style={{
                  background:
                    'linear-gradient(180deg, #e7c15c 0 2px, #fbf5e6 2px 3px, #c4942e 3px 6px, #fbf5e6 6px 7px, #e7c15c 7px)',
                }}
              />

              {/* Tear-off Paper Sheets Container */}
              <div className="paper-stack relative">
                {!torn ? (
                  <article
                    className={`perforated-top page-curl p-5 space-y-3.5 bg-[#fbf5e6] rounded-b-md ${
                      tearing ? 'tearing-sheet' : ''
                    }`}
                  >
                    {/* Calendar Date Header */}
                    <header className="flex items-center justify-between gap-4 border-b-[3px] border-[#1c140c] pb-3">
                      <div className="flex items-center gap-3.5">
                        <b className="poster-num text-6xl sm:text-7xl text-[#b5391a]">
                          {dayNum}
                        </b>
                        <div className="text-xs sm:text-sm leading-tight text-[#1c140c]">
                          <p className="font-extrabold uppercase">{monthName} {today.getFullYear()}</p>
                          <p className="text-[#5a4d3c] font-bold">{weekdayName}</p>
                          <p className="mt-1 pt-1 border-t border-[#1c140c] font-mono text-[11px] font-bold text-[#8a2f10]">
                            DAILY DEPARTURE BOARD
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-[10px] font-extrabold uppercase">
                        <span className="px-2 py-0.5 rounded bg-[#140f0a] text-[#fbce12]">
                          LIVE FARES
                        </span>
                        <span className="text-[#5a4d3c]">TAP TO LOCK</span>
                      </div>
                    </header>

                    <div>
                      <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#a5310f]">
                        {hero.calendarTitle}
                      </h2>
                      <p className="text-base sm:text-lg font-extrabold text-[#1c140c] leading-snug mt-0.5">
                        {hero.calendarQuestion}
                      </p>
                    </div>

                    {/* Interactive Deal Options (like SAXAZ's A/B/C daily question) */}
                    <div className="space-y-2">
                      {dailyDeals.map((deal) => {
                        const isPicked = selectedDeal?.code === deal.code;
                        return (
                          <button
                            key={deal.code}
                            type="button"
                            onClick={(e) => {
                              setSelectedDeal(deal);
                              setZizoSpeech('Awesome choice! +300 Miles! Tear off your pass!');
                              kickPendulum(1.2);
                              flyMilesToNav(e.currentTarget, 300);
                            }}
                            className={`w-full text-left px-3 py-2.5 rounded border-[1.5px] border-[#1c140c] flex items-center justify-between gap-2 transition-all font-bold text-xs sm:text-sm ${
                              isPicked
                                ? 'bg-[#8ae2a5] text-[#0c2d17] translate-x-1'
                                : 'bg-transparent text-[#1c140c] hover:bg-[#1c140c] hover:text-[#fbce12]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <b className="w-6 h-6 rounded bg-[#140f0a] text-[#fbce12] grid place-items-center text-xs shrink-0">
                                {deal.code}
                              </b>
                              <span className="truncate">{deal.title}</span>
                            </div>
                            <span className="font-mono font-extrabold shrink-0">
                              {deal.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Verdict + Tear-Off Button */}
                    {selectedDeal && (
                      <div className="space-y-2.5 pt-1 animate-fadeIn">
                        <p className="text-xs text-[#1c140c] bg-[#e9dec6] p-2.5 rounded border border-[#1c140c]/20 font-semibold">
                          <strong className="text-[#8a2f10] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Deal Selected:
                          </strong>{' '}
                          {selectedDeal.reply}
                        </p>
                        <button
                          type="button"
                          onClick={handleTearPage}
                          className="w-full py-3 px-4 rounded bg-[#140f0a] hover:bg-black text-[#fbce12] font-extrabold text-xs sm:text-sm flex items-center justify-between"
                        >
                          <span>Tear Off Today&apos;s Boarding Pass</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* 7-Destination Stamp Strip (Exact SAXAZ .strk-days 7-circle strip!) */}
                    <div className="pt-2.5 border-t border-dashed border-[#b9aa8b] space-y-2">
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {[
                          ['DXB', '#f9823f'],
                          ['JED', '#fbce12'],
                          ['SIN', '#8bc34f'],
                          ['LON', '#2fb1e8'],
                          ['PAR', '#b8a0d0'],
                          ['KUL', '#8fbaab'],
                          ['DOH', '#f9823f'],
                        ].map(([code, col], idx) => {
                          const isLit = !!selectedDeal;
                          return (
                            <div key={code} className="flex flex-col items-center gap-0.5">
                              <span
                                className={`w-7 h-7 rounded-full grid place-items-center text-[10px] font-extrabold transition-all duration-300 ${
                                  isLit ? 'scale-105 text-[#140f0a] shadow-sm' : 'bg-[#e9dec6] text-[#5a4d3c]'
                                }`}
                                style={{
                                  backgroundColor: isLit ? col : undefined,
                                  transitionDelay: `${idx * 55}ms`,
                                }}
                              >
                                <JetVectorIcon className="w-3.5 h-3.5" />
                              </span>
                              <span className="font-mono text-[9px] font-extrabold text-[#5a4d3c]">
                                {code}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#5a4d3c]">
                        <div className="flex items-center gap-1.5">
                          <Plane className="w-3.5 h-3.5 text-[#b5391a]" />
                          <Train className="w-3.5 h-3.5 text-[#1aa3e4]" />
                          <Bus className="w-3.5 h-3.5 text-[#8bc34f]" />
                          <span>Air • Rail • Volvo Sleeper</span>
                        </div>
                        <span className="text-[#8a2f10] font-extrabold">
                          {selectedDeal ? 'All 7 Hubs Lit! +300 Miles' : 'Tap A, B or C to Light Up'}
                        </span>
                      </div>
                    </div>
                  </article>
                ) : (
                  /* Underneath Sheet Revealed After Tearing! */
                  <article className="p-6 space-y-4 bg-[#fbf5e6] rounded-b-md relative">
                    {/* Torn Jagged Paper Stub at Top */}
                    <svg
                      viewBox="0 0 400 12"
                      preserveAspectRatio="none"
                      className="w-full h-3 -mt-6 mb-2"
                    >
                      <path
                        d="M0 0H400V5l-16 4-22-5-18 6-26-4-20 5-24-6-18 5-28-3-20 5-24-5-22 4-18-5-26 5-20-4-26 5-18-5-14 3z"
                        fill="#e5d8bb"
                      />
                    </svg>

                    <div className="inline-block px-2.5 py-1 rounded bg-[#8ae2a5] text-[#0c2d17] text-xs font-extrabold uppercase">
                      BOARDING PASS UNLOCKED • PRIORITY DESK
                    </div>

                    <h3 className="poster-h2 !text-2xl sm:!text-3xl !text-[#1c140c]">
                      {selectedDeal?.title} — {selectedDeal?.price}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#5a4d3c] font-semibold">
                      {selectedDeal?.reply} Claim this priority rate on WhatsApp or via our callback desk below:
                    </p>

                    <div className="space-y-2 pt-1">
                      <a
                        href={buildWaUrl(
                          `Hello Flyzo Travels! I tore off today's Boarding Pass for *${selectedDeal?.title}* (${selectedDeal?.price}). Please lock this deal for me!`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 rounded bg-[#140f0a] text-[#fbce12] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Claim Pass on WhatsApp Now</span>
                      </a>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onSelectEnquiry(
                              `Boarding Pass Deal: ${selectedDeal?.title} (${selectedDeal?.price})`
                            )
                          }
                          className="flex-1 py-2.5 px-3 rounded border-[1.5px] border-[#1c140c] text-[#1c140c] font-extrabold text-xs hover:bg-[#fbce12]"
                        >
                          Use Callback Form
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTorn(false);
                            setSelectedDeal(null);
                          }}
                          className="py-2.5 px-3 rounded border border-[#b9aa8b] text-[#5a4d3c] font-bold text-xs flex items-center gap-1 hover:text-[#1c140c]"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Reset Sheet
                        </button>
                      </div>
                    </div>
                  </article>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Flat Marigold Yellow Marquee Ribbon directly under the Terracotta Wall (exact SAXAZ .ribbon) */}
      <div className="ribbon-marquee" aria-hidden="true">
        <div className="ribbon-track py-3">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-5 font-extrabold text-sm sm:text-base tracking-wide uppercase"
              style={{ fontFamily: 'var(--display)', fontStretch: '85%' }}
            >
              <span>{item}</span>
              <StarDiamondVectorIcon className="w-3 h-3 text-[#b5391a]" />
            </span>
          ))}
        </div>
      </div>

      {/* Live Animated Airplane, Luxury Sleeper Bus & Express Train Panorama Strip */}
      <AnimatedTransitPanorama />
    </>
  );
}
