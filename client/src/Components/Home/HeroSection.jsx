import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { API_URL, assetUrl } from '../../utils/api';

const useCountUp = (target, duration = 1200) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target) return;
    const steps = 40;
    const interval = duration / steps;
    let count = 0;
    const timer = setInterval(() => {
      count++;
      const next = Math.round((target / steps) * count);
      setValue(next > target ? target : next);
      if (count >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
};

const StatCard = ({ label, value, suffix }) => {
  const count = useCountUp(value);
  return (
    <div className="glass-card rounded-xl p-4 text-center">
      <h5 className="gradient-text font-display font-bold text-2xl mb-1">{count}{suffix}</h5>
      <p className="text-xs text-slate-400 font-medium">{label}</p>
    </div>
  );
};

const DEFAULT_HERO = {
  eyebrow: 'Digital Innovation Partner',
  headingLine1: 'SoftVera Technologies -',
  headingLine2: 'Your Complete Digital Innovation Partner',
  subheading: 'SoftVera Technologies is your premier IT partner for cutting-edge digital solutions.',
  primaryCtaText: 'Get Started', primaryCtaLink: '/contact',
  secondaryCtaText: 'Explore Services', secondaryCtaLink: '#services',
  heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
  badge1Title: 'Secure & Reliable', badge1Subtitle: 'Enterprise-grade security',
  badge2Title: 'Fast Delivery', badge2Subtitle: 'Rapid deployment',
  stats: [],
};

const HeroSection = () => {
  const [hero, setHero] = useState(DEFAULT_HERO);

  useEffect(() => {
    fetch(`${API_URL}/api/hero`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setHero({ ...DEFAULT_HERO, ...d.data }); })
      .catch(() => {});
  }, []);

  return (
    <div className="relative bg-navy-950 bg-grid overflow-hidden pt-[150px] pb-20 px-4 sm:px-10">
      <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-electric-500/10 rounded-full blur-[140px]" />

      <div className="max-w-screen-xl mx-auto relative">
        <div className="grid lg:grid-cols-2 items-center gap-x-12 gap-y-16">
          <div>
            <div className="max-w-3xl max-lg:mx-auto max-lg:text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="eyebrow mb-5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
                {hero.eyebrow}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-white md:text-5xl text-4xl font-bold !leading-tight"
              >
                <span className="gradient-text">{hero.headingLine1}</span>{' '}
                {hero.headingLine2}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-slate-400 text-base leading-relaxed mt-6"
              >
                {hero.subheading}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-4 max-lg:justify-center"
              >
                <a href={hero.primaryCtaLink} className="btn-primary">
                  {hero.primaryCtaText} <ArrowRight className="w-4 h-4" />
                </a>
                <a href={hero.secondaryCtaLink} className="btn-outline">
                  {hero.secondaryCtaText}
                </a>
              </motion.div>
            </div>

            {hero.stats?.length > 0 && (
              <div className="mt-12">
                <div className="grid sm:grid-cols-4 grid-cols-2 gap-3">
                  {hero.stats.map((s) => (
                    <StatCard key={s.label} label={s.label} value={s.value} suffix={s.suffix} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-accent-500/20 to-electric-500/20 rounded-3xl blur-2xl" />
            <img
              src={assetUrl(hero.heroImage)}
              alt="SoftVera Technologies - Digital Innovation"
              className="relative w-full h-[420px] md:h-[500px] object-cover rounded-2xl ring-1 ring-white/10 shadow-2xl"
            />

            <div className="absolute -top-5 -left-5 glass-panel p-4 rounded-xl shadow-xl max-w-[220px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-500/15 rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{hero.badge1Title}</p>
                  <p className="text-xs text-slate-400">{hero.badge1Subtitle}</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-5 glass-panel p-4 rounded-xl shadow-xl max-w-[220px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-electric-500/15 rounded-full flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-electric-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{hero.badge2Title}</p>
                  <p className="text-xs text-slate-400">{hero.badge2Subtitle}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
