import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_SITE_CONTENT, buildWhatsAppUrl } from '../data/siteData';

const ContentContext = createContext(null);

const CACHE_KEY = 'flyzo_live_content_cache_v2';

function mergeWithDefaults(incoming) {
  if (!incoming || typeof incoming !== 'object') return DEFAULT_SITE_CONTENT;
  return {
    contactInfo: { ...DEFAULT_SITE_CONTENT.contactInfo, ...(incoming.contactInfo || {}) },
    hero: { ...DEFAULT_SITE_CONTENT.hero, ...(incoming.hero || {}) },
    dailyDeals: Array.isArray(incoming.dailyDeals) && incoming.dailyDeals.length > 0
      ? incoming.dailyDeals
      : DEFAULT_SITE_CONTENT.dailyDeals,
    popularRoutes: {
      flight: Array.isArray(incoming.popularRoutes?.flight)
        ? incoming.popularRoutes.flight
        : DEFAULT_SITE_CONTENT.popularRoutes.flight,
      train: Array.isArray(incoming.popularRoutes?.train)
        ? incoming.popularRoutes.train
        : DEFAULT_SITE_CONTENT.popularRoutes.train,
      bus: Array.isArray(incoming.popularRoutes?.bus)
        ? incoming.popularRoutes.bus
        : DEFAULT_SITE_CONTENT.popularRoutes.bus,
    },
    touristPackages: Array.isArray(incoming.touristPackages)
      ? incoming.touristPackages
      : DEFAULT_SITE_CONTENT.touristPackages,
    umrahPackages: Array.isArray(incoming.umrahPackages) && incoming.umrahPackages.length > 0
      ? incoming.umrahPackages
      : DEFAULT_SITE_CONTENT.umrahPackages,
    visaServices: Array.isArray(incoming.visaServices)
      ? incoming.visaServices
      : DEFAULT_SITE_CONTENT.visaServices,
    attestationSteps: Array.isArray(incoming.attestationSteps) && incoming.attestationSteps.length > 0
      ? incoming.attestationSteps
      : DEFAULT_SITE_CONTENT.attestationSteps,
    attestationCategories: Array.isArray(incoming.attestationCategories)
      ? incoming.attestationCategories
      : DEFAULT_SITE_CONTENT.attestationCategories,
    jobListings: Array.isArray(incoming.jobListings)
      ? incoming.jobListings
      : DEFAULT_SITE_CONTENT.jobListings,
    socialHub: {
      instagram: {
        ...DEFAULT_SITE_CONTENT.socialHub.instagram,
        ...(incoming.socialHub?.instagram || {}),
        posts: Array.isArray(incoming.socialHub?.instagram?.posts)
          ? incoming.socialHub.instagram.posts
          : DEFAULT_SITE_CONTENT.socialHub.instagram.posts,
      },
      facebook: {
        ...DEFAULT_SITE_CONTENT.socialHub.facebook,
        ...(incoming.socialHub?.facebook || {}),
        updates: Array.isArray(incoming.socialHub?.facebook?.updates)
          ? incoming.socialHub.facebook.updates
          : DEFAULT_SITE_CONTENT.socialHub.facebook.updates,
      },
      linkedin: {
        ...DEFAULT_SITE_CONTENT.socialHub.linkedin,
        ...(incoming.socialHub?.linkedin || {}),
        highlights: Array.isArray(incoming.socialHub?.linkedin?.highlights)
          ? incoming.socialHub.linkedin.highlights
          : DEFAULT_SITE_CONTENT.socialHub.linkedin.highlights,
      },
    },
  };
}

export function ContentProvider({ children }) {
  const [content, setContentState] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        return mergeWithDefaults(JSON.parse(cached));
      }
    } catch {
      // Ignore storage error
    }
    return DEFAULT_SITE_CONTENT;
  });
  const [loadingLive, setLoadingLive] = useState(false);

  const setContent = useCallback((updater) => {
    setContentState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : mergeWithDefaults(updater);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage error
      }
      return next;
    });
  }, []);

  const refreshContent = useCallback(async () => {
    setLoadingLive(true);
    try {
      const res = await fetch(`/api/content?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data?.ok && data?.content) {
          const merged = mergeWithDefaults(data.content);
          setContentState(merged);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(merged));
          } catch {
            // Ignore
          }
          setLoadingLive(false);
          return merged;
        }
      }
    } catch {
      // Fallback to static /content.json
    }

    try {
      const fallbackRes = await fetch(`/content.json?t=${Date.now()}`, { cache: 'no-store' });
      if (fallbackRes.ok) {
        const raw = await fallbackRes.json();
        const merged = mergeWithDefaults(raw);
        setContentState(merged);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(merged));
        } catch {
          // Ignore
        }
      }
    } catch {
      // Keep default/cached
    } finally {
      setLoadingLive(false);
    }
    return null;
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  const buildWaUrl = useCallback(
    (msg) => buildWhatsAppUrl(msg, content?.contactInfo?.whatsappNumber),
    [content?.contactInfo?.whatsappNumber]
  );

  return (
    <ContentContext.Provider
      value={{
        content,
        setContent,
        refreshContent,
        loadingLive,
        buildWaUrl,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    return {
      content: DEFAULT_SITE_CONTENT,
      setContent: () => {},
      refreshContent: async () => {},
      loadingLive: false,
      buildWaUrl: (msg) => buildWhatsAppUrl(msg),
    };
  }
  return ctx;
}
