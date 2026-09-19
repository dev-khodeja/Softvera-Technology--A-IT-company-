import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '../utils/api';

const DEFAULT_SETTINGS = {
  siteName: 'SoftVera Technologies',
  tagline: 'Digital Solutions & IT Services',
  logo: '',
  favicon: '',
  ctaText: 'Book Now',
  ctaLink: '/contact',
  navLinks: [
    { label: 'Home', path: '/', order: 0 },
    { label: 'About', path: '/about', order: 1 },
    { label: 'Portfolio', path: '/portfolio', order: 2 },
    { label: 'Academy', path: '/academy', order: 3 },
    { label: 'Service', path: '/service', order: 4 },
    { label: 'Contact', path: '/contact', order: 5 },
  ],
  footerDescription: '',
  footerLinks: [],
  contact: { address: '', email: '', phone: '', whatsapp: '', mapEmbedUrl: '' },
  socials: { facebook: '', youtube: '', linkedin: '', instagram: '', twitter: '', website: '' },
};

const SiteSettingsContext = createContext({ settings: DEFAULT_SETTINGS, loading: true, refresh: () => {} });

const CACHE_KEY = 'sv_site_settings_cache';

// Read any settings cached from a previous load in this browser tab/session so
// the header/logo/footer don't flash back to defaults on a hard refresh while
// the fresh fetch is in flight.
const getCachedSettings = () => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(getCachedSettings);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch(`${API_URL}/api/settings`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const merged = { ...DEFAULT_SETTINGS, ...d.data };
          setSettings(merged);
          try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(d.data)); } catch { /* storage unavailable, ignore */ }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, refresh: load }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
