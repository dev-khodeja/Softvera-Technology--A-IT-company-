import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import LogoLight from '../assets/images/transparent softvera.png';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { assetUrl } from '../utils/api';

const Header = () => {
  const { settings } = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [...(settings.navLinks || [])].sort((a, b) => a.order - b.order);
  const logoSrc = settings.logo ? assetUrl(settings.logo) : LogoLight;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-navy-950/80 backdrop-blur-xl border-b transition-shadow duration-300 ${
        scrolled ? 'border-white/10 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]' : 'border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 h-[76px]">
        <NavLink to="/" className="flex items-center gap-3 shrink-0">
          <img src={logoSrc} alt={settings.siteName} className="h-11 w-11 rounded-full object-cover ring-1 ring-white/10" />
          <span className="hidden sm:block font-display font-semibold text-white text-lg tracking-tight">
            {settings.siteName}
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent-400 to-accent-600"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <NavLink to={settings.ctaLink || '/contact'} className="btn-primary hidden sm:inline-flex !py-2 !px-5 text-sm">
            {settings.ctaText || 'Book Now'} <ArrowRight className="w-4 h-4" />
          </NavLink>
          <button
            type="button"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-slate-200 hover:text-white hover:border-accent-500/50 transition-colors"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && createPortal(
          <>
            <div
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              style={{ zIndex: 60 }}
            />
            <div
              className="fixed top-0 right-0 h-full w-[82%] max-w-sm bg-navy-900 border-l border-white/10 flex flex-col"
              style={{ zIndex: 70, display: 'flex', visibility: 'visible', opacity: 1 }}
            >
              <div className="flex items-center justify-between px-5 h-[76px] border-b border-white/10">
                <img src={logoSrc} alt={settings.siteName} className="h-10 w-10 rounded-full object-cover" />
                <button type="button" onClick={() => setMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-200 hover:text-white" aria-label="Close menu">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col p-5 gap-1 overflow-y-auto text-white">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive ? 'bg-white/8 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto p-5">
                <NavLink to={settings.ctaLink || '/contact'} onClick={() => setMenuOpen(false)} className="btn-primary w-full">
                  {settings.ctaText || 'Book Now'} <ArrowRight className="w-4 h-4" />
                </NavLink>
              </div>
            </div>
          </>,
          document.body,
        )}
    </header>
  );
};

export default Header;
