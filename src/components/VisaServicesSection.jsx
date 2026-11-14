import React from 'react';
import {
  Clock, FileText, CheckCircle2, MessageCircle, ArrowUpRight
} from 'lucide-react';
import { VISA_SERVICES, buildWhatsAppUrl } from '../data/siteData';
import { CountryFlagSVG } from './FlyzoBrandArt';

const VISA_COLORS = ['#1aa3e4', '#8bc34f', '#fbce12', '#f9823f', '#b8a0d0', '#8fbaab'];

export default function VisaServicesSection({ onSelectEnquiry }) {
  return (
    <section id="visa-services" className="py-20 px-4 sm:px-8 relative overflow-hidden">
      {/* Ghost Word */}
      <span className="ghost-word right-0 top-6">VISAS</span>

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#8bc34f] text-[#140f0a] font-extrabold text-xs uppercase tracking-wider mb-3">
              04 • 99.8% VISA APPROVAL RECORD
            </span>
            <h2 className="poster-h2">
              Express global visas &amp; Wakala stamping.
            </h2>
            <p className="text-base sm:text-lg text-[var(--muted)] mt-3 max-w-2xl font-medium">
              UAE 24-hour tourist e-Visas, Saudi Umrah/Family/Work Wakala stamping, Schengen &amp; US/UK VFS priority appointments, and GAMCA/Wafid medical slips.
            </p>
          </div>

          <a
            href={buildWhatsAppUrl("Hello Flyzo Visa Desk! I want a free visa eligibility & document check.")}
            target="_blank"
            rel="noopener noreferrer"
            className="tactile-btn py-3.5 px-5 bg-[#140f0a] text-[#fbce12] text-xs sm:text-sm self-start lg:self-auto"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Free Visa Document Check on WhatsApp</span>
          </a>
        </div>

        {/* Visa Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VISA_SERVICES.map((visa, idx) => {
            const accent = VISA_COLORS[idx % VISA_COLORS.length];
            return (
              <article
                key={visa.country}
                className="spot-card p-6 flex flex-col justify-between"
                style={{
                  borderTopWidth: '6px',
                  borderTopColor: accent,
                }}
              >
                <div>
                  {/* Country Header */}
                  <div className="flex items-start justify-between gap-3 pb-4 border-b border-[var(--line)]">
                    <div className="flex items-center gap-3">
                      <CountryFlagSVG code={visa.flagCode} className="w-11 h-7" />
                      <div>
                        <h3
                          className="text-xl sm:text-2xl font-extrabold text-[var(--ink)] leading-tight"
                          style={{ fontFamily: 'var(--display)', fontStretch: '85%' }}
                        >
                          {visa.country}
                        </h3>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-[#dcf0d6] text-[#1f6b35] text-[11px] font-extrabold">
                          {visa.successRate} Approval
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-[var(--muted)] block">
                        From
                      </span>
                      <strong className="poster-num text-2xl text-[var(--ink)]">
                        {visa.startingPrice}
                      </strong>
                    </div>
                  </div>

                  {/* Turnaround Pill */}
                  <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--sunk)] text-xs font-extrabold text-[var(--ink)]">
                    <Clock className="w-4 h-4 text-[#b5391a] shrink-0" />
                    <span>Processing Time: {visa.processing}</span>
                  </div>

                  {/* Types */}
                  <ul className="mt-4 space-y-2">
                    {visa.types.map((t, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--ink)]">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: accent }} />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Required Docs Box */}
                  <div className="mt-4 p-3 rounded-xl border border-dashed border-[var(--edge)] text-xs text-[var(--muted)] font-medium">
                    <strong className="text-[var(--ink)] flex items-center gap-1.5 mb-1">
                      <FileText className="w-3.5 h-3.5" /> Documents Needed:
                    </strong>
                    {visa.documents}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line)] grid grid-cols-2 gap-2.5">
                  <a
                    href={buildWhatsAppUrl(
                      `Hello Flyzo Visa Desk! I want to apply for a *${visa.country} Visa*. Please share checklist & fees.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tactile-btn py-2.5 px-3 bg-[#140f0a] text-[#fbce12] text-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => onSelectEnquiry(`Visa Application: ${visa.country}`)}
                    className="tactile-btn py-2.5 px-3 bg-[#fbce12] text-[#140f0a] border border-[#140f0a] text-xs"
                  >
                    <span>Apply Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
