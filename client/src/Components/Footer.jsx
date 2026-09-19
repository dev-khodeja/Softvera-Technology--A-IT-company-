import React from 'react';
import { Phone, Mail, MapPin, Facebook, Globe, Youtube, Linkedin, Instagram } from 'lucide-react';
import { NavLink } from 'react-router';
import LogoLight from '../assets/images/transparent softvera.png';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { assetUrl } from '../utils/api';

const SOCIAL_ICONS = {
  facebook: { Icon: Facebook, hover: 'hover:bg-blue-600' },
  youtube: { Icon: Youtube, hover: 'hover:bg-red-600' },
  linkedin: { Icon: Linkedin, hover: 'hover:bg-sky-600' },
  instagram: { Icon: Instagram, hover: 'hover:bg-pink-600' },
  website: { Icon: Globe, hover: 'hover:bg-emerald-600' },
};

const Footer = () => {
  const { settings } = useSiteSettings();
  const logoSrc = settings.logo ? assetUrl(settings.logo) : LogoLight;
  const footerLinks = [...(settings.footerLinks || [])].sort((a, b) => a.order - b.order);
  const socialEntries = Object.entries(settings.socials || {}).filter(([, url]) => url);

  return (
    <footer className="relative bg-navy-950 border-t border-white/5 text-white px-6 md:px-8 pt-16 pb-8 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-accent-500/10 blur-[100px]" />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 max-w-lg">
            <NavLink to="/" className="inline-flex items-center gap-3 mb-5">
              <img src={logoSrc} alt={settings.siteName} className="w-12 h-12 rounded-full object-cover ring-1 ring-white/10" />
              <span className="font-display font-semibold text-lg">{settings.siteName}</span>
            </NavLink>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {settings.footerDescription}
            </p>
            {socialEntries.length > 0 && (
              <div className="flex gap-3">
                {socialEntries.map(([key, url]) => {
                  const entry = SOCIAL_ICONS[key];
                  if (!entry) return null;
                  const { Icon, hover } = entry;
                  return (
                    <a
                      key={key} href={url} target="_blank" rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 ${hover}`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Services / quick links */}
          {footerLinks.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-6 flex items-center gap-2 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                Our Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink to={link.path} className="text-slate-400 hover:text-accent-400 text-sm flex items-center gap-2 transition-colors duration-300 group">
                      <span className="w-1 h-1 rounded-full bg-accent-500/70 group-hover:scale-150 transition-transform" />
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
              Contact Us
            </h4>
            <div className="space-y-4">
              {settings.contact?.address && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-accent-400" />
                  </div>
                  <p className="text-slate-400 text-sm">{settings.contact.address}</p>
                </div>
              )}
              {settings.contact?.email && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-accent-400" />
                  </div>
                  <a href={`mailto:${settings.contact.email}`} className="text-slate-400 hover:text-accent-400 text-sm transition-colors">
                    {settings.contact.email}
                  </a>
                </div>
              )}
              {settings.contact?.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-accent-400" />
                  </div>
                  <a href={`tel:${settings.contact.phone.replace(/\s/g, '')}`} className="text-slate-400 hover:text-accent-400 text-sm transition-colors">
                    {settings.contact.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <NavLink to="/privacy" className="text-slate-500 hover:text-accent-400 text-sm transition-colors">Privacy Policy</NavLink>
            <NavLink to="/terms" className="text-slate-500 hover:text-accent-400 text-sm transition-colors">Terms of Service</NavLink>
            <NavLink to="/cookies" className="text-slate-500 hover:text-accent-400 text-sm transition-colors">Cookie Policy</NavLink>
            <NavLink to="/contact" className="text-slate-500 hover:text-accent-400 text-sm transition-colors">Contact</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
