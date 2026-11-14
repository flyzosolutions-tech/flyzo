import React, { useState } from 'react';
import {
  Star, Clock, CheckCircle2, MessageCircle, Calendar, X, ArrowUpRight
} from 'lucide-react';
import { TOURIST_PACKAGES, buildWhatsAppUrl } from '../data/siteData';

const CATEGORIES = ['All', 'Middle East', 'Europe', 'Asia', 'Island', 'Domestic'];
const CARD_ACCENTS = ['#f9823f', '#1aa3e4', '#8bc34f', '#fbce12', '#b8a0d0', '#8fbaab'];

export default function TouristPackagesSection({ onSelectEnquiry }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeItinerary, setActiveItinerary] = useState(null);

  const filtered =
    selectedCategory === 'All'
      ? TOURIST_PACKAGES
      : TOURIST_PACKAGES.filter((p) => p.category === selectedCategory);

  return (
    <section id="tourist-packages" className="py-20 px-4 sm:px-8 relative overflow-hidden">
      {/* Ghost Word */}
      <span className="ghost-word -left-6 top-8">HOLIDAYS</span>

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Header & Category Chips */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#f9823f] text-[#140f0a] font-extrabold text-xs uppercase tracking-wider mb-3">
              02 • INTERNATIONAL &amp; DOMESTIC HOLIDAYS
            </span>
            <h2 className="poster-h2">
              Curated tourist packages, zero hidden costs.
            </h2>
            <p className="text-base sm:text-lg text-[var(--muted)] mt-3 max-w-2xl font-medium">
              Flights, visa assistance, 4-Star &amp; 5-Star hotels, airport transfers, and sightseeing included. Pick a region below or open any day-by-day trail.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold border transition-all ${
                    active
                      ? 'bg-[#fbce12] text-[#140f0a] border-[#140f0a] shadow-sm -translate-y-0.5'
                      : 'bg-[var(--surface)] text-[var(--ink)] border-[var(--edge)] hover:bg-[var(--sunk)]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg, idx) => {
            const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
            return (
              <article
                key={pkg.id}
                className="spot-card overflow-hidden flex flex-col justify-between group"
                style={{ borderColor: `color-mix(in srgb, ${accent} 50%, var(--line))` }}
              >
                <div>
                  {/* Image with Bold Sticker Pill */}
                  <div className="relative h-52 overflow-hidden border-b border-[var(--line)]">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-extrabold text-[#140f0a] border border-[#140f0a]"
                        style={{ backgroundColor: accent }}
                      >
                        {pkg.badge}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#140f0a] text-[#f8efdc] text-xs font-bold">
                        {pkg.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold">
                      <span className="px-2.5 py-1 rounded-lg bg-[#140f0a]/90 text-[#fbce12] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {pkg.duration}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#140f0a]/90 text-white flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#fbce12] text-[#fbce12]" /> {pkg.rating}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3
                      className="text-2xl font-extrabold text-[var(--ink)] leading-tight"
                      style={{ fontFamily: 'var(--display)', fontStretch: '85%' }}
                    >
                      {pkg.title}
                    </h3>

                    <ul className="mt-4 space-y-2">
                      {pkg.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-[var(--muted)]">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#1f6b35]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-[var(--line)] flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase text-[var(--muted)] block">
                        All-Inclusive Package
                      </span>
                      <strong className="poster-num text-3xl text-[var(--ink)]">
                        {pkg.price}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveItinerary(pkg)}
                      className="text-xs font-extrabold text-[#b5391a] underline underline-offset-4 hover:text-[var(--ink)]"
                    >
                      Day-by-Day Plan →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={buildWhatsAppUrl(
                        `Hello Flyzo Travels! I want to book / enquire about *${pkg.title}* (${pkg.duration}, ${pkg.price}).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tactile-btn py-2.5 px-3 bg-[#140f0a] text-[#fbce12] text-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => onSelectEnquiry(`Tourist Package: ${pkg.title} (${pkg.price})`)}
                      className="tactile-btn py-2.5 px-3 bg-[#fbce12] text-[#140f0a] border border-[#140f0a] text-xs"
                    >
                      <span>Book / Customize</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Itinerary Dialog Modal */}
      {activeItinerary && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setActiveItinerary(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--surface)] text-[var(--ink)] border-2 border-[#140f0a] rounded-[24px] max-w-lg w-full p-6 sm:p-7 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--line)]">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#fbce12] text-[#140f0a] text-xs font-extrabold">
                  {activeItinerary.duration} • {activeItinerary.price}
                </span>
                <h3 className="poster-h2 !text-2xl sm:!text-3xl mt-2">
                  {activeItinerary.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveItinerary(null)}
                className="p-2 rounded-full bg-[var(--sunk)] text-[var(--ink)] font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ol className="my-5 space-y-2.5">
              {activeItinerary.itinerary.map((step, i) => (
                <li
                  key={i}
                  className="p-3.5 rounded-2xl bg-[var(--sunk)] text-xs sm:text-sm font-bold flex items-start gap-3"
                >
                  <Calendar className="w-4 h-4 text-[#b5391a] shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="flex gap-3 pt-2">
              <a
                href={buildWhatsAppUrl(
                  `Hello Flyzo Travels! Please send the PDF itinerary & dates for *${activeItinerary.title}*.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-btn flex-1 py-3 bg-[#140f0a] text-[#fbce12] text-xs sm:text-sm"
              >
                <MessageCircle className="w-4 h-4" /> Get PDF on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  const title = activeItinerary.title;
                  setActiveItinerary(null);
                  onSelectEnquiry(`Tourist Package: ${title}`);
                }}
                className="tactile-btn flex-1 py-3 bg-[#fbce12] text-[#140f0a] border border-[#140f0a] text-xs sm:text-sm"
              >
                Reserve Dates
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
