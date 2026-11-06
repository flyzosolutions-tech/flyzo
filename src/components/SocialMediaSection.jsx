import React from 'react';
import {
  Instagram, Facebook, Linkedin, Heart, ExternalLink,
  ThumbsUp, Briefcase, MessageCircle
} from 'lucide-react';
import { SOCIAL_HUB, buildWhatsAppUrl } from '../data/siteData';

export default function SocialMediaSection() {
  const { instagram, facebook, linkedin } = SOCIAL_HUB;

  return (
    <section
      id="social-hub"
      className="py-20 px-4 sm:px-8 relative overflow-hidden bg-[#120e0b] text-[#f8efdc]"
    >
      {/* Ghost Word */}
      <span
        className="ghost-word right-2 top-4"
        style={{ WebkitTextStrokeColor: 'rgba(248, 239, 220, 0.1)' }}
      >
        COMMUNITY
      </span>

      <div className="max-w-[1240px] mx-auto relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full bg-[#fbce12] text-[#140f0a] font-extrabold text-xs uppercase tracking-wider mb-3">
            07 • 08 • 09 • OFFICIAL SOCIAL MEDIA CHANNELS
          </span>
          <h2 className="poster-h2 !text-[#f8efdc]">
            Follow our daily departures on Instagram, Facebook &amp; LinkedIn.
          </h2>
          <p className="text-base sm:text-lg text-[#b5a896] mt-3 font-medium">
            See real pilgrim videos from Makkah, live visa stamping proofs, group flight fare drops, and walk-in GCC interview announcements.
          </p>
        </div>

        {/* 7. INSTAGRAM SHOWCASE */}
        <div
          id="instagram"
          className="scroll-mt-24 rounded-[28px] bg-[#1c1713] border-2 border-[#f9823f] p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#f9823f] text-[#140f0a] grid place-items-center shrink-0">
                <Instagram className="w-7 h-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="poster-h2 !text-2xl sm:!text-3xl !text-[#f8efdc]">
                    7. Instagram — {instagram.handle}
                  </h3>
                  <span className="px-3 py-0.5 rounded-full bg-[#fbce12] text-[#140f0a] text-xs font-extrabold">
                    {instagram.followers}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#c8bba8] mt-1 font-medium">
                  {instagram.bio}
                </p>
              </div>
            </div>

            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tactile-btn py-3 px-5 bg-[#f9823f] text-[#140f0a] text-xs sm:text-sm shrink-0"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @flyzotravels</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {instagram.posts.map((post) => (
              <a
                key={post.id}
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl overflow-hidden bg-[#120e0b] border border-white/15 hover:border-[#fbce12] flex flex-col justify-between transition-all hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded bg-[#140f0a] text-[#fbce12] text-[10px] font-extrabold uppercase">
                    {post.type}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#f8efdc] line-clamp-3 font-medium">
                    {post.caption}
                  </p>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-extrabold text-[#f9823f]">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-[#f9823f]" /> {post.likes}
                    </span>
                    <span className="text-[#fbce12]">Watch Reel →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 8. FACEBOOK & 9. LINKEDIN SIDE-BY-SIDE */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 8. FACEBOOK */}
          <div
            id="facebook"
            className="scroll-mt-24 rounded-[28px] bg-[#1c1713] border-2 border-[#1aa3e4] p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3.5 pb-5 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-[#1aa3e4] text-[#140f0a] grid place-items-center shrink-0">
                  <Facebook className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="poster-h2 !text-2xl !text-[#f8efdc]">
                    8. Facebook Community
                  </h3>
                  <p className="text-xs font-bold text-[#1aa3e4] mt-0.5">
                    {facebook.likes} • {facebook.rating}
                  </p>
                </div>
              </div>

              <div className="my-5 space-y-4">
                {facebook.updates.map((upd) => (
                  <div
                    key={upd.id}
                    className="p-4 rounded-2xl bg-[#120e0b] border border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-extrabold">
                      <span className="px-2.5 py-0.5 rounded bg-[#1aa3e4] text-[#140f0a]">
                        {upd.badge}
                      </span>
                      <span className="text-[#b5a896]">{upd.date}</span>
                    </div>
                    <h4 className="font-extrabold text-sm sm:text-base text-[#f8efdc]">
                      {upd.title}
                    </h4>
                    <p className="text-xs text-[#b5a896] leading-relaxed">{upd.excerpt}</p>
                    <div className="pt-2 text-[11px] font-bold text-[#1aa3e4] flex items-center gap-1.5">
                      <ThumbsUp className="w-3.5 h-3.5" /> {upd.reactions}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-3 border-t border-white/10">
              <a
                href={facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-btn flex-1 py-3 px-4 bg-[#1aa3e4] text-[#140f0a] text-xs sm:text-sm"
              >
                <Facebook className="w-4 h-4" />
                <span>Open Facebook Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={buildWhatsAppUrl("Hello Flyzo! I saw your Facebook group airfare deal and want to book.")}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-btn py-3 px-4 bg-white/10 text-[#f8efdc] text-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#8bc34f]" /> Claim FB Fare
              </a>
            </div>
          </div>

          {/* 9. LINKEDIN */}
          <div
            id="linkedin"
            className="scroll-mt-24 rounded-[28px] bg-[#1c1713] border-2 border-[#8bc34f] p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3.5 pb-5 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-[#8bc34f] text-[#140f0a] grid place-items-center shrink-0">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="poster-h2 !text-2xl !text-[#f8efdc]">
                    9. LinkedIn Corporate &amp; HR
                  </h3>
                  <p className="text-xs font-bold text-[#8bc34f] mt-0.5">
                    {linkedin.followers} • B2B Travel &amp; GCC Manpower
                  </p>
                </div>
              </div>

              <div className="my-5 space-y-4">
                {linkedin.highlights.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#120e0b] border border-white/10 space-y-1.5"
                  >
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#8bc34f] text-[#140f0a] text-[11px] font-extrabold">
                      <Briefcase className="w-3 h-3" /> {item.tag}
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-[#f8efdc]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#b5a896] leading-relaxed">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-3 border-t border-white/10">
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-btn flex-1 py-3 px-4 bg-[#8bc34f] text-[#140f0a] text-xs sm:text-sm"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={buildWhatsAppUrl("Hello Flyzo Corporate Desk! We want to connect regarding B2B Travel / Manpower hiring.")}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-btn py-3 px-4 bg-white/10 text-[#f8efdc] text-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#fbce12]" /> B2B WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
