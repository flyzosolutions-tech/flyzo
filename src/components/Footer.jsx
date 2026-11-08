import React from 'react';
import {
  Plane, Compass, Moon, ShieldCheck, Briefcase,
  PhoneCall, Instagram, Facebook, Linkedin, MessageCircle
} from 'lucide-react';
import { FlyzoMarkSVG, CaptainZizo } from './FlyzoBrandArt';
import {
  buildWhatsAppUrl,
  CALLING_NUMBER,
  CALLING_NUMBER_DISPLAY,
  CALLING_NUMBER_ALT,
  CALLING_NUMBER_ALT_DISPLAY,
  WHATSAPP_NUMBER_DISPLAY,
} from '../data/siteData';

const DOCK_TABS = [
  { id: 'tickets', label: 'Tickets', icon: Plane },
  { id: 'tourist-packages', label: 'Holidays', icon: Compass },
  { id: 'umrah-packages', label: 'Umrah', icon: Moon },
  { id: 'visa-services', label: 'Visas', icon: ShieldCheck },
  { id: 'jobs', label: 'Jobs', icon: Briefcase },
  { id: 'contact', label: 'Enquire', icon: PhoneCall },
];

export default function Footer({ activeSection }) {
  return (
    <>
      <div className="kasavu" aria-hidden="true" />

      {/* SAXAZ-style Final Poster CTA Section with Mascot */}
      <section className="py-20 px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <CaptainZizo size={110} />
          <p className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#b5391a]">
            Flyzo Travels • Ready For Takeoff!
          </p>
          <h2 className="poster-h2">
            Your next journey starts with one message.
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <a
              href={buildWhatsAppUrl("Hello Flyzo Travels! I'm ready to plan my journey.")}
              target="_blank"
              rel="noopener noreferrer"
              className="tactile-btn py-4 px-8 bg-[#fbce12] text-[#140f0a] border-2 border-[#140f0a] text-base"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Start WhatsApp Booking</span>
            </a>
            <a
              href="#tickets"
              className="tactile-btn py-4 px-7 bg-[#140f0a] text-[#fbce12] text-base"
            >
              Explore All 11 Services ↑
            </a>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="border-t border-[var(--line)] pt-12 pb-32 px-4 sm:px-8 text-sm text-[var(--muted)]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-[var(--line)]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2.5 bg-[var(--surface)] border border-[var(--line)] px-3.5 py-2 rounded-xl shadow-sm">
                <FlyzoMarkSVG className="h-7 w-auto" />
              </div>
              <p className="text-xs sm:text-sm font-medium max-w-xs">
                Complete travel companion for Flight, Train &amp; Bus Tickets, Tourist Holidays, Sacred Umrah, Global Visas, Certificate Attestation &amp; Overseas Careers.
              </p>
              <div className="pt-1 space-y-1 font-mono text-xs font-extrabold text-[var(--ink)]">
                <a href={`tel:${CALLING_NUMBER}`} className="flex items-center gap-1.5 hover:text-[#b5391a]">
                  <PhoneCall className="w-3.5 h-3.5 text-[#b5391a]" /> Call 1: {CALLING_NUMBER_DISPLAY}
                </a>
                <a href={`tel:${CALLING_NUMBER_ALT}`} className="flex items-center gap-1.5 hover:text-[#b5391a]">
                  <PhoneCall className="w-3.5 h-3.5 text-[#b5391a]" /> Call 2: {CALLING_NUMBER_ALT_DISPLAY}
                </a>
                <a
                  href={buildWhatsAppUrl("Hello Flyzo Travels! I want to enquire via WhatsApp.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#1f6b35] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp: {WHATSAPP_NUMBER_DISPLAY}
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--ink)] mb-2.5">
                Travel &amp; Packages
              </h3>
              <ul className="space-y-2 font-bold text-xs sm:text-sm">
                <li><a href="#home" className="hover:text-[var(--ink)] hover:underline">1. Home – Flyzo Travels</a></li>
                <li><a href="#tourist-packages" className="hover:text-[var(--ink)] hover:underline">2. Tourist Packages</a></li>
                <li><a href="#umrah-packages" className="hover:text-[var(--ink)] hover:underline">3. Sacred Umrah Packages</a></li>
                <li><a href="#tickets" className="hover:text-[var(--ink)] hover:underline">11. Flight, Train &amp; Bus Tickets</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--ink)] mb-2.5">
                Visas, Attestation &amp; Jobs
              </h3>
              <ul className="space-y-2 font-bold text-xs sm:text-sm">
                <li><a href="#visa-services" className="hover:text-[var(--ink)] hover:underline">4. Global Visa Services</a></li>
                <li><a href="#attestation" className="hover:text-[var(--ink)] hover:underline">5. Certificate Attestation</a></li>
                <li><a href="#jobs" className="hover:text-[var(--ink)] hover:underline">6. Job Hiring &amp; Recruitment</a></li>
                <li><a href="#contact" className="hover:text-[var(--ink)] hover:underline">10. Contact &amp; Enquiry Form</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--ink)] mb-2.5">
                Official Social Channels
              </h3>
              <ul className="space-y-2 font-bold text-xs sm:text-sm">
                <li>
                  <a href="#instagram" className="inline-flex items-center gap-1.5 hover:text-[#f9823f]">
                    <Instagram className="w-4 h-4" /> 7. Instagram (@flyzotravels)
                  </a>
                </li>
                <li>
                  <a href="#facebook" className="inline-flex items-center gap-1.5 hover:text-[#1aa3e4]">
                    <Facebook className="w-4 h-4" /> 8. Facebook Community
                  </a>
                </li>
                <li>
                  <a href="#linkedin" className="inline-flex items-center gap-1.5 hover:text-[#8bc34f]">
                    <Linkedin className="w-4 h-4" /> 9. LinkedIn Recruitment
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
            <p>© {new Date().getFullYear()} Flyzo Travels &amp; Global Services. All rights reserved.</p>
            <p>Crafted with tactile warmth for global travelers &amp; pilgrims.</p>
          </div>
        </div>
      </footer>

      {/* SAXAZ Signature Floating Bottom Glass Dock (.tabs) */}
      <nav
        aria-label="Quick Bottom Dock"
        className="fixed z-40 left-1/2 -translate-x-1/2 bottom-3 w-[min(600px,calc(100vw-20px))] grid grid-cols-6 p-1.5 rounded-full border border-[var(--line)] bg-[var(--glass)] backdrop-blur-xl shadow-2xl"
      >
        {DOCK_TABS.map((t) => {
          const Icon = t.icon;
          const isCurrent = activeSection === t.id;
          return (
            <a
              key={t.id}
              href={`#${t.id}`}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-full text-[11px] font-extrabold transition-colors ${
                isCurrent
                  ? 'bg-[#fbce12] text-[#140f0a]'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="truncate max-w-full">{t.label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
