import React, { useState } from 'react';
import {
  Moon, MapPin, CheckCircle2, MessageCircle
} from 'lucide-react';
import { UMRAH_PACKAGES, buildWhatsAppUrl } from '../data/siteData';

export default function UmrahPackagesSection({ onSelectEnquiry }) {
  // Interactive Haram Distance & Package Simulator (like SAXAZ's .lab interactive figure)
  const [selectedIdx, setSelectedIdx] = useState(1); // Default to 5-Star Clock Tower
  const [pilgrimCount, setPilgrimCount] = useState(2);

  const currentPkg = UMRAH_PACKAGES[selectedIdx];
  const numericPrice = parseInt(currentPkg.price.replace(/[^0-9]/g, ''), 10) || 75000;
  const groupDiscount = pilgrimCount >= 4 ? 4000 : 0;
  const totalEstimated = (numericPrice - groupDiscount) * pilgrimCount;

  return (
    <>
      <div className="kasavu" aria-hidden="true" />
      <section
        id="umrah-packages"
        className="py-20 px-4 sm:px-8 relative overflow-hidden bg-[#0f2747] text-[#f8efdc] transition-colors"
      >
        {/* Giant Ghost Word */}
        <span
          aria-hidden="true"
          className="ghost-word right-2 top-4"
          style={{ WebkitTextStrokeColor: 'rgba(248, 239, 220, 0.12)' }}
        >
          UMRAH
        </span>

        <div className="max-w-[1240px] mx-auto relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbce12] text-[#140f0a] font-extrabold text-xs uppercase tracking-wider mb-3">
              <Moon className="w-3.5 h-3.5" /> 03 • SACRED UMRAH &amp; ZIYARAT PILGRIMAGE
            </span>
            <h2 className="poster-h2 !text-[#f8efdc]">
              Labbaik Allahumma Labbaik — Sacred Umrah made effortless.
            </h2>
            <p className="text-base sm:text-lg text-[#c9d6e6] mt-3 font-medium">
              Nusuk &amp; Ministry of Hajj approved visa stamping, Haramain High-Speed Bullet Train between Makkah &amp; Madinah, 5-Star Clock Tower hotels, and scholar-led Ziyarat.
            </p>
          </div>

          {/* Interactive Haram Proximity & Pilgrim Calculator Lab (SAXAZ .lab style) */}
          <div className="grid lg:grid-cols-12 gap-8 items-center mb-14 bg-[#fbf5e6] text-[#1c140c] rounded-[24px] p-6 sm:p-8 shadow-2xl">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#a5310f] block">
                INTERACTIVE UMRAH PLANNER • COMPARE TIERS
              </span>
              <h3 className="poster-h2 !text-2xl sm:!text-3xl !text-[#1c140c]">
                Choose your Haram walking distance &amp; family size:
              </h3>

              {/* Tier Selector Buttons */}
              <div className="grid sm:grid-cols-3 gap-2.5">
                {UMRAH_PACKAGES.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedIdx(i)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedIdx === i
                        ? 'bg-[#140f0a] text-[#fbce12] border-[#140f0a] -translate-y-0.5'
                        : 'bg-transparent text-[#1c140c] border-[#1c140c]/30 hover:border-[#1c140c]'
                    }`}
                  >
                    <b className="text-[11px] uppercase tracking-wider block opacity-80">
                      {p.tier}
                    </b>
                    <span className="font-mono font-extrabold text-base block mt-0.5">
                      {p.price}
                    </span>
                  </button>
                ))}
              </div>

              {/* Pilgrim Count Slider */}
              <div className="pt-2">
                <div className="flex justify-between text-xs sm:text-sm font-extrabold mb-1">
                  <span>Number of Pilgrims (Family / Group):</span>
                  <b className="font-mono text-base text-[#b5391a]">
                    {pilgrimCount} {pilgrimCount === 1 ? 'Pilgrim' : 'Pilgrims'}
                    {pilgrimCount >= 4 && ' (₹4,000/pax Group Discount Applied!)'}
                  </b>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={pilgrimCount}
                  onChange={(e) => setPilgrimCount(Number(e.target.value))}
                  className="w-full accent-[#b5391a] cursor-pointer h-3 rounded-lg"
                />
              </div>

              {/* Live Readout */}
              <div className="p-4 rounded-2xl bg-[#e9dec6] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block">
                    ESTIMATED TOTAL FOR {pilgrimCount} PILGRIM(S)
                  </span>
                  <strong className="poster-num text-3xl sm:text-4xl text-[#1c140c]">
                    ₹{totalEstimated.toLocaleString('en-IN')}
                  </strong>
                </div>
                <a
                  href={buildWhatsAppUrl(
                    `Assalamu Alaikum Flyzo Umrah Desk! I used your Umrah Planner for *${currentPkg.title}* for ${pilgrimCount} pilgrims (Est: ₹${totalEstimated.toLocaleString('en-IN')}). Please share next departure dates.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactile-btn py-3 px-5 bg-[#140f0a] text-[#fbce12] text-xs sm:text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Lock Group Rate on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Visual SVG Haram Distance & Bullet Train Diagram */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#0c1b33] text-[#f8efdc] p-5 border-2 border-[#1c140c]">
                <div className="flex items-center justify-between text-xs font-bold text-[#fbce12] mb-3">
                  <span>LIVE PROXIMITY MAP • MAKKAH &amp; MADINAH</span>
                  <span className="font-mono">{currentPkg.duration}</span>
                </div>

                <svg viewBox="0 0 420 170" className="w-full h-auto rounded-xl bg-[#081326] mb-3">
                  {/* Track Line */}
                  <line x1="65" y1="85" x2="355" y2="85" stroke="#fbce12" strokeWidth="3" strokeDasharray="6 6" />
                  {/* Kaaba Icon Node */}
                  <rect x="35" y="55" width="52" height="56" rx="6" fill="#140f0a" stroke="#fbce12" strokeWidth="3" />
                  <line x1="35" y1="72" x2="87" y2="72" stroke="#fbce12" strokeWidth="4" />
                  <text x="61" y="132" textAnchor="middle" fill="#fbce12" fontSize="11" fontWeight="800">
                    AL-HARAM
                  </text>

                  {/* Pilgrim Hotel Pin */}
                  <circle
                    cx={selectedIdx === 1 ? 115 : selectedIdx === 2 ? 175 : 235}
                    cy="85"
                    r="16"
                    fill="#8bc34f"
                    stroke="#fff"
                    strokeWidth="3"
                  />
                  <text
                    x={selectedIdx === 1 ? 115 : selectedIdx === 2 ? 175 : 235}
                    y="55"
                    textAnchor="middle"
                    fill="#8ae2a5"
                    fontSize="11"
                    fontWeight="800"
                  >
                    YOUR HOTEL
                  </text>

                  {/* Madinah Nabawi Dome Node */}
                  <path d="M330 110 C330 65 385 65 385 110 Z" fill="#1f6b35" stroke="#8ae2a5" strokeWidth="2.5" />
                  <text x="358" y="132" textAnchor="middle" fill="#8ae2a5" fontSize="11" fontWeight="800">
                    MADINAH
                  </text>
                </svg>

                <div className="grid sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/10">
                    <span className="text-[#fbce12] font-extrabold block">🕋 Makkah Hotel Distance:</span>
                    <span>{currentPkg.distanceMakkah}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10">
                    <span className="text-[#8ae2a5] font-extrabold block">🕌 Madinah Hotel Distance:</span>
                    <span>{currentPkg.distanceMadinah}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Full Umrah Package Cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            {UMRAH_PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className={`rounded-[26px] p-6 flex flex-col justify-between border-2 transition-transform hover:-translate-y-1 ${
                  pkg.featured
                    ? 'bg-[#fbce12] text-[#140f0a] border-[#140f0a] shadow-2xl'
                    : 'bg-[#16345d] text-[#f8efdc] border-white/15'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                        pkg.featured
                          ? 'bg-[#140f0a] text-[#fbce12]'
                          : 'bg-[#fbce12] text-[#140f0a]'
                      }`}
                    >
                      {pkg.tier}
                    </span>
                    <span className="text-xs font-mono font-bold opacity-85">
                      {pkg.duration}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-extrabold leading-tight"
                    style={{ fontFamily: 'var(--display)', fontStretch: '85%' }}
                  >
                    {pkg.title}
                  </h3>

                  <div
                    className={`mt-4 p-3 rounded-xl text-xs font-bold space-y-1 ${
                      pkg.featured ? 'bg-[#140f0a]/10' : 'bg-black/25'
                    }`}
                  >
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>Makkah: {pkg.distanceMakkah}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>Madinah: {pkg.distanceMadinah}</span>
                    </p>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-semibold">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-current/15">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase opacity-75 block">
                        ALL-INCLUSIVE PER PILGRIM
                      </span>
                      <strong className="poster-num text-3xl">{pkg.price}</strong>
                    </div>
                    <span className="text-xs font-bold underline">5L Zamzam + Kit</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={buildWhatsAppUrl(
                        `Assalamu Alaikum Flyzo Travels! I want to book the *${pkg.title}* (${pkg.price}).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`tactile-btn py-3 px-3 text-xs ${
                        pkg.featured
                          ? 'bg-[#140f0a] text-[#fbce12]'
                          : 'bg-[#fbce12] text-[#140f0a]'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => onSelectEnquiry(`Umrah Package: ${pkg.title} (${pkg.price})`)}
                      className={`tactile-btn py-3 px-3 text-xs border-2 ${
                        pkg.featured
                          ? 'border-[#140f0a] text-[#140f0a]'
                          : 'border-white/40 text-white'
                      }`}
                    >
                      Reserve Seat
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="kasavu" aria-hidden="true" />
    </>
  );
}
