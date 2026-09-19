import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Eye, Users, Award, TrendingUp, Globe, Heart, Lightbulb,
  GraduationCap, Cpu, Rocket, Quote, CheckCircle, ChevronLeft, ChevronRight, Calendar
} from 'lucide-react';
import { API_URL, assetUrl } from '../../utils/api';

const TIMELINE_ICONS = { Rocket, Target, Cpu, GraduationCap, Globe, Award };

const DEFAULT_ABOUT = {
  heroTitle1: 'Softvera', heroTitle2: 'Technologies',
  heroSubtitle: '', stats: [], missionText: '', missionPoints: [],
  visionText: '', visionHighlights: [], timeline: [], growthMetrics: [],
  team: [], partners: [], chairmanName: '', chairmanRole: 'Chairman & Founder', chairmanQuote: '', chairmanPhoto: '',
};

const AboutPage = () => {
  const [about, setAbout] = useState(DEFAULT_ABOUT);
  const [currentTeamSlide, setCurrentTeamSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/about`).then((r) => r.json()).then((d) => { if (d.success) setAbout({ ...DEFAULT_ABOUT, ...d.data }); }).catch(() => {});
  }, []);

  const itemsPerSlide = 3;
  const slides = [];
  for (let i = 0; i < about.team.length; i += itemsPerSlide) slides.push(about.team.slice(i, i + itemsPerSlide));

  useEffect(() => {
    if (!autoSlide || slides.length <= 1) return;
    const t = setInterval(() => setCurrentTeamSlide((p) => (p === slides.length - 1 ? 0 : p + 1)), 4000);
    return () => clearInterval(t);
  }, [autoSlide, slides.length]);

  const nextTeamSlide = () => setCurrentTeamSlide((p) => (p === slides.length - 1 ? 0 : p + 1));
  const prevTeamSlide = () => setCurrentTeamSlide((p) => (p === 0 ? slides.length - 1 : p - 1));
  const goToTeamSlide = (i) => { setCurrentTeamSlide(i); setAutoSlide(false); setTimeout(() => setAutoSlide(true), 8000); };

  const maxProjects = Math.max(1, ...about.growthMetrics.map((m) => m.projects || 0));
  const maxClients = Math.max(1, ...about.growthMetrics.map((m) => m.clients || 0));
  const maxTeam = Math.max(1, ...about.growthMetrics.map((m) => m.team || 0));

  return (
    <div className="min-h-screen bg-navy-950 bg-grid pt-[110px]">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-20 px-4 md:px-8">
        <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              {about.heroTitle1} <span className="gradient-text">{about.heroTitle2}</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">{about.heroSubtitle}</p>
          </motion.div>

          {about.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {about.stats.map((stat, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card rounded-3xl p-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-accent-500/10 text-accent-400"><Target className="w-6 h-6" /></div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">{about.missionText}</p>
            <ul className="space-y-3">
              {about.missionPoints.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-400">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card rounded-3xl p-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-electric-500/10 text-electric-500"><Eye className="w-6 h-6" /></div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">{about.visionText}</p>
            <div className="grid grid-cols-2 gap-4">
              {about.visionHighlights.map((item, index) => (
                <div key={index} className="p-4 rounded-xl bg-white/5 text-center">
                  <div className="font-semibold text-white text-sm">{item.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      {about.timeline.length > 0 && (
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our <span className="gradient-text">Journey</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">From humble beginnings to becoming a leader in digital solutions</p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-accent-500/50 to-electric-500/50 hidden md:block" />
              <div className="space-y-8 md:space-y-12">
                {about.timeline.map((item, index) => {
                  const Icon = TIMELINE_ICONS[item.icon] || Rocket;
                  return (
                    <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                      className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="md:w-1/2 md:px-8 mb-4 md:mb-0">
                        <div className={`glass-card rounded-2xl p-5 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          <div className={`inline-flex items-center gap-3 mb-2 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="p-2 rounded-lg bg-accent-500/10 text-accent-400"><Icon className="w-5 h-5" /></div>
                            <div className="text-xl font-bold text-white">{item.year}</div>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                          <p className="text-slate-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-500 ring-4 ring-navy-950 hidden md:block" />
                      <div className="md:w-1/2" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Growth Metrics */}
      {about.growthMetrics.length > 0 && (
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Growth <span className="gradient-text">Metrics</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Tracking our progress and milestones year after year</p>
            </div>
            <div className="glass-card rounded-3xl p-6 md:p-8 mb-12 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-slate-300 font-semibold">Year</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-semibold">Projects</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-semibold">Clients</th>
                    <th className="text-left py-4 px-4 text-slate-300 font-semibold">Team Size</th>
                  </tr>
                </thead>
                <tbody>
                  {about.growthMetrics.map((row, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-4 px-4 font-semibold text-white">{row.year}</td>
                      {[['projects', maxProjects, 'bg-accent-500', 'text-accent-400'], ['clients', maxClients, 'bg-electric-500', 'text-electric-400'], ['team', maxTeam, 'bg-purple-500', 'text-purple-400']].map(([key, max, bar, text]) => (
                        <td key={key} className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-white/10 rounded-full h-1.5">
                              <div className={`${bar} h-1.5 rounded-full`} style={{ width: `${(row[key] / max) * 100}%` }} />
                            </div>
                            <span className={`font-medium text-sm shrink-0 ${text}`}>{row[key]}+</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {slides.length > 0 && (
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our <span className="gradient-text">Leadership</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">The brilliant minds driving innovation and excellence at Softvera</p>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <AnimatePresence mode="wait">
                  <motion.div key={currentTeamSlide} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {slides[currentTeamSlide]?.map((member, index) => (
                      <motion.div key={member.name + index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                        className="glass-card rounded-2xl p-6 h-full">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.color || 'from-accent-400 to-electric-600'} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                            {member.avatar}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-base font-semibold text-white truncate">{member.name}</h3>
                            <p className="text-accent-400 text-sm font-medium">{member.role}</p>
                            <p className="text-slate-500 text-xs">{member.department}</p>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Experience</span><span className="font-medium text-white">{member.experience}</span></div>
                          <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Projects</span><span className="font-medium text-white">{member.projects}+</span></div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(member.expertise || []).slice(0, 3).map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-accent-500/10 text-accent-400 text-xs rounded-full">{skill}</span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {slides.length > 1 && (
                <div className="flex items-center justify-between mt-8">
                  <button onClick={prevTeamSlide} className="p-3 rounded-full glass-panel text-slate-300 hover:text-white transition"><ChevronLeft className="w-5 h-5" /></button>
                  <div className="flex items-center gap-2">
                    {slides.map((_, index) => (
                      <button key={index} onClick={() => goToTeamSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentTeamSlide ? 'w-6 bg-accent-500' : 'w-2 bg-white/15 hover:bg-white/30'}`} />
                    ))}
                  </div>
                  <button onClick={nextTeamSlide} className="p-3 rounded-full glass-panel text-slate-300 hover:text-white transition"><ChevronRight className="w-5 h-5" /></button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Partners */}
      {about.partners.length > 0 && (
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our <span className="gradient-text">Partners</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Collaborating with industry leaders to deliver exceptional solutions</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {about.partners.map((partner, index) => (
                <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}
                  className="glass-card rounded-2xl p-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-400 to-electric-600 flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                    {partner.logo}
                  </div>
                  <h3 className="text-center font-semibold text-white text-sm">{partner.name}</h3>
                  <p className="text-center text-xs text-slate-500 mt-1">{partner.type}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Chairman's Message */}
      {about.chairmanQuote && (
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Chairman's <span className="gradient-text">Message</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Words of wisdom from our visionary leader</p>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="shrink-0 text-center">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent-400 to-electric-600 flex items-center justify-center overflow-hidden">
                    {about.chairmanPhoto
                      ? <img src={assetUrl(about.chairmanPhoto)} alt={about.chairmanName} className="w-full h-full object-cover" />
                      : <span className="text-3xl font-bold text-white">{about.chairmanName?.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>}
                  </div>
                  <div className="mt-4">
                    <div className="text-lg font-bold text-white">{about.chairmanName}</div>
                    <div className="text-accent-400 text-sm">{about.chairmanRole}</div>
                  </div>
                </div>
                <div className="flex-1">
                  <Quote className="w-10 h-10 text-accent-500/40 mb-4" />
                  <blockquote className="text-lg md:text-xl text-slate-200 leading-relaxed italic">"{about.chairmanQuote}"</blockquote>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutPage;
