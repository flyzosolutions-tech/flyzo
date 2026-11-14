import React, { useState } from 'react';
import {
  Briefcase, MapPin, Banknote, CheckCircle2,
  MessageCircle, Upload, Building2, Flame
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import { CountryFlagSVG } from './FlyzoBrandArt';

const JOB_CATEGORIES = ['All', 'Engineering', 'Hospitality', 'Healthcare', 'Logistics & Technical'];

export default function JobRecruitmentSection({ onSelectEnquiry }) {
  const { content, buildWaUrl: buildWhatsAppUrl } = useSiteContent();
  const JOB_LISTINGS = content.jobListings;
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredJobs =
    activeCategory === 'All'
      ? JOB_LISTINGS
      : JOB_LISTINGS.filter((j) => j.category === activeCategory);

  return (
    <section id="jobs" className="py-20 px-4 sm:px-8 relative overflow-hidden">
      {/* Ghost Word */}
      <span className="ghost-word right-0 top-6">CAREERS</span>

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b8a0d0] text-[#140f0a] font-extrabold text-xs uppercase tracking-wider mb-3">
              <Briefcase className="w-3.5 h-3.5" /> 06 • JOB HIRING &amp; OVERSEAS RECRUITMENT
            </span>
            <h2 className="poster-h2">
              Verified GCC &amp; Europe jobs, ready for Wakala.
            </h2>
            <p className="text-base sm:text-lg text-[var(--muted)] mt-3 max-w-2xl font-medium">
              Direct employer interviews for UAE, Saudi Arabia (NEOM &amp; Red Sea), Qatar, Oman &amp; Kuwait. Full support for Wafid medicals, Wakala visa stamping, POE emigration, and deployment tickets.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {JOB_CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold border transition-all ${
                    active
                      ? 'bg-[#fbce12] text-[#140f0a] border-[#140f0a] shadow-sm'
                      : 'bg-[var(--surface)] text-[var(--ink)] border-[var(--edge)] hover:bg-[var(--sunk)]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <article
              key={job.id}
              className="spot-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[var(--sunk)] text-[var(--ink)] text-xs font-extrabold">
                    {job.category}
                  </span>
                  {job.urgent && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fbe2cd] text-[#96390a] text-[11px] font-extrabold">
                      <Flame className="w-3.5 h-3.5" /> Urgent Wakala
                    </span>
                  )}
                </div>

                <h3
                  className="text-xl sm:text-2xl font-extrabold text-[var(--ink)] leading-snug"
                  style={{ fontFamily: 'var(--display)', fontStretch: '85%' }}
                >
                  {job.title}
                </h3>
                <p className="text-xs font-bold text-[var(--muted)] mt-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#b5391a]" /> {job.company}
                </p>

                <div className="mt-4 p-3.5 rounded-2xl bg-[var(--sunk)] space-y-2 text-xs font-bold">
                  <div className="flex items-center gap-2 text-[var(--ink)]">
                    <MapPin className="w-4 h-4 text-[#b5391a] shrink-0" />
                    <span>{job.location}</span>
                    <CountryFlagSVG code={job.flagCode} className="w-5 h-3.5 ml-0.5" />
                  </div>
                  <div className="flex items-center gap-2 text-[#1f6b35] font-extrabold">
                    <Banknote className="w-4 h-4 shrink-0" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="pt-1.5 border-t border-[var(--line)] text-[var(--muted)]">
                    <strong className="text-[var(--ink)]">Experience:</strong> {job.experience}
                  </div>
                </div>

                <ul className="mt-4 space-y-1.5">
                  {job.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--muted)]">
                      <CheckCircle2 className="w-4 h-4 text-[#1f6b35] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--line)] grid grid-cols-2 gap-2.5">
                <a
                  href={buildWhatsAppUrl(
                    `Hello Flyzo HR Desk! I want to apply for *${job.title}* (${job.location}). I am ready to send my CV & Passport copy.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactile-btn py-2.5 px-3 bg-[#140f0a] text-[#fbce12] text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Send CV on WA
                </a>
                <button
                  type="button"
                  onClick={() => onSelectEnquiry(`Job Application: ${job.title} (${job.location})`)}
                  className="tactile-btn py-2.5 px-3 bg-[#fbce12] text-[#140f0a] border border-[#140f0a] text-xs"
                >
                  <Upload className="w-3.5 h-3.5" /> Apply Online
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
