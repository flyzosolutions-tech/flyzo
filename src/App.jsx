import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TicketBookingSection from './components/TicketBookingSection';
import TouristPackagesSection from './components/TouristPackagesSection';
import UmrahPackagesSection from './components/UmrahPackagesSection';
import VisaServicesSection from './components/VisaServicesSection';
import AttestationSection from './components/AttestationSection';
import JobRecruitmentSection from './components/JobRecruitmentSection';
import SocialMediaSection from './components/SocialMediaSection';
import ContactEnquirySection from './components/ContactEnquirySection';
import Footer from './components/Footer';
import AdminPortal from './components/AdminPortal';
import { ContentProvider } from './context/ContentContext';
import {
  ScrollPinnedTransitShowcase,
  InteractiveTravelLab,
  ScrollPinnedDepartureWall,
} from './components/TravelAnimations';

function checkIsHandleRoute() {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return (
    host.startsWith('handle.') ||
    host.startsWith('admin.') ||
    path.startsWith('/handle') ||
    path.startsWith('/admin') ||
    hash === '#handle' ||
    hash === '#/handle'
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');
  const [prefilledService, setPrefilledService] = useState('');
  const [activeSection, setActiveSection] = useState('tickets');
  const [isHandlePortal, setIsHandlePortal] = useState(checkIsHandleRoute);

  useEffect(() => {
    const onRouteCheck = () => setIsHandlePortal(checkIsHandleRoute());
    window.addEventListener('hashchange', onRouteCheck);
    window.addEventListener('popstate', onRouteCheck);
    return () => {
      window.removeEventListener('hashchange', onRouteCheck);
      window.removeEventListener('popstate', onRouteCheck);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (isHandlePortal) return;
    const ids = ['tickets', 'tourist-packages', 'umrah-packages', 'visa-services', 'attestation', 'jobs', 'social-hub', 'contact'];
    const sections = ids.map((id) => ({ id, el: document.getElementById(id) })).filter((s) => s.el);
    const ghosts = Array.from(document.querySelectorAll('.ghost-word'));
    let ticking = false;

    const updateOnScroll = () => {
      ticking = false;
      const vh = window.innerHeight;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el.getBoundingClientRect().top <= 240) {
          setActiveSection(sections[i].id);
          break;
        }
      }

      for (let i = 0; i < ghosts.length; i++) {
        const g = ghosts[i];
        if (!g.parentElement) continue;
        const r = g.parentElement.getBoundingClientRect();
        if (r.bottom < -120 || r.top > vh + 120) continue;
        const gx = (((r.top + r.height / 2) / vh) - 0.5) * -220;
        g.style.setProperty('--gx', `${gx.toFixed(1)}px`);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateOnScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateOnScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHandlePortal]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSelectEnquiry = (topic) => {
    setPrefilledService(topic);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isHandlePortal) {
    const isSubdomain =
      typeof window !== 'undefined' &&
      (window.location.hostname.toLowerCase().startsWith('handle.') ||
        window.location.hostname.toLowerCase().startsWith('admin.'));

    return (
      <ContentProvider>
        <AdminPortal
          onExitToSite={
            isSubdomain
              ? undefined
              : () => {
                  window.history.pushState({}, '', '/');
                  setIsHandlePortal(false);
                }
          }
        />
      </ContentProvider>
    );
  }

  return (
    <ContentProvider>
      <div className="min-h-screen">
        {/* Floating Pill Navbar with Spectrum Progress Line */}
        <Navbar
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onQuickEnquire={handleSelectEnquiry}
        />

        <main>
          {/* 1. Home Page – Terracotta Wall Poster + Hanging Tear-Off Boarding Calendar + Live Airplane/Bus/Train Panorama */}
          <HeroSection onSelectEnquiry={handleSelectEnquiry} />

          {/* SAXAZ Scroll-Pinned 4-Mode Transit Showcase (Flights, Sleeper Buses, Express Rail, Umrah/Visas) with Circular Iris Wipe */}
          <ScrollPinnedTransitShowcase />

          {/* 11. Ticket Booking Terminal (Flight, Train, Bus) + Live Device Preview */}
          <TicketBookingSection onSelectEnquiry={handleSelectEnquiry} />

          {/* SAXAZ Hands-On Interactive Travel Sandbox (Flight Arc Slider, Volvo Sleeper Berth Deck, Embassy Visa Stamp Press, Salary Lab) */}
          <InteractiveTravelLab />

          {/* 2. Tourist Packages */}
          <TouristPackagesSection onSelectEnquiry={handleSelectEnquiry} />

          {/* 3. Sacred Umrah Packages + Interactive Haram Distance & Group Calculator Lab */}
          <UmrahPackagesSection onSelectEnquiry={handleSelectEnquiry} />

          {/* 4. Global Visa Services */}
          <VisaServicesSection onSelectEnquiry={handleSelectEnquiry} />

          {/* 5. Certificate Attestation (Cream Cloth Section + 4-Step Spectrum Loop) */}
          <AttestationSection onSelectEnquiry={handleSelectEnquiry} />

          {/* SAXAZ Scroll-Pinned 365-Day Departure Wall (Counter races 1 -> 365 on scroll + growing palm & ascending airplane) */}
          <ScrollPinnedDepartureWall />

          {/* 6. Job Hiring & Overseas Recruitment */}
          <JobRecruitmentSection onSelectEnquiry={handleSelectEnquiry} />

          {/* 7, 8, 9. Instagram, Facebook & LinkedIn Social Community Wall */}
          <SocialMediaSection />

          {/* 10. Contact & Instant Enquiry Form + WhatsApp Dispatch */}
          <ContactEnquirySection prefilledService={prefilledService} />
        </main>

        {/* Footer + Floating Bottom Glass Dock */}
        <Footer activeSection={activeSection} />
      </div>
    </ContentProvider>
  );
}
