import { useEffect, useState } from 'react';
import { API_URL } from './api';

// Fetches admin-editable pricing packages for a service (by slug), returning just
// the core business fields (name/price/duration/features/popular). Falls back to
// the page's own hardcoded defaults until an admin adds real packages, so the
// page never renders empty. Each page applies its own decorative styling
// (color/badge/icon/tagline) by index when rendering — those aren't CMS fields.
export function useServicePackages(slug, fallbackPackages = []) {
  const [packages, setPackages] = useState(fallbackPackages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/service-packages/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data.length > 0) {
          setPackages(d.data.map((p) => ({
            id: p._id,
            name: p.name,
            price: p.price,
            duration: p.duration,
            features: p.features || [],
            popular: p.popular,
            category: p.category || '',
          })));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return { packages, loading };
}

// Fetches the Service card's full editable content (banner, overview, stats,
// services grid, "why choose us" points, CTA text) for a given slug. Every
// field falls back independently to the page's own hardcoded default, so a
// page renders exactly as before until an admin actually edits that field —
// admins can fully rewrite a service page's content without touching code.
export function useServiceBanner(slug, fallback = {}) {
  const [banner, setBanner] = useState(fallback);

  useEffect(() => {
    fetch(`${API_URL}/api/service-cards/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const data = d.data;
          setBanner((prev) => ({
            ...prev,
            title: data.bannerTitle || fallback.title,
            subtitle: data.bannerSubtitle || fallback.subtitle,
            overview: data.overview || fallback.overview,
            stats: data.stats?.length > 0 ? data.stats : fallback.stats,
            servicesGrid: data.servicesGrid?.length > 0 ? data.servicesGrid : fallback.servicesGrid,
            whyChooseHeading: data.whyChooseHeading || fallback.whyChooseHeading,
            whyChoosePoints: data.whyChoosePoints?.length > 0 ? data.whyChoosePoints : fallback.whyChoosePoints,
            ctaTitle: data.ctaTitle || fallback.ctaTitle,
            ctaSubtitle: data.ctaSubtitle || fallback.ctaSubtitle,
          }));
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return banner;
}
