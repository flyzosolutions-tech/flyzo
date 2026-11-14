import React from 'react';
import {
  FileCheck2, CheckCircle2, Truck, MessageCircle, ArrowRight, Clock
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

export default function AttestationSection({ onSelectEnquiry }) {
  const { content, buildWaUrl: buildWhatsAppUrl } = useSiteContent();
  const ATTESTATION_STEPS = content.attestationSteps;
  const ATTESTATION_CATEGORIES = content.attestationCategories;
  return (
    <section
      id="attestation"
      className="py-20 px-4 sm:px-8 relative overflow-hidden bg-[#f6ecd6] text-[#1c140c]"
    >
      {/* Ghost Word */}
      <span
        className="ghost-word -left-4 top-2"
        style={{ WebkitTextStrokeColor: 'rgba(122, 75, 0, 0.16)' }}
      >
        STAMPED
      </span>

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#140f0a] text-[#fbce12] font-extrabold text-xs uppercase tracking-wider mb-3">
            <FileCheck2 className="w-3.5 h-3.5" /> 05 • CERTIFICATE ATTESTATION &amp; APOSTILLE
          </span>
          <h2 className="poster-h2 !text-[#1c140c]">
            4-step document legalization, tracked from your doorstep.
          </h2>
          <p className="text-base sm:text-lg text-[#5a4a36] mt-3 font-medium">
            Need your Degree, Diploma, Marriage, Birth, or Commercial Certificate attested for UAE, Saudi Arabia, Qatar, Kuwait, Oman, or Europe Apostille? We pick up and deliver pan-India.
          </p>
        </div>

        {/* SAXAZ Daily Loop Track (4 Steps with Spectrum Numbers & Spectrum Track Line) */}
        <div className="relative pt-7 mb-14">
          {/* Spectrum Top Progress Track */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-0 right-0 top-0 h-[4px] rounded-full"
            style={{
              background: 'linear-gradient(90deg, #f9823f, #fbce12, #8bc34f, #2fb1e8)',
            }}
          />

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {ATTESTATION_STEPS.map((s, idx) => (
              <li
                key={s.step}
                className="bg-[#fffaf0] border-2 border-[#e0d2b6] rounded-[22px] p-6 shadow-md flex flex-col justify-between"
              >
                <div>
                  <span
                    className="poster-num text-5xl sm:text-6xl block mb-3"
                    style={{
                      background: 'var(--spectrum)',
                      backgroundSize: '400% 100%',
                      backgroundPosition: `${idx * 30}% 0`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    {s.step}
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-extrabold text-[#1c140c] leading-tight"
                    style={{ fontFamily: 'var(--display)', fontStretch: '85%' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5a4a36] mt-2 font-medium leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* 3 Document Category Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {ATTESTATION_CATEGORIES.map((cat) => (
            <article
              key={cat.title}
              className="bg-[#fffaf0] border-2 border-[#1c140c] rounded-[24px] p-6 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b-2 border-[#1c140c]">
                  <h3
                    className="text-2xl font-extrabold text-[#1c140c]"
                    style={{ fontFamily: 'var(--display)', fontStretch: '85%' }}
                  >
                    {cat.title}
                  </h3>
                </div>

                <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-[#fbce12] text-[#140f0a] text-xs font-extrabold">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>Turnaround: {cat.turnaround}</span>
                </span>

                <ul className="mt-4 space-y-2.5">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-bold text-[#1c140c]">
                      <CheckCircle2 className="w-4 h-4 text-[#1f6b35] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e0d2b6] grid grid-cols-2 gap-2.5">
                <a
                  href={buildWhatsAppUrl(
                    `Hello Flyzo Attestation Desk! I need attestation for my *${cat.title}*. Please share fees & doorstep pickup details.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactile-btn py-2.5 px-3 bg-[#140f0a] text-[#fbce12] text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => onSelectEnquiry(`Certificate Attestation: ${cat.title}`)}
                  className="tactile-btn py-2.5 px-3 bg-[#fbce12] text-[#140f0a] border border-[#140f0a] text-xs"
                >
                  <span>Book Pickup</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Doorstep Courier Strip */}
        <div className="mt-10 p-6 rounded-[24px] bg-[#140f0a] text-[#f8efdc] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fbce12] text-[#140f0a] grid place-items-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-lg sm:text-xl text-[#fbce12]">
                Insured Doorstep Pickup &amp; DHL Express Global Return
              </h4>
              <p className="text-xs sm:text-sm text-[#c8bba8]">
                Every original certificate is barcoded and tracked via WhatsApp at HRD, MEA, Embassy, and MOFA stages.
              </p>
            </div>
          </div>
          <a
            href={buildWhatsAppUrl("Hello Flyzo! I want to schedule a doorstep pickup for certificate attestation.")}
            target="_blank"
            rel="noopener noreferrer"
            className="tactile-btn py-3.5 px-6 bg-[#fbce12] text-[#140f0a] text-xs sm:text-sm shrink-0"
          >
            Schedule Free Pickup
          </a>
        </div>
      </div>
    </section>
  );
}
