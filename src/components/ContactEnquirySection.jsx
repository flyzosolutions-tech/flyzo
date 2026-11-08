import React, { useState, useEffect } from 'react';
import {
  PhoneCall, Mail, MapPin, MessageCircle, Send, CheckCircle2
} from 'lucide-react';
import { CaptainZizo } from './FlyzoBrandArt';
import {
  buildWhatsAppUrl,
  CALLING_NUMBER,
  CALLING_NUMBER_DISPLAY,
  CALLING_NUMBER_ALT,
  CALLING_NUMBER_ALT_DISPLAY,
  WHATSAPP_NUMBER_DISPLAY,
} from '../data/siteData';

const SERVICE_OPTIONS = [
  '11. Flight / Train / Luxury Bus Ticket Booking',
  '2. International & Domestic Tourist Package',
  '3. Sacred Umrah / Ramadan Ziyarat Package',
  '4. Global Visa Stamping (UAE, Saudi, Schengen, UK, US)',
  '5. Certificate Attestation & Apostille (HRD, MEA, Embassy, MOFA)',
  '6. Overseas Job Application / GCC Recruitment',
  'Corporate B2B Travel & Manpower Partnership',
];

export default function ContactEnquirySection({ prefilledService }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      setDetails(`Selected Service: ${prefilledService}\n`);
    }
  }, [prefilledService]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const composedWhatsAppMsg = `Hello Flyzo Travels!\n\n*Website Priority Dispatch*\n• Name: ${fullName || 'Guest'}\n• Phone: ${phone || 'Not provided'}\n• Email: ${email || 'Not provided'}\n• Service: ${service}\n• Notes: ${details || 'Please call me back.'}`;

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 relative overflow-hidden">
      {/* Ghost Word */}
      <span className="ghost-word -left-4 bottom-4">DISPATCH</span>

      <div className="max-w-[1240px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left 5 Cols: SAXAZ-style About & Fact Boxes */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#fbce12] text-[#140f0a] font-extrabold text-xs uppercase tracking-wider mb-3">
                10 • CONTACT &amp; INSTANT ENQUIRY DESK
              </span>
              <h2 className="poster-h2">
                Talk to a real human travel specialist in 5 minutes.
              </h2>
              <p className="text-base text-[var(--muted)] mt-3 font-medium">
                Whether it&apos;s an urgent Tonight Flight, a Family Umrah Visa, Degree MEA Attestation, or a GCC Job Interview — send your enquiry straight to our WhatsApp or callback queue.
              </p>
            </div>

            {/* Fact Grid like SAXAZ .about-facts */}
            <dl className="grid sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
                <dt className="text-xs font-extrabold uppercase text-[var(--muted)] flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-[#b5391a]" /> 24/7 Calling Desk
                </dt>
                <dd className="mt-1 font-mono font-extrabold text-sm text-[var(--ink)] space-y-0.5">
                  <a href={`tel:${CALLING_NUMBER}`} className="underline text-[#b5391a] block">{CALLING_NUMBER_DISPLAY} →</a>
                  <a href={`tel:${CALLING_NUMBER_ALT}`} className="underline text-[#b5391a] block">{CALLING_NUMBER_ALT_DISPLAY} →</a>
                  <p className="font-sans text-[11px] text-[var(--muted)] font-medium">Direct Voice Helpline (India)</p>
                </dd>
              </div>

              <div className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
                <dt className="text-xs font-extrabold uppercase text-[var(--muted)] flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#1f6b35]" /> WhatsApp Desk
                </dt>
                <dd className="mt-1 font-extrabold text-sm">
                  <a
                    href={buildWhatsAppUrl("Hello Flyzo Travels! Please connect me with a booking specialist.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1f6b35] underline block"
                  >
                    {WHATSAPP_NUMBER_DISPLAY} →
                  </a>
                  <p className="text-[11px] text-[var(--muted)] font-medium">Share Passports / Tickets / CVs</p>
                </dd>
              </div>

              <div className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
                <dt className="text-xs font-extrabold uppercase text-[var(--muted)] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#1aa3e4]" /> Official Emails
                </dt>
                <dd className="mt-1 font-bold text-xs text-[var(--ink)] break-all">
                  bookings@flyzotravels.com
                  <br />
                  visa@flyzotravels.com
                </dd>
              </div>

              <div className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
                <dt className="text-xs font-extrabold uppercase text-[var(--muted)] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#f9823f]" /> Branch Network
                </dt>
                <dd className="mt-1 font-bold text-xs text-[var(--ink)]">
                  Kuwait City • Dubai • Mumbai • Kochi • Kozhikode • New Delhi
                </dd>
              </div>
            </dl>

            {/* Captain Zizo Mascot Helper Bubble */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--sunk)] border border-[var(--line)]">
              <CaptainZizo size={64} />
              <p className="text-xs sm:text-sm font-bold text-[var(--ink)]">
                “Tip: Clicking <span className=" underline">Send on WhatsApp</span> pre-fills your entire form so you don&apos;t have to type it twice!”
              </p>
            </div>
          </div>

          {/* Right 7 Cols: Tactile Paper/Card Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="spot-card p-6 sm:p-9 border-2 border-[#140f0a]">
              <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[#140f0a]">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#b5391a]">
                    PRIORITY CALLBACK &amp; WHATSAPP DISPATCH
                  </span>
                  <h3 className="poster-h2 !text-2xl sm:!text-3xl mt-0.5">
                    Complete Booking &amp; Service Form
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#fbce12] text-[#140f0a] font-mono text-xs font-extrabold">
                  FAST-TRACK
                </span>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#dcf0d6] text-[#0c2d17] text-center space-y-4 border-2 border-[#1f6b35]">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-[#1f6b35]" />
                  <h4 className="poster-h2 !text-3xl !text-[#0c2d17]">
                    Enquiry Logged, {fullName || 'Traveler'}!
                  </h4>
                  <p className="text-sm font-bold max-w-md mx-auto">
                    Our specialist for <u>{service}</u> is reviewing your request and will call you on <b>{phone}</b>.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <a
                      href={buildWhatsAppUrl(composedWhatsAppMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tactile-btn py-3.5 px-6 bg-[#140f0a] text-[#fbce12] text-xs sm:text-sm"
                    >
                      <MessageCircle className="w-4 h-4" /> Also Open in WhatsApp Now
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="tactile-btn py-3.5 px-5 bg-white text-[#140f0a] border border-[#140f0a] text-xs"
                    >
                      New Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-xs font-extrabold uppercase text-[var(--ink)] block mb-1">
                        Your Full Name *
                      </span>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Aamir Khan / Priya Nair"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[var(--edge)] bg-[var(--bg)] text-[var(--ink)] font-bold text-sm focus:outline-none focus:border-[#b5391a]"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-extrabold uppercase text-[var(--ink)] block mb-1">
                        Mobile / WhatsApp Number *
                      </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 90486 06444 / +965 6038 7543"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[var(--edge)] bg-[var(--bg)] text-[var(--ink)] font-bold text-sm focus:outline-none focus:border-[#b5391a]"
                      />
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-xs font-extrabold uppercase text-[var(--ink)] block mb-1">
                        Email Address
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[var(--edge)] bg-[var(--bg)] text-[var(--ink)] font-bold text-sm focus:outline-none focus:border-[#b5391a]"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-extrabold uppercase text-[var(--ink)] block mb-1">
                        Service Category *
                      </span>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[var(--edge)] bg-[var(--bg)] text-[var(--ink)] font-bold text-sm focus:outline-none focus:border-[#b5391a]"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-xs font-extrabold uppercase text-[var(--ink)] block mb-1">
                      Travel Route, Dates, Visa Country, Certificate Type or Job Role
                    </span>
                    <textarea
                      rows={4}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Write your travel dates, city, number of passengers, or attestation/job details..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--edge)] bg-[var(--bg)] text-[var(--ink)] font-bold text-sm focus:outline-none focus:border-[#b5391a]"
                    />
                  </label>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="tactile-btn flex-1 py-4 px-6 bg-[#fbce12] text-[#140f0a] border-2 border-[#140f0a] text-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Callback Request</span>
                    </button>

                    <a
                      href={buildWhatsAppUrl(composedWhatsAppMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tactile-btn flex-1 py-4 px-6 bg-[#140f0a] text-[#fbce12] text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Directly on WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
