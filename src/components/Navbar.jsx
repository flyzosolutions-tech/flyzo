import React, { useState, useEffect } from 'react';
import {
  Sun, Moon, MessageCircle, Menu, X
} from 'lucide-react';
import { FlyzoMarkSVG, JetVectorIcon } from './FlyzoBrandArt';
import { useSiteContent } from '../context/ContentContext';

const NAV_LINKS = [
  { id: 'tickets', label: 'Tickets' },
  { id: 'tourist-packages', label: 'Holidays' },
  { id: 'umrah-packages', label: 'Umrah' },
  { id: 'visa-services', label: 'Visas' },
  { id: 'attestation', label: 'Attestation' },
  { id: 'jobs', label: 'Jobs' },
  { id: 'social-hub', label: 'Socials' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ theme, onToggleTheme, onQuickEnquire }) {
  const { buildWaUrl: buildWhatsAppUrl } = useSiteContent();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [airMiles, setAirMiles] = useState(250);

  useEffect(() => {
    const onScroll = () => {
      const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(1, window.scrollY / total));
    };
    const onMiles = (e) => {
      setAirMiles((prev) => prev + (e.detail?.miles || 250));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('flyzo:miles', onMiles);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('flyzo:miles', onMiles);
    };
  }, []);

  const scrollToId = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Flyzo Travels Main Navigation"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[min(1240px,calc(100vw-20px))] rounded-full border border-[var(--line)] bg-[var(--glass)] backdrop-blur-md shadow-lg overflow-hidden transition-colors"
    >
      <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-1.5">
        {/* Left: Official Flyzo Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] shrink-0 shadow-sm"
          title="Flyzo Travels Home"
        >
          <FlyzoMarkSVG
            variant={theme === 'dark' ? 'dark' : 'light'}
            className="h-5 sm:h-6 w-auto"
          />
        </a>

        {/* Center Links (SAXAZ Pill Buttons) */}
        <div className="hidden lg:flex items-center gap-0.5 mx-auto min-w-0">
          {NAV_LINKS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-extrabold text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--sunk)] transition-colors whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Controls: Miles Chip, Theme Toggle, WhatsApp & Enquire CTA */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Live Air Miles Pill */}
          <span
            id="flyzo-nav-miles"
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fbce12] text-[#140f0a] font-mono text-[11px] font-extrabold shadow-sm select-none shrink-0"
            title="Interact with the Boarding Calendar & Travel Simulators to earn Flyzo Priority Miles!"
          >
            <JetVectorIcon className="w-3.5 h-3.5" />
            <span>+{airMiles}</span>
          </span>

          {/* Light / Dark Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center hover:bg-[var(--sunk)] transition-colors shrink-0"
            aria-label="Toggle Light/Dark Theme"
            title={theme === 'dark' ? 'Switch to Warm Parchment Light Mode' : 'Switch to Night Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#fbce12]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--ink)]" />
            )}
          </button>

          {/* WhatsApp Pill */}
          <a
            href={buildWhatsAppUrl("Hello Flyzo Travels! I want to book / enquire via your website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] hover:bg-[#8bc34f] hover:text-[#140f0a] text-xs font-extrabold transition-colors shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#1f6b35]" />
            <span>WhatsApp</span>
          </a>

          {/* Primary SAXAZ Yellow CTA */}
          <button
            onClick={() => onQuickEnquire('Instant Booking Desk Enquiry')}
            className="px-3.5 py-1.5 rounded-full bg-[#fbce12] text-[#140f0a] font-extrabold text-xs tracking-tight hover:brightness-105 active:scale-95 transition-all shadow-sm shrink-0"
          >
            Enquire
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-8 h-8 rounded-full bg-[#140f0a] text-[#fbce12] flex items-center justify-center shrink-0"
            aria-label="Open Navigation Menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="xl:hidden px-4 pt-2 pb-4 border-t border-[var(--line)] bg-[var(--surface)] grid grid-cols-2 sm:grid-cols-3 gap-2">
          {NAV_LINKS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className="text-left px-3 py-2 rounded-xl bg-[var(--sunk)] font-bold text-xs text-[var(--ink)] hover:bg-[#fbce12] hover:text-[#140f0a]"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Spectrum Scroll Progress Bar at bottom edge of pill (exact SAXAZ .nav-prog) */}
      <i
        aria-hidden="true"
        className="block h-[3px] w-full origin-left transition-transform duration-150"
        style={{
          background: 'var(--spectrum)',
          transform: `scaleX(${scrollProgress})`,
        }}
      />
    </nav>
  );
}
