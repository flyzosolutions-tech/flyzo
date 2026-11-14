import React, { useState, useEffect } from 'react';
import {
  Lock, Mail, Eye, EyeOff, Save, RotateCcw, ExternalLink, Plus, Trash2,
  Upload, CheckCircle2, AlertCircle, LogOut, Sparkles, Compass, Moon,
  Plane, ShieldCheck, FileCheck2, Briefcase, Instagram, PhoneCall, Image as ImageIcon,
  RefreshCw, ArrowLeft
} from 'lucide-react';
import {
  FlyzoMarkSVG,
  CaptainZizo,
  CountryFlagSVG,
  JetVectorIcon,
} from './FlyzoBrandArt';
import { useSiteContent } from '../context/ContentContext';
import { DEFAULT_SITE_CONTENT } from '../data/siteData';

const SESSION_KEY = 'flyzo_handle_admin_session_v1';

const STUDIO_TABS = [
  { id: 'tourist', label: 'Tourist Packages', sub: 'Photos, Prices & Itineraries', icon: Compass, badge: '02' },
  { id: 'umrah', label: 'Umrah Packages', sub: 'Tiers, Distances & Inclusions', icon: Moon, badge: '03' },
  { id: 'hero', label: 'Hero & Flash Deals', sub: 'Main Headline & Hanging Calendar', icon: Sparkles, badge: '01' },
  { id: 'tickets', label: 'Flight, Train & Bus', sub: 'Popular Corridors & Fares', icon: Plane, badge: '11' },
  { id: 'visas', label: 'Global Visas', sub: 'Countries, Fees & Checklists', icon: ShieldCheck, badge: '04' },
  { id: 'attestation', label: 'Attestation', sub: '4-Step Track & Document Types', icon: FileCheck2, badge: '05' },
  { id: 'jobs', label: 'Overseas Jobs', sub: 'GCC & Europe Openings', icon: Briefcase, badge: '06' },
  { id: 'social', label: 'Socials & Contact', sub: 'IG Photos, FB, LinkedIn & Phones', icon: Instagram, badge: '07–10' },
];

const FLAG_OPTIONS = [
  { code: 'ae', label: 'UAE' },
  { code: 'sa', label: 'Saudi Arabia' },
  { code: 'qa', label: 'Qatar' },
  { code: 'om', label: 'Oman' },
  { code: 'kw', label: 'Kuwait' },
  { code: 'eu', label: 'Schengen / Europe' },
  { code: 'gb', label: 'UK / USA' },
  { code: 'sg', label: 'Singapore / Asia' },
];

// Client-side image optimizer so phone/DSLR photos upload fast & crisp
async function compressImageFile(file, maxWidth = 1200, quality = 0.84) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image format'));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function AdminPortal({ onExitToSite }) {
  const { content, setContent, refreshContent } = useSiteContent();

  // Auth State
  const [auth, setAuth] = useState(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loginEmail, setLoginEmail] = useState('flyzosolutions@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Studio Editor State
  const [activeTab, setActiveTab] = useState('tourist');
  const [ticketModeTab, setTicketModeTab] = useState('flight');
  const [draft, setDraft] = useState(() => content || DEFAULT_SITE_CONTENT);
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!hasUnsaved && content) {
      setDraft(content);
    }
  }, [content, hasUnsaved]);

  const showNotice = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 5000);
  };

  const updateDraft = (updater) => {
    setDraft((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return next;
    });
    setHasUnsaved(true);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          email: loginEmail.trim(),
          password: loginPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Invalid login credentials');
      }
      const sessionObj = { email: loginEmail.trim(), password: loginPassword };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionObj));
      setAuth(sessionObj);
      await refreshContent();
      showNotice('success', 'Logged into Flyzo Handle Studio!');
    } catch (err) {
      setAuthError(err.message || 'Could not sign in. Please check your password.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuth(null);
    setLoginPassword('');
  };

  // Save & Publish Live to flyzo.info
  const handlePublishLive = async () => {
    if (!auth) return;
    setSaving(true);
    try {
      // Immediately update local context so same-browser preview reflects changes at once
      setContent(draft);

      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save-content',
          email: auth.email,
          password: auth.password,
          content: draft,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to publish changes');
      }
      setHasUnsaved(false);
      showNotice('success', 'Published Live! All changes are now active on flyzo.info');
    } catch (err) {
      showNotice('error', err.message || 'Failed to publish to live website');
    } finally {
      setSaving(false);
    }
  };

  // Upload Image from Device
  const handleImageUpload = async (file, uploadId, onUrlReady) => {
    if (!file || !auth) return;
    setUploadingKey(uploadId);
    try {
      const compressedDataUrl = await compressImageFile(file);
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'upload-image',
          email: auth.email,
          password: auth.password,
          fileName: file.name.replace(/\.[^.]+$/, '.jpg'),
          fileBase64: compressedDataUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Image upload failed');
      }
      onUrlReady(data.imageUrl);
      showNotice('success', 'Photo uploaded! Click "Save & Publish Live" to make it permanent.');
    } catch (err) {
      showNotice('error', err.message || 'Could not upload photo');
    } finally {
      setUploadingKey(null);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all content in the editor back to Flyzo original defaults?')) {
      setDraft(DEFAULT_SITE_CONTENT);
      setHasUnsaved(true);
      showNotice('success', 'Default content restored in editor. Click "Save & Publish Live" to apply.');
    }
  };

  // ============================================================================
  // 1. LOGIN SCREEN (IF NOT AUTHENTICATED)
  // ============================================================================
  if (!auth) {
    return (
      <div className="min-h-screen oxide-wall flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
        {/* Giant Background Ghost Word */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none fixed -left-8 -bottom-20 font-extrabold leading-none text-[#9e2e0e] opacity-80"
          style={{
            fontFamily: 'var(--display)',
            fontStretch: '75%',
            fontSize: 'clamp(14rem, 32vw, 34rem)',
            zIndex: 0,
          }}
        >
          HANDLE
        </span>

        {/* Top Bar */}
        <div className="relative z-10 max-w-[1200px] w-full mx-auto flex items-center justify-between">
          <a
            href="https://flyzo.info"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#140f0a] text-[#fbce12] text-xs font-extrabold border border-[#fbce12]/40 hover:brightness-110"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to flyzo.info</span>
          </a>
          <span className="px-3.5 py-1.5 rounded-full bg-[#140f0a]/90 text-[#f8efdc] font-mono text-xs font-extrabold">
            HANDLE.FLYZO.INFO • ADMIN STUDIO
          </span>
        </div>

        {/* Center Boarding-Pass Login Card */}
        <div className="relative z-10 my-auto max-w-[460px] w-full mx-auto pt-8 pb-12">
          <div className="rounded-t-2xl bg-[#140f0a] px-6 py-4 flex items-center justify-between border-2 border-b-0 border-[#140f0a]">
            <FlyzoMarkSVG variant="dark" className="h-6 w-auto" />
            <span className="px-2.5 py-1 rounded bg-[#fbce12] text-[#140f0a] font-mono text-[11px] font-extrabold uppercase">
              ADMIN GATE #01
            </span>
          </div>

          <div
            aria-hidden="true"
            className="h-[9px]"
            style={{
              background:
                'linear-gradient(180deg, #e7c15c 0 2px, #fbf5e6 2px 3px, #c4942e 3px 6px, #fbf5e6 6px 7px, #e7c15c 7px)',
            }}
          />

          <div className="bg-[#fbf5e6] text-[#1c140c] p-6 sm:p-8 rounded-b-2xl border-2 border-t-0 border-[#140f0a] shadow-2xl space-y-6">
            <div className="flex items-center justify-between gap-4 border-b-2 border-[#1c140c] pb-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#b5391a] block">
                  FLYZO CONTENT MANAGEMENT PORTAL
                </span>
                <h1 className="poster-h2 !text-3xl !text-[#1c140c] mt-0.5">
                  Sign in to Handle Studio
                </h1>
              </div>
              <CaptainZizo size={62} />
            </div>

            <p className="text-xs sm:text-sm text-[#5a4d3c] font-semibold leading-relaxed">
              Manage all live images, package prices, subtexts, Umrah tiers, visa fees, jobs, and contact details on{' '}
              <strong className="text-[#1c140c]">flyzo.info</strong>.
            </p>

            {authError && (
              <div className="p-3.5 rounded-xl bg-[#fbe2cd] border-2 border-[#b5391a] text-[#8a2f10] text-xs font-extrabold flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <label className="block">
                <span className="text-xs font-extrabold uppercase text-[#1c140c] flex items-center gap-1.5 mb-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#b5391a]" /> Official Admin Email
                </span>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="flyzosolutions@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#1c140c] bg-white text-[#1c140c] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#fbce12]"
                />
              </label>

              <label className="block">
                <span className="text-xs font-extrabold uppercase text-[#1c140c] flex items-center gap-1.5 mb-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#b5391a]" /> Studio Password
                </span>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your studio password"
                    className="w-full px-4 py-3 pr-11 rounded-xl border-2 border-[#1c140c] bg-white text-[#1c140c] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#fbce12]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a4d3c] hover:text-[#1c140c]"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </label>

              <button
                type="submit"
                disabled={authLoading}
                className="tactile-btn w-full py-4 px-6 bg-[#140f0a] text-[#fbce12] text-sm sm:text-base mt-2 disabled:opacity-60"
              >
                {authLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Boarding Pass...</span>
                  </>
                ) : (
                  <>
                    <span>Unlock Flyzo Content Studio</span>
                    <JetVectorIcon className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="relative z-10 text-center text-xs font-bold text-[#f8efdc]/80">
          Connected directly to live production • https://flyzo.info
        </div>
      </div>
    );
  }

  // ============================================================================
  // 2. MAIN CONTENT STUDIO DASHBOARD
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#f6eee0] text-[#140f0a] pb-24">
      {/* Sticky Top Studio Header */}
      <header className="sticky top-0 z-50 bg-[#140f0a] text-[#f8efdc] border-b-4 border-[#fbce12] shadow-xl">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand + Status */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2.5">
              <FlyzoMarkSVG variant="dark" className="h-5 w-auto" />
              <span className="px-2 py-0.5 rounded bg-[#fbce12] text-[#140f0a] font-mono text-[10px] font-extrabold uppercase">
                HANDLE STUDIO
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs font-extrabold">
              {hasUnsaved ? (
                <span className="px-3 py-1 rounded-full bg-[#f9823f] text-[#140f0a] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Unsaved Edits — Click &ldquo;Save &amp; Publish Live&rdquo;
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-[#8ae2a5] text-[#0c2d17] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Synced with flyzo.info
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {onExitToSite ? (
              <button
                type="button"
                onClick={onExitToSite}
                className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#f8efdc] text-xs font-extrabold flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Preview Site
              </button>
            ) : (
              <a
                href="https://flyzo.info"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#f8efdc] text-xs font-extrabold flex items-center gap-1.5"
              >
                <span>Open flyzo.info</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-3.5 py-2 rounded-full border border-white/25 hover:bg-white/10 text-xs font-extrabold text-[#f8efdc] flex items-center gap-1.5"
              title="Restore original default website content"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={handlePublishLive}
              disabled={saving}
              className="tactile-btn px-5 py-2.5 bg-[#fbce12] text-[#140f0a] text-xs sm:text-sm font-extrabold disabled:opacity-60"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Publishing to flyzo.info...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save &amp; Publish Live</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-full bg-white/10 hover:bg-[#b5391a] text-white transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fadeIn">
          <div
            className={`p-4 rounded-2xl border-2 border-[#140f0a] shadow-2xl flex items-center gap-3 font-extrabold text-xs sm:text-sm ${
              toast.type === 'error'
                ? 'bg-[#fbe2cd] text-[#8a2f10]'
                : 'bg-[#8ae2a5] text-[#0c2d17]'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Split Studio Layout */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 pt-8 grid lg:grid-cols-12 gap-8 items-start">
        {/* Left 3 Cols: Section Switcher Sidebar */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-2">
          <div className="p-4 rounded-2xl bg-[#140f0a] text-[#f8efdc] mb-3 flex items-center gap-3">
            <CaptainZizo size={48} />
            <div>
              <span className="text-[10px] font-mono uppercase text-[#fbce12] font-extrabold block">
                SELECT A SECTION
              </span>
              <p className="text-xs font-bold text-[#c8bba8]">
                Pick any website section below to edit photos, prices &amp; text.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {STUDIO_TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#fbce12] text-[#140f0a] border-[#140f0a] shadow-md -translate-y-0.5'
                      : 'bg-[#fbf5e6] text-[#140f0a] border-[#d8cbb3] hover:border-[#140f0a]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-9 h-9 rounded-xl grid place-items-center shrink-0 ${
                        isSelected ? 'bg-[#140f0a] text-[#fbce12]' : 'bg-[#e9dec6] text-[#140f0a]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <b className="text-xs sm:text-sm font-extrabold block truncate">{tab.label}</b>
                      <span className="text-[11px] opacity-75 block truncate font-semibold">
                        {tab.sub}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] font-extrabold px-2 py-0.5 rounded bg-black/10 shrink-0">
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right 9 Cols: Active Visual Section Editor */}
        <main className="lg:col-span-9 space-y-6">
          {/* ================================================================
              TAB 1: TOURIST PACKAGES EDITOR (IMAGES, SUBTEXTS, PRICES, ITINERARY)
             ================================================================ */}
          {activeTab === 'tourist' && (
            <div className="space-y-6">
              <div className="p-6 rounded-[24px] bg-[#fbf5e6] border-2 border-[#140f0a] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f9823f] text-[#140f0a] text-xs font-extrabold uppercase">
                    02 • INTERNATIONAL &amp; DOMESTIC HOLIDAYS
                  </span>
                  <h2 className="poster-h2 !text-2xl sm:!text-3xl mt-1">
                    Tourist Packages ({draft.touristPackages.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5a4d3c] font-semibold mt-0.5">
                    Upload new destination photos, change package prices, edit highlights or day-by-day plans.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateDraft((prev) => ({
                      ...prev,
                      touristPackages: [
                        {
                          id: `pkg-${Date.now()}`,
                          title: 'New Holiday Package Title',
                          category: 'Middle East',
                          duration: '5 Days / 4 Nights',
                          price: '₹49,999',
                          rating: '4.9',
                          reviews: 120,
                          badge: 'New Launch',
                          image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
                          highlights: [
                            'Return Flights & Visa Included',
                            '4-Star Hotel with Daily Breakfast',
                            'Private Airport Transfers & Sightseeing',
                          ],
                          itinerary: [
                            'Day 1: Arrival & VIP Hotel Check-in',
                            'Day 2: Guided City Tour & Landmarks',
                            'Day 3: Adventure Excursion & Dinner',
                            'Day 4: Shopping & Departure Transfer',
                          ],
                        },
                        ...prev.touristPackages,
                      ],
                    }));
                    showNotice('success', 'Added new Tourist Package card at the top!');
                  }}
                  className="tactile-btn px-4 py-3 bg-[#140f0a] text-[#fbce12] text-xs sm:text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Package</span>
                </button>
              </div>

              <div className="space-y-6">
                {draft.touristPackages.map((pkg, idx) => (
                  <div
                    key={pkg.id || idx}
                    className="rounded-[26px] bg-[#fbf5e6] border-2 border-[#140f0a] overflow-hidden shadow-lg"
                  >
                    {/* Card Top Bar */}
                    <div className="px-6 py-3.5 bg-[#140f0a] text-[#f8efdc] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded bg-[#fbce12] text-[#140f0a] font-mono text-xs font-extrabold">
                          PACKAGE #{idx + 1}
                        </span>
                        <strong className="text-sm sm:text-base font-extrabold truncate">
                          {pkg.title}
                        </strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete "${pkg.title}"?`)) {
                            updateDraft((prev) => ({
                              ...prev,
                              touristPackages: prev.touristPackages.filter((_, i) => i !== idx),
                            }));
                          }
                        }}
                        className="px-3 py-1 rounded-lg bg-[#b5391a] text-white text-xs font-extrabold flex items-center gap-1 hover:brightness-110"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>

                    <div className="p-6 grid md:grid-cols-12 gap-6">
                      {/* Left 5 Cols: Live Image Preview + Upload Button */}
                      <div className="md:col-span-5 space-y-3">
                        <div className="relative h-52 rounded-2xl overflow-hidden border-2 border-[#140f0a] bg-[#140f0a]">
                          <img
                            src={pkg.image}
                            alt={pkg.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#fbce12] text-[#140f0a] text-xs font-extrabold border border-[#140f0a]">
                            {pkg.badge}
                          </span>
                          <span className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[#140f0a]/90 text-[#fbce12] font-mono text-sm font-extrabold">
                            {pkg.price}
                          </span>
                        </div>

                        <label className="tactile-btn w-full py-2.5 px-4 bg-[#140f0a] text-[#fbce12] text-xs cursor-pointer flex items-center justify-center gap-2">
                          {uploadingKey === `tourist-${idx}` ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Uploading Photo...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              <span>Upload Photo from Device</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(file, `tourist-${idx}`, (newUrl) => {
                                  updateDraft((prev) => {
                                    const list = [...prev.touristPackages];
                                    list[idx] = { ...list[idx], image: newUrl };
                                    return { ...prev, touristPackages: list };
                                  });
                                });
                              }
                            }}
                          />
                        </label>

                        <label className="block">
                          <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] flex items-center gap-1 mb-1">
                            <ImageIcon className="w-3 h-3" /> Or Paste Image URL Directly
                          </span>
                          <input
                            type="text"
                            value={pkg.image}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateDraft((prev) => {
                                const list = [...prev.touristPackages];
                                list[idx] = { ...list[idx], image: val };
                                return { ...prev, touristPackages: list };
                              });
                            }}
                            className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white text-xs font-mono"
                          />
                        </label>
                      </div>

                      {/* Right 7 Cols: Title, Price, Duration, Subtexts & Itinerary */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <label className="sm:col-span-2 block">
                            <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                              Package Title
                            </span>
                            <input
                              type="text"
                              value={pkg.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateDraft((prev) => {
                                  const list = [...prev.touristPackages];
                                  list[idx] = { ...list[idx], title: val };
                                  return { ...prev, touristPackages: list };
                                });
                              }}
                              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#140f0a] bg-white font-extrabold text-sm"
                            />
                          </label>

                          <label className="block">
                            <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                              Package Price
                            </span>
                            <input
                              type="text"
                              value={pkg.price}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateDraft((prev) => {
                                  const list = [...prev.touristPackages];
                                  list[idx] = { ...list[idx], price: val };
                                  return { ...prev, touristPackages: list };
                                });
                              }}
                              className="w-full px-3.5 py-2 rounded-xl border-2 border-[#140f0a] bg-white font-mono font-extrabold text-sm text-[#b5391a]"
                            />
                          </label>

                          <label className="block">
                            <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                              Duration (e.g. 5 Days / 4 Nights)
                            </span>
                            <input
                              type="text"
                              value={pkg.duration}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateDraft((prev) => {
                                  const list = [...prev.touristPackages];
                                  list[idx] = { ...list[idx], duration: val };
                                  return { ...prev, touristPackages: list };
                                });
                              }}
                              className="w-full px-3.5 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-sm"
                            />
                          </label>

                          <label className="block">
                            <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                              Category Filter Tab
                            </span>
                            <select
                              value={pkg.category}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateDraft((prev) => {
                                  const list = [...prev.touristPackages];
                                  list[idx] = { ...list[idx], category: val };
                                  return { ...prev, touristPackages: list };
                                });
                              }}
                              className="w-full px-3.5 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-sm"
                            >
                              <option value="Middle East">Middle East</option>
                              <option value="Europe">Europe</option>
                              <option value="Asia">Asia</option>
                              <option value="Island">Island</option>
                              <option value="Domestic">Domestic</option>
                            </select>
                          </label>

                          <label className="block">
                            <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                              Top Sticker Badge
                            </span>
                            <input
                              type="text"
                              value={pkg.badge}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateDraft((prev) => {
                                  const list = [...prev.touristPackages];
                                  list[idx] = { ...list[idx], badge: val };
                                  return { ...prev, touristPackages: list };
                                });
                              }}
                              className="w-full px-3.5 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-sm"
                            />
                          </label>
                        </div>

                        <label className="block">
                          <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                            Card Highlights / Subtexts (One bullet point per line)
                          </span>
                          <textarea
                            rows={4}
                            value={(pkg.highlights || []).join('\n')}
                            onChange={(e) => {
                              const lines = e.target.value.split('\n');
                              updateDraft((prev) => {
                                const list = [...prev.touristPackages];
                                list[idx] = { ...list[idx], highlights: lines };
                                return { ...prev, touristPackages: list };
                              });
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#b9aa8b] bg-white font-semibold text-xs sm:text-sm leading-relaxed"
                          />
                        </label>

                        <label className="block">
                          <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                            Day-by-Day Itinerary Popup Plan (One day per line)
                          </span>
                          <textarea
                            rows={4}
                            value={(pkg.itinerary || []).join('\n')}
                            onChange={(e) => {
                              const lines = e.target.value.split('\n');
                              updateDraft((prev) => {
                                const list = [...prev.touristPackages];
                                list[idx] = { ...list[idx], itinerary: lines };
                                return { ...prev, touristPackages: list };
                              });
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#b9aa8b] bg-white font-semibold text-xs leading-relaxed"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 2: UMRAH PACKAGES EDITOR
             ================================================================ */}
          {activeTab === 'umrah' && (
            <div className="space-y-6">
              <div className="p-6 rounded-[24px] bg-[#0f2747] text-[#f8efdc] border-2 border-[#140f0a] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#fbce12] text-[#140f0a] text-xs font-extrabold uppercase">
                    03 • SACRED UMRAH &amp; ZIYARAT
                  </span>
                  <h2 className="poster-h2 !text-2xl sm:!text-3xl !text-[#f8efdc] mt-1">
                    Sacred Umrah Packages ({draft.umrahPackages.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-[#c9d6e6] font-semibold mt-0.5">
                    Edit Umrah package rates, Makkah &amp; Madinah Haram walking distances, and inclusions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateDraft((prev) => ({
                      ...prev,
                      umrahPackages: [
                        ...prev.umrahPackages,
                        {
                          id: `umrah-${Date.now()}`,
                          tier: 'Special Group',
                          title: '14 Days Guided Umrah Group',
                          price: '₹78,000',
                          duration: '14 Days (7N Makkah / 7N Madinah)',
                          distanceMakkah: '500m from Haram',
                          distanceMadinah: '300m from Masjid an-Nabawi',
                          image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80',
                          featured: false,
                          inclusions: [
                            'Return Direct Flights Included',
                            'Umrah Visa & Insurance',
                            'Makkah & Madinah Hotels with Buffet',
                            '5L Zamzam & Umrah Kit',
                          ],
                        },
                      ],
                    }));
                  }}
                  className="tactile-btn px-4 py-3 bg-[#fbce12] text-[#140f0a] text-xs sm:text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Umrah Tier</span>
                </button>
              </div>

              <div className="space-y-6">
                {draft.umrahPackages.map((pkg, idx) => (
                  <div
                    key={pkg.id || idx}
                    className="rounded-[26px] bg-[#fbf5e6] border-2 border-[#140f0a] p-6 space-y-4 shadow-lg"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-[#140f0a]">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-[#140f0a] text-[#fbce12] font-mono text-xs font-extrabold">
                          UMRAH TIER #{idx + 1}
                        </span>
                        <label className="inline-flex items-center gap-2 text-xs font-extrabold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!pkg.featured}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              updateDraft((prev) => {
                                const list = [...prev.umrahPackages];
                                list[idx] = { ...list[idx], featured: checked };
                                return { ...prev, umrahPackages: list };
                              });
                            }}
                            className="w-4 h-4 accent-[#b5391a]"
                          />
                          <span>Highlight as Gold Featured Card</span>
                        </label>
                      </div>

                      {draft.umrahPackages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete "${pkg.title}"?`)) {
                              updateDraft((prev) => ({
                                ...prev,
                                umrahPackages: prev.umrahPackages.filter((_, i) => i !== idx),
                              }));
                            }
                          }}
                          className="px-3 py-1 rounded-lg bg-[#b5391a] text-white text-xs font-extrabold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <label className="block">
                        <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Tier Badge (e.g. Economy / 5-Star)
                        </span>
                        <input
                          type="text"
                          value={pkg.tier}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.umrahPackages];
                              list[idx] = { ...list[idx], tier: val };
                              return { ...prev, umrahPackages: list };
                            });
                          }}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#b9aa8b] bg-white font-extrabold text-sm"
                        />
                      </label>

                      <label className="block">
                        <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Price Per Pilgrim
                        </span>
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.umrahPackages];
                              list[idx] = { ...list[idx], price: val };
                              return { ...prev, umrahPackages: list };
                            });
                          }}
                          className="w-full px-3.5 py-2 rounded-xl border-2 border-[#140f0a] bg-white font-mono font-extrabold text-sm text-[#b5391a]"
                        />
                      </label>

                      <label className="block">
                        <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Duration Text
                        </span>
                        <input
                          type="text"
                          value={pkg.duration}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.umrahPackages];
                              list[idx] = { ...list[idx], duration: val };
                              return { ...prev, umrahPackages: list };
                            });
                          }}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-sm"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                        Package Headline Title
                      </span>
                      <input
                        type="text"
                        value={pkg.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateDraft((prev) => {
                            const list = [...prev.umrahPackages];
                            list[idx] = { ...list[idx], title: val };
                            return { ...prev, umrahPackages: list };
                          });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#140f0a] bg-white font-extrabold text-sm"
                      />
                    </label>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Makkah Hotel Distance Subtext
                        </span>
                        <input
                          type="text"
                          value={pkg.distanceMakkah}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.umrahPackages];
                              list[idx] = { ...list[idx], distanceMakkah: val };
                              return { ...prev, umrahPackages: list };
                            });
                          }}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-sm"
                        />
                      </label>

                      <label className="block">
                        <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Madinah Hotel Distance Subtext
                        </span>
                        <input
                          type="text"
                          value={pkg.distanceMadinah}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.umrahPackages];
                              list[idx] = { ...list[idx], distanceMadinah: val };
                              return { ...prev, umrahPackages: list };
                            });
                          }}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-sm"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                        Package Inclusions (One bullet line per inclusion)
                      </span>
                      <textarea
                        rows={5}
                        value={(pkg.inclusions || []).join('\n')}
                        onChange={(e) => {
                          const lines = e.target.value.split('\n');
                          updateDraft((prev) => {
                            const list = [...prev.umrahPackages];
                            list[idx] = { ...list[idx], inclusions: lines };
                            return { ...prev, umrahPackages: list };
                          });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#b9aa8b] bg-white font-semibold text-xs sm:text-sm leading-relaxed"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 3: HERO & HANGING CALENDAR FLASH DEALS
             ================================================================ */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="p-6 rounded-[24px] bg-[#fbf5e6] border-2 border-[#140f0a] space-y-4 shadow-lg">
                <span className="px-2.5 py-0.5 rounded-full bg-[#b5391a] text-[#f8efdc] text-xs font-extrabold uppercase">
                  01 • HOME HERO POSTER &amp; SUBTEXTS
                </span>
                <h2 className="poster-h2 !text-2xl sm:!text-3xl">
                  Main Welcome Banner &amp; Subtexts
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="sm:col-span-2 block">
                    <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                      Top Accreditation Strip Text
                    </span>
                    <input
                      type="text"
                      value={draft.hero.badge}
                      onChange={(e) =>
                        updateDraft((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, badge: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#b9aa8b] bg-white font-extrabold text-xs sm:text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                      Yellow Highlighted Headline Words
                    </span>
                    <input
                      type="text"
                      value={draft.hero.headlineHighlight}
                      onChange={(e) =>
                        updateDraft((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, headlineHighlight: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#140f0a] bg-white font-extrabold text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                      Main Headline Continuation
                    </span>
                    <input
                      type="text"
                      value={draft.hero.headlineMain}
                      onChange={(e) =>
                        updateDraft((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, headlineMain: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#140f0a] bg-white font-extrabold text-sm"
                    />
                  </label>

                  <label className="sm:col-span-2 block">
                    <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                      Sub-Headline Text
                    </span>
                    <input
                      type="text"
                      value={draft.hero.headlineSub}
                      onChange={(e) =>
                        updateDraft((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, headlineSub: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#b9aa8b] bg-white font-bold text-sm"
                    />
                  </label>

                  <label className="sm:col-span-2 block">
                    <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                      Hero Description Paragraph
                    </span>
                    <textarea
                      rows={3}
                      value={draft.hero.description}
                      onChange={(e) =>
                        updateDraft((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, description: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#b9aa8b] bg-white font-semibold text-sm leading-relaxed"
                    />
                  </label>
                </div>
              </div>

              {/* Hanging Boarding Calendar Deals A / B / C */}
              <div className="p-6 rounded-[24px] bg-[#fbf5e6] border-2 border-[#140f0a] space-y-4 shadow-lg">
                <h3 className="poster-h2 !text-2xl">
                  Hanging Tear-Off Boarding Calendar Deals (A, B, C)
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                      Calendar Kicker Label
                    </span>
                    <input
                      type="text"
                      value={draft.hero.calendarTitle}
                      onChange={(e) =>
                        updateDraft((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, calendarTitle: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                      Calendar Prompt Question
                    </span>
                    <input
                      type="text"
                      value={draft.hero.calendarQuestion}
                      onChange={(e) =>
                        updateDraft((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, calendarQuestion: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-sm"
                    />
                  </label>
                </div>

                <div className="space-y-4 pt-2">
                  {draft.dailyDeals.map((deal, idx) => (
                    <div
                      key={deal.code || idx}
                      className="p-4 rounded-2xl bg-[#e9dec6] border border-[#140f0a] space-y-3"
                    >
                      <div className="grid sm:grid-cols-4 gap-3">
                        <label className="sm:col-span-2 block">
                          <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                            Option {deal.code} Title
                          </span>
                          <input
                            type="text"
                            value={deal.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateDraft((prev) => {
                                const list = [...prev.dailyDeals];
                                list[idx] = { ...list[idx], title: val };
                                return { ...prev, dailyDeals: list };
                              });
                            }}
                            className="w-full px-3 py-2 rounded-xl border border-[#140f0a] bg-white font-extrabold text-sm"
                          />
                        </label>
                        <label className="block">
                          <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                            Deal Price
                          </span>
                          <input
                            type="text"
                            value={deal.price}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateDraft((prev) => {
                                const list = [...prev.dailyDeals];
                                list[idx] = { ...list[idx], price: val };
                                return { ...prev, dailyDeals: list };
                              });
                            }}
                            className="w-full px-3 py-2 rounded-xl border border-[#140f0a] bg-white font-mono font-extrabold text-sm text-[#b5391a]"
                          />
                        </label>
                        <label className="block">
                          <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                            Tag
                          </span>
                          <input
                            type="text"
                            value={deal.tag}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateDraft((prev) => {
                                const list = [...prev.dailyDeals];
                                list[idx] = { ...list[idx], tag: val };
                                return { ...prev, dailyDeals: list };
                              });
                            }}
                            className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-sm"
                          />
                        </label>
                      </div>

                      <label className="block">
                        <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Unlocked Boarding Pass Subtext Reply
                        </span>
                        <input
                          type="text"
                          value={deal.reply}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.dailyDeals];
                              list[idx] = { ...list[idx], reply: val };
                              return { ...prev, dailyDeals: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-semibold text-xs sm:text-sm"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 4: FLIGHT, TRAIN & BUS POPULAR ROUTES
             ================================================================ */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              <div className="p-6 rounded-[24px] bg-[#fbf5e6] border-2 border-[#140f0a] space-y-4 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1aa3e4] text-[#140f0a] text-xs font-extrabold uppercase">
                      11 • MULTI-MODAL TICKET CORRIDORS
                    </span>
                    <h2 className="poster-h2 !text-2xl sm:!text-3xl mt-1">
                      Flight, Train &amp; Bus Popular Fares
                    </h2>
                  </div>

                  <div className="inline-flex p-1 rounded-full bg-[#e9dec6] border border-[#140f0a]">
                    {[
                      { id: 'flight', label: 'Flights' },
                      { id: 'train', label: 'Trains' },
                      { id: 'bus', label: 'Luxury Buses' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setTicketModeTab(m.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                          ticketModeTab === m.id
                            ? 'bg-[#140f0a] text-[#fbce12]'
                            : 'text-[#5a4d3c] hover:text-[#140f0a]'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {(draft.popularRoutes[ticketModeTab] || []).map((route, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#e9dec6] border border-[#140f0a] grid sm:grid-cols-12 gap-3 items-end"
                    >
                      <label className="sm:col-span-3 block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Origin (From)
                        </span>
                        <input
                          type="text"
                          value={route.from}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.popularRoutes[ticketModeTab]];
                              list[idx] = { ...list[idx], from: val };
                              return {
                                ...prev,
                                popularRoutes: { ...prev.popularRoutes, [ticketModeTab]: list },
                              };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#140f0a] bg-white font-bold text-xs sm:text-sm"
                        />
                      </label>

                      <label className="sm:col-span-3 block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Destination (To)
                        </span>
                        <input
                          type="text"
                          value={route.to}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.popularRoutes[ticketModeTab]];
                              list[idx] = { ...list[idx], to: val };
                              return {
                                ...prev,
                                popularRoutes: { ...prev.popularRoutes, [ticketModeTab]: list },
                              };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#140f0a] bg-white font-bold text-xs sm:text-sm"
                        />
                      </label>

                      <label className="sm:col-span-3 block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Airline / Train / Operator
                        </span>
                        <input
                          type="text"
                          value={route.airline || route.train || route.operator || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            const keyName =
                              ticketModeTab === 'flight'
                                ? 'airline'
                                : ticketModeTab === 'train'
                                ? 'train'
                                : 'operator';
                            updateDraft((prev) => {
                              const list = [...prev.popularRoutes[ticketModeTab]];
                              list[idx] = { ...list[idx], [keyName]: val };
                              return {
                                ...prev,
                                popularRoutes: { ...prev.popularRoutes, [ticketModeTab]: list },
                              };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-semibold text-xs sm:text-sm"
                        />
                      </label>

                      <label className="sm:col-span-2 block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Starting Fare
                        </span>
                        <input
                          type="text"
                          value={route.price}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.popularRoutes[ticketModeTab]];
                              list[idx] = { ...list[idx], price: val };
                              return {
                                ...prev,
                                popularRoutes: { ...prev.popularRoutes, [ticketModeTab]: list },
                              };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#140f0a] bg-white font-mono font-extrabold text-xs sm:text-sm text-[#b5391a]"
                        />
                      </label>

                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            updateDraft((prev) => ({
                              ...prev,
                              popularRoutes: {
                                ...prev.popularRoutes,
                                [ticketModeTab]: prev.popularRoutes[ticketModeTab].filter(
                                  (_, i) => i !== idx
                                ),
                              },
                            }));
                          }}
                          className="p-2.5 rounded-xl bg-[#b5391a] text-white hover:brightness-110"
                          title="Remove Route"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    updateDraft((prev) => ({
                      ...prev,
                      popularRoutes: {
                        ...prev.popularRoutes,
                        [ticketModeTab]: [
                          ...prev.popularRoutes[ticketModeTab],
                          {
                            from: 'Calicut (CCJ)',
                            to: 'Dubai (DXB)',
                            airline: 'Air India Express / Emirates',
                            price: '₹13,900',
                            tag: 'Direct Flight',
                          },
                        ],
                      },
                    }));
                  }}
                  className="tactile-btn px-4 py-2.5 bg-[#140f0a] text-[#fbce12] text-xs"
                >
                  <Plus className="w-4 h-4" /> Add {ticketModeTab.toUpperCase()} Corridor
                </button>
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 5: GLOBAL VISA SERVICES
             ================================================================ */}
          {activeTab === 'visas' && (
            <div className="space-y-6">
              <div className="p-6 rounded-[24px] bg-[#fbf5e6] border-2 border-[#140f0a] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#8bc34f] text-[#140f0a] text-xs font-extrabold uppercase">
                    04 • GLOBAL VISA STAMPING DESK
                  </span>
                  <h2 className="poster-h2 !text-2xl sm:!text-3xl mt-1">
                    Visa Countries &amp; Fees ({draft.visaServices.length})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateDraft((prev) => ({
                      ...prev,
                      visaServices: [
                        ...prev.visaServices,
                        {
                          country: 'Kuwait / Bahrain',
                          flagCode: 'kw',
                          types: ['Tourist e-Visa', 'Family Visit Visa', 'Work Visa Stamping'],
                          processing: '2 – 4 Working Days',
                          successRate: '99.4%',
                          startingPrice: '₹5,499',
                          documents: 'Passport Scan, White Background Photo, Sponsor Copy',
                        },
                      ],
                    }));
                  }}
                  className="tactile-btn px-4 py-3 bg-[#140f0a] text-[#fbce12] text-xs sm:text-sm"
                >
                  <Plus className="w-4 h-4" /> Add Visa Country
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {draft.visaServices.map((visa, idx) => (
                  <div
                    key={idx}
                    className="rounded-[24px] bg-[#fbf5e6] border-2 border-[#140f0a] p-5 space-y-3.5 shadow-md"
                  >
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#b9aa8b]">
                      <div className="flex items-center gap-2.5">
                        <CountryFlagSVG code={visa.flagCode} className="w-9 h-6" />
                        <strong className="font-extrabold text-base">{visa.country}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Remove "${visa.country}" visa card?`)) {
                            updateDraft((prev) => ({
                              ...prev,
                              visaServices: prev.visaServices.filter((_, i) => i !== idx),
                            }));
                          }
                        }}
                        className="p-1.5 rounded-lg bg-[#b5391a] text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <label className="block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Country Title
                        </span>
                        <input
                          type="text"
                          value={visa.country}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.visaServices];
                              list[idx] = { ...list[idx], country: val };
                              return { ...prev, visaServices: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#140f0a] bg-white font-extrabold text-xs"
                        />
                      </label>

                      <label className="block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Vector Flag
                        </span>
                        <select
                          value={visa.flagCode}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.visaServices];
                              list[idx] = { ...list[idx], flagCode: val };
                              return { ...prev, visaServices: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-xs"
                        >
                          {FLAG_OPTIONS.map((f) => (
                            <option key={f.code} value={f.code}>
                              {f.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Starting Price
                        </span>
                        <input
                          type="text"
                          value={visa.startingPrice}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.visaServices];
                              list[idx] = { ...list[idx], startingPrice: val };
                              return { ...prev, visaServices: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#140f0a] bg-white font-mono font-extrabold text-xs text-[#b5391a]"
                        />
                      </label>

                      <label className="block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Processing Time
                        </span>
                        <input
                          type="text"
                          value={visa.processing}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.visaServices];
                              list[idx] = { ...list[idx], processing: val };
                              return { ...prev, visaServices: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-xs"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                        Visa Types (One per line)
                      </span>
                      <textarea
                        rows={3}
                        value={(visa.types || []).join('\n')}
                        onChange={(e) => {
                          const lines = e.target.value.split('\n');
                          updateDraft((prev) => {
                            const list = [...prev.visaServices];
                            list[idx] = { ...list[idx], types: lines };
                            return { ...prev, visaServices: list };
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-semibold text-xs"
                      />
                    </label>

                    <label className="block">
                      <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                        Required Documents Subtext
                      </span>
                      <input
                        type="text"
                        value={visa.documents}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateDraft((prev) => {
                            const list = [...prev.visaServices];
                            list[idx] = { ...list[idx], documents: val };
                            return { ...prev, visaServices: list };
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-semibold text-xs"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 6: CERTIFICATE ATTESTATION
             ================================================================ */}
          {activeTab === 'attestation' && (
            <div className="space-y-6">
              <div className="p-6 rounded-[24px] bg-[#fbf5e6] border-2 border-[#140f0a] space-y-4">
                <span className="px-2.5 py-0.5 rounded-full bg-[#140f0a] text-[#fbce12] text-xs font-extrabold uppercase">
                  05 • CERTIFICATE ATTESTATION &amp; APOSTILLE
                </span>
                <h2 className="poster-h2 !text-2xl sm:!text-3xl">
                  4-Step Legalization Loop &amp; Document Categories
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {draft.attestationSteps.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#e9dec6] border border-[#140f0a] space-y-2"
                    >
                      <span className="font-mono text-xs font-extrabold text-[#b5391a]">
                        STEP {s.step}
                      </span>
                      <input
                        type="text"
                        value={s.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateDraft((prev) => {
                            const list = [...prev.attestationSteps];
                            list[idx] = { ...list[idx], title: val };
                            return { ...prev, attestationSteps: list };
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#140f0a] bg-white font-extrabold text-xs sm:text-sm"
                      />
                      <textarea
                        rows={2}
                        value={s.desc}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateDraft((prev) => {
                            const list = [...prev.attestationSteps];
                            list[idx] = { ...list[idx], desc: val };
                            return { ...prev, attestationSteps: list };
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-semibold text-xs"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-4 pt-4">
                  {draft.attestationCategories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border-2 border-[#140f0a] space-y-3"
                    >
                      <label className="block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Category Title
                        </span>
                        <input
                          type="text"
                          value={cat.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.attestationCategories];
                              list[idx] = { ...list[idx], title: val };
                              return { ...prev, attestationCategories: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#140f0a] font-extrabold text-xs sm:text-sm"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Turnaround Time
                        </span>
                        <input
                          type="text"
                          value={cat.turnaround}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.attestationCategories];
                              list[idx] = { ...list[idx], turnaround: val };
                              return { ...prev, attestationCategories: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] font-bold text-xs"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Included Documents (One per line)
                        </span>
                        <textarea
                          rows={4}
                          value={(cat.items || []).join('\n')}
                          onChange={(e) => {
                            const lines = e.target.value.split('\n');
                            updateDraft((prev) => {
                              const list = [...prev.attestationCategories];
                              list[idx] = { ...list[idx], items: lines };
                              return { ...prev, attestationCategories: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] font-semibold text-xs"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 7: OVERSEAS JOBS BOARD
             ================================================================ */}
          {activeTab === 'jobs' && (
            <div className="space-y-6">
              <div className="p-6 rounded-[24px] bg-[#fbf5e6] border-2 border-[#140f0a] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#b8a0d0] text-[#140f0a] text-xs font-extrabold uppercase">
                    06 • OVERSEAS JOB HIRING &amp; RECRUITMENT
                  </span>
                  <h2 className="poster-h2 !text-2xl sm:!text-3xl mt-1">
                    Active Overseas Job Openings ({draft.jobListings.length})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateDraft((prev) => ({
                      ...prev,
                      jobListings: [
                        {
                          id: `job-${Date.now()}`,
                          title: 'New GCC Job Opening',
                          company: 'Verified Overseas Employer',
                          location: 'Dubai, UAE',
                          flagCode: 'ae',
                          category: 'Engineering',
                          salary: 'AED 6,500 – 9,000 / mo',
                          benefits: ['Free Visa & Accommodation', 'Medical Insurance', 'Return Ticket'],
                          experience: '2+ Years Experience',
                          urgent: true,
                        },
                        ...prev.jobListings,
                      ],
                    }));
                  }}
                  className="tactile-btn px-4 py-3 bg-[#140f0a] text-[#fbce12] text-xs sm:text-sm"
                >
                  <Plus className="w-4 h-4" /> Post New Job
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {draft.jobListings.map((job, idx) => (
                  <div
                    key={job.id || idx}
                    className="rounded-[24px] bg-[#fbf5e6] border-2 border-[#140f0a] p-5 space-y-3 shadow-md"
                  >
                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#b9aa8b]">
                      <label className="inline-flex items-center gap-2 text-xs font-extrabold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!job.urgent}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            updateDraft((prev) => {
                              const list = [...prev.jobListings];
                              list[idx] = { ...list[idx], urgent: checked };
                              return { ...prev, jobListings: list };
                            });
                          }}
                          className="w-4 h-4 accent-[#b5391a]"
                        />
                        <span className="text-[#b5391a]">Urgent Wakala Badge</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete job "${job.title}"?`)) {
                            updateDraft((prev) => ({
                              ...prev,
                              jobListings: prev.jobListings.filter((_, i) => i !== idx),
                            }));
                          }
                        }}
                        className="p-1.5 rounded-lg bg-[#b5391a] text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <label className="block">
                      <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                        Job Role Title
                      </span>
                      <input
                        type="text"
                        value={job.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateDraft((prev) => {
                            const list = [...prev.jobListings];
                            list[idx] = { ...list[idx], title: val };
                            return { ...prev, jobListings: list };
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#140f0a] bg-white font-extrabold text-xs sm:text-sm"
                      />
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <label className="block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Employer / Company
                        </span>
                        <input
                          type="text"
                          value={job.company}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.jobListings];
                              list[idx] = { ...list[idx], company: val };
                              return { ...prev, jobListings: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-xs"
                        />
                      </label>

                      <label className="block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Category
                        </span>
                        <select
                          value={job.category}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.jobListings];
                              list[idx] = { ...list[idx], category: val };
                              return { ...prev, jobListings: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-xs"
                        >
                          <option value="Engineering">Engineering</option>
                          <option value="Hospitality">Hospitality</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Logistics & Technical">Logistics &amp; Technical</option>
                        </select>
                      </label>

                      <label className="block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Location &amp; Country
                        </span>
                        <input
                          type="text"
                          value={job.location}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.jobListings];
                              list[idx] = { ...list[idx], location: val };
                              return { ...prev, jobListings: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-xs"
                        />
                      </label>

                      <label className="block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Country Flag
                        </span>
                        <select
                          value={job.flagCode}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.jobListings];
                              list[idx] = { ...list[idx], flagCode: val };
                              return { ...prev, jobListings: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-xs"
                        >
                          {FLAG_OPTIONS.map((f) => (
                            <option key={f.code} value={f.code}>
                              {f.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Monthly Salary Package
                        </span>
                        <input
                          type="text"
                          value={job.salary}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.jobListings];
                              list[idx] = { ...list[idx], salary: val };
                              return { ...prev, jobListings: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#140f0a] bg-white font-mono font-extrabold text-xs text-[#1f6b35]"
                        />
                      </label>

                      <label className="block">
                        <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                          Experience Required
                        </span>
                        <input
                          type="text"
                          value={job.experience}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDraft((prev) => {
                              const list = [...prev.jobListings];
                              list[idx] = { ...list[idx], experience: val };
                              return { ...prev, jobListings: list };
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-bold text-xs"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-[10px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                        Perks &amp; Benefits (One per line)
                      </span>
                      <textarea
                        rows={3}
                        value={(job.benefits || []).join('\n')}
                        onChange={(e) => {
                          const lines = e.target.value.split('\n');
                          updateDraft((prev) => {
                            const list = [...prev.jobListings];
                            list[idx] = { ...list[idx], benefits: lines };
                            return { ...prev, jobListings: list };
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#b9aa8b] bg-white font-semibold text-xs"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 8: SOCIAL MEDIA PHOTOS & OFFICIAL CONTACT NUMBERS
             ================================================================ */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              {/* Contact Numbers & Office Address */}
              <div className="p-6 rounded-[24px] bg-[#fbf5e6] border-2 border-[#140f0a] space-y-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-[#b5391a]" />
                  <h2 className="poster-h2 !text-2xl sm:!text-3xl">
                    Official Phone Numbers, WhatsApp &amp; Calicut Office
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                      Calling Number 1 (Display Text)
                    </span>
                    <input
                      type="text"
                      value={draft.contactInfo.callingNumberDisplay}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateDraft((prev) => ({
                          ...prev,
                          contactInfo: {
                            ...prev.contactInfo,
                            callingNumberDisplay: val,
                            callingNumber: val.replace(/\s+/g, ''),
                          },
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#140f0a] bg-white font-mono font-extrabold text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                      Calling Number 2 (Display Text)
                    </span>
                    <input
                      type="text"
                      value={draft.contactInfo.callingNumberAltDisplay}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateDraft((prev) => ({
                          ...prev,
                          contactInfo: {
                            ...prev.contactInfo,
                            callingNumberAltDisplay: val,
                            callingNumberAlt: val.replace(/\s+/g, ''),
                          },
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#140f0a] bg-white font-mono font-extrabold text-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                      WhatsApp Number (Display Text)
                    </span>
                    <input
                      type="text"
                      value={draft.contactInfo.whatsappNumberDisplay}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateDraft((prev) => ({
                          ...prev,
                          contactInfo: {
                            ...prev.contactInfo,
                            whatsappNumberDisplay: val,
                            whatsappNumber: val.replace(/[^0-9]/g, ''),
                          },
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#1f6b35] bg-white font-mono font-extrabold text-sm text-[#1f6b35]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                      Official Email Address
                    </span>
                    <input
                      type="email"
                      value={draft.contactInfo.officialEmail}
                      onChange={(e) =>
                        updateDraft((prev) => ({
                          ...prev,
                          contactInfo: { ...prev.contactInfo, officialEmail: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#b9aa8b] bg-white font-bold text-sm"
                    />
                  </label>

                  <label className="sm:col-span-2 block">
                    <span className="text-[11px] font-extrabold uppercase text-[#5a4d3c] block mb-1">
                      Head Office Address
                    </span>
                    <input
                      type="text"
                      value={draft.contactInfo.headOfficeAddress}
                      onChange={(e) =>
                        updateDraft((prev) => ({
                          ...prev,
                          contactInfo: { ...prev.contactInfo, headOfficeAddress: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#b9aa8b] bg-white font-bold text-sm"
                    />
                  </label>
                </div>
              </div>

              {/* Instagram Reels & Posts Grid */}
              <div className="p-6 rounded-[24px] bg-[#1c1713] text-[#f8efdc] border-2 border-[#f9823f] space-y-5 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f9823f] text-[#140f0a] text-xs font-extrabold uppercase">
                      07 • INSTAGRAM FEED PHOTOS &amp; CAPTIONS
                    </span>
                    <h3 className="poster-h2 !text-2xl !text-[#f8efdc] mt-1">
                      Instagram Showcase ({draft.socialHub.instagram.handle})
                    </h3>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <label className="block">
                    <span className="text-[10px] font-extrabold uppercase text-[#c8bba8] block mb-1">
                      Instagram Handle
                    </span>
                    <input
                      type="text"
                      value={draft.socialHub.instagram.handle}
                      onChange={(e) =>
                        updateDraft((prev) => ({
                          ...prev,
                          socialHub: {
                            ...prev.socialHub,
                            instagram: { ...prev.socialHub.instagram, handle: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-white font-bold text-xs"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-extrabold uppercase text-[#c8bba8] block mb-1">
                      Followers Badge
                    </span>
                    <input
                      type="text"
                      value={draft.socialHub.instagram.followers}
                      onChange={(e) =>
                        updateDraft((prev) => ({
                          ...prev,
                          socialHub: {
                            ...prev.socialHub,
                            instagram: { ...prev.socialHub.instagram, followers: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-white font-bold text-xs"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-extrabold uppercase text-[#c8bba8] block mb-1">
                      Profile URL
                    </span>
                    <input
                      type="text"
                      value={draft.socialHub.instagram.url}
                      onChange={(e) =>
                        updateDraft((prev) => ({
                          ...prev,
                          socialHub: {
                            ...prev.socialHub,
                            instagram: { ...prev.socialHub.instagram, url: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-white font-mono text-xs"
                    />
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {draft.socialHub.instagram.posts.map((post, idx) => (
                    <div
                      key={post.id || idx}
                      className="rounded-2xl bg-[#120e0b] border border-white/15 p-3.5 space-y-3"
                    >
                      <div className="relative h-40 rounded-xl overflow-hidden bg-black">
                        <img
                          src={post.image}
                          alt={post.caption}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#140f0a] text-[#fbce12] text-[10px] font-extrabold">
                          {post.type}
                        </span>
                      </div>

                      <label className="tactile-btn w-full py-2 px-3 bg-[#f9823f] text-[#140f0a] text-xs cursor-pointer flex items-center justify-center gap-1.5">
                        {uploadingKey === `ig-${idx}` ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Change Photo</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, `ig-${idx}`, (newUrl) => {
                                updateDraft((prev) => {
                                  const posts = [...prev.socialHub.instagram.posts];
                                  posts[idx] = { ...posts[idx], image: newUrl };
                                  return {
                                    ...prev,
                                    socialHub: {
                                      ...prev.socialHub,
                                      instagram: { ...prev.socialHub.instagram, posts },
                                    },
                                  };
                                });
                              });
                            }
                          }}
                        />
                      </label>

                      <textarea
                        rows={3}
                        value={post.caption}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateDraft((prev) => {
                            const posts = [...prev.socialHub.instagram.posts];
                            posts[idx] = { ...posts[idx], caption: val };
                            return {
                              ...prev,
                              socialHub: {
                                ...prev.socialHub,
                                instagram: { ...prev.socialHub.instagram, posts },
                              },
                            };
                          });
                        }}
                        className="w-full px-2.5 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-white font-medium"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
