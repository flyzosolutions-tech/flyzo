import React, { useState } from 'react';
import {
  Plane, Train, Bus, ArrowLeftRight, MessageCircle,
  Send, Calendar, Users, MapPin
} from 'lucide-react';
import { POPULAR_ROUTES, buildWhatsAppUrl } from '../data/siteData';

const TICKET_TABS = [
  {
    id: 'flight',
    label: 'Flight Tickets',
    sub: 'Domestic & Global Airlines',
    color: '#1aa3e4',
    bgLight: 'rgba(26, 163, 228, 0.14)',
    icon: Plane,
    code: 'AIR-B2B',
  },
  {
    id: 'train',
    label: 'Train Tickets',
    sub: 'IRCTC & Tatkal Express',
    color: '#f9823f',
    bgLight: 'rgba(249, 130, 63, 0.14)',
    icon: Train,
    code: 'IRCTC-PRO',
  },
  {
    id: 'bus',
    label: 'Luxury Bus',
    sub: 'Volvo & Scania AC Sleeper',
    color: '#8bc34f',
    bgLight: 'rgba(139, 195, 79, 0.14)',
    icon: Bus,
    code: 'VOLVO-2X1',
  },
];

export default function TicketBookingSection({ onSelectEnquiry }) {
  const [mode, setMode] = useState('flight');
  const [tripType, setTripType] = useState('One Way');
  const [fromCity, setFromCity] = useState('Mumbai (BOM)');
  const [toCity, setToCity] = useState('Dubai (DXB)');
  const [travelDate, setTravelDate] = useState('2026-11-20');
  const [passengers, setPassengers] = useState('2 Adults');
  const [cabin, setCabin] = useState('Economy / 30kg Baggage');

  const activeTab = TICKET_TABS.find((t) => t.id === mode);

  const handleModeSwitch = (id) => {
    setMode(id);
    if (id === 'flight') {
      setFromCity('Mumbai (BOM)');
      setToCity('Dubai (DXB)');
      setCabin('Economy / 30kg Baggage');
    } else if (id === 'train') {
      setFromCity('Mumbai Central');
      setToCity('New Delhi');
      setCabin('2A / 3A / Vande Bharat CC');
    } else {
      setFromCity('Hyderabad');
      setToCity('Bengaluru');
      setCabin('Volvo Multi-Axle AC Sleeper');
    }
  };

  const swapRoute = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const waMessage = `Hello Flyzo Ticketing Desk! Please share live ${mode.toUpperCase()} ticket fares:\n• Mode: ${activeTab.label}\n• Trip: ${tripType}\n• From: ${fromCity}\n• To: ${toCity}\n• Date: ${travelDate}\n• Travellers: ${passengers}\n• Class: ${cabin}`;

  return (
    <section id="tickets" className="py-20 px-4 sm:px-8 relative overflow-hidden">
      {/* Background Ghost Word */}
      <span className="ghost-word right-0 top-6">TICKETS</span>

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-[#fbce12] text-[#140f0a] font-extrabold text-xs uppercase tracking-wider mb-3">
            11 • MULTI-MODAL TICKET TERMINAL
          </span>
          <h2 className="poster-h2">
            One ticket desk for air, rail, and road.
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted)] mt-3 font-medium">
            Switch between Flights, IRCTC Trains, and AC Sleeper Buses below. Your live boarding pass updates on the right—send it straight to WhatsApp for B2B group or Tatkal fares.
          </p>
        </div>

        {/* SAXAZ-style 3-Segment Sliding Pill Switcher */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] shadow-md max-w-2xl mb-10">
          {TICKET_TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = mode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleModeSwitch(tab.id)}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-full font-extrabold text-xs sm:text-sm transition-all ${
                  isSelected
                    ? 'text-[#140f0a] shadow-sm scale-[1.01]'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
                style={{
                  backgroundColor: isSelected ? tab.color : 'transparent',
                }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Split Layout: Form Panel (Left) + Live Boarding Pass Device Preview (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left 7 Cols: Color-Tinted Interactive Form Card */}
          <div
            className="lg:col-span-7 rounded-[28px] p-6 sm:p-8 border-2 transition-colors duration-300 shadow-xl"
            style={{
              backgroundColor: activeTab.bgLight,
              borderColor: activeTab.color,
            }}
          >
            {/* Trip Type Segmented Control */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex p-1 rounded-full bg-[var(--surface)] border border-[var(--line)]">
                {['One Way', 'Round Trip', 'Group / Bulk'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTripType(t)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-colors ${
                      tripType === t
                        ? 'bg-[#140f0a] text-[#fbce12]'
                        : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <span className="font-mono text-xs font-extrabold px-3 py-1 rounded-full bg-[#140f0a] text-[#fbce12]">
                DESK CODE: {activeTab.code}
              </span>
            </div>

            {/* Origin & Destination Inputs */}
            <div className="grid sm:grid-cols-11 gap-3 items-center mb-4">
              <label className="sm:col-span-5 block bg-[var(--surface)] p-3.5 rounded-2xl border border-[var(--edge)]">
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-[var(--muted)]">
                  <MapPin className="w-3.5 h-3.5" style={{ color: activeTab.color }} /> Origin City / Station
                </span>
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full mt-1 bg-transparent font-extrabold text-base text-[var(--ink)] focus:outline-none"
                />
              </label>

              <div className="sm:col-span-1 flex justify-center">
                <button
                  type="button"
                  onClick={swapRoute}
                  className="w-10 h-10 rounded-full bg-[#140f0a] text-[#fbce12] flex items-center justify-center hover:scale-110 transition-transform"
                  title="Swap Origin & Destination"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
              </div>

              <label className="sm:col-span-5 block bg-[var(--surface)] p-3.5 rounded-2xl border border-[var(--edge)]">
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-[var(--muted)]">
                  <MapPin className="w-3.5 h-3.5" style={{ color: activeTab.color }} /> Destination City
                </span>
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full mt-1 bg-transparent font-extrabold text-base text-[var(--ink)] focus:outline-none"
                />
              </label>
            </div>

            {/* Date, Passengers & Cabin */}
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              <label className="block bg-[var(--surface)] p-3.5 rounded-2xl border border-[var(--edge)]">
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-[var(--muted)]">
                  <Calendar className="w-3.5 h-3.5" /> Departure Date
                </span>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full mt-1 bg-transparent font-extrabold text-sm text-[var(--ink)] focus:outline-none"
                />
              </label>

              <label className="block bg-[var(--surface)] p-3.5 rounded-2xl border border-[var(--edge)]">
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-[var(--muted)]">
                  <Users className="w-3.5 h-3.5" /> Passengers
                </span>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full mt-1 bg-[var(--surface)] font-extrabold text-sm text-[var(--ink)] focus:outline-none"
                >
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>Family (3-5 Pax)</option>
                  <option>Group (10+ Pax)</option>
                </select>
              </label>

              <label className="block bg-[var(--surface)] p-3.5 rounded-2xl border border-[var(--edge)]">
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-[var(--muted)]">
                  Class / Coach
                </span>
                <input
                  type="text"
                  value={cabin}
                  onChange={(e) => setCabin(e.target.value)}
                  className="w-full mt-1 bg-transparent font-extrabold text-sm text-[var(--ink)] focus:outline-none"
                />
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={buildWhatsAppUrl(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-btn flex-1 py-4 px-5 bg-[#140f0a] text-[#fbce12] text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Ticket Pass to WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() =>
                  onSelectEnquiry(
                    `${activeTab.label}: ${fromCity} → ${toCity} on ${travelDate} (${passengers}, ${cabin})`
                  )
                }
                className="tactile-btn py-4 px-5 bg-[var(--surface)] text-[var(--ink)] border-2 border-[#140f0a] text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Callback Quote</span>
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Hand-crafted Live Boarding Ticket Preview (like SAXAZ's .mini phone) */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="w-full max-w-[360px] rounded-[34px] bg-[#140f0a] text-[#f6efe2] p-5 shadow-2xl border-4 transition-colors duration-300 relative overflow-hidden"
              style={{ borderColor: activeTab.color }}
            >
              {/* Top Ticket Notch */}
              <div className="flex items-center justify-between pb-4 border-b border-dashed border-white/20">
                <img
                  src="/flyzo-logo-light.png"
                  alt="FLYZO"
                  className="h-5 w-auto object-contain"
                />
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold text-[#140f0a]"
                    style={{ backgroundColor: activeTab.color }}
                  >
                    {activeTab.label.toUpperCase()}
                  </span>
                  <span className="font-mono text-[11px] text-[#fbce12] font-bold">
                    {tripType.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Route Display */}
              <div className="my-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/60 block">
                      ORIGIN
                    </span>
                    <strong className="text-lg font-extrabold text-white block">
                      {fromCity}
                    </strong>
                  </div>
                  <div
                    className="w-10 h-10 rounded-full grid place-items-center text-[#140f0a] font-black shrink-0"
                    style={{ backgroundColor: activeTab.color }}
                  >
                    →
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-white/60 block">
                      DESTINATION
                    </span>
                    <strong className="text-lg font-extrabold text-white block">
                      {toCity}
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-white/10 text-xs">
                  <div>
                    <span className="text-white/60 block text-[10px]">DATE</span>
                    <b className="font-mono text-[#fbce12]">{travelDate}</b>
                  </div>
                  <div>
                    <span className="text-white/60 block text-[10px]">PASSENGERS</span>
                    <b>{passengers}</b>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-white/10">
                    <span className="text-white/60 block text-[10px]">CLASS / PREFERENCE</span>
                    <b className="text-[#8ae2a5]">{cabin}</b>
                  </div>
                </div>
              </div>

              {/* Popular Corridors Inside Mini Preview */}
              <div className="space-y-2 pt-2 border-t border-white/15">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#fbce12] block">
                  Tap a Popular {mode.toUpperCase()} Corridor:
                </span>
                {POPULAR_ROUTES[mode].map((r, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setFromCity(r.from);
                      setToCity(r.to);
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <b className="block text-white">
                        {r.from} → {r.to}
                      </b>
                      <span className="text-[10px] text-white/60">
                        {r.airline || r.train || r.operator}
                      </span>
                    </div>
                    <span className="font-mono font-extrabold text-[#fbce12]">
                      {r.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
