import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, Users, Star, TrendingUp,
  FileText, Calendar, Shield, Clock, Headphones,
  Target, Filter, ExternalLink, Loader2
} from 'lucide-react';
import { assetUrl } from '../utils/api';

// ─── Fallback Static Data (until API is set up) ──────────────────
import dozz    from '../assets/images/dozzcafe.png';
import ttc     from '../assets/images/ttc.png';
import dropup  from '../assets/images/dropupsellerr.png';
import video   from '../assets/images/video .png';
import brand   from '../assets/images/brand.png';
import app     from '../assets/images/app.png';

const FALLBACK_PROJECTS = [
  { _id: '1', title: 'Cafe Platform for DozzCafe',    description: 'Fully responsive online cafe with custom admin panel and order system.', category: 'Web Development',  image: dozz,   tags: ['React','Node.js','MongoDB','Express'],  link: 'https://dozzcafe.netlify.app/' },
  { _id: '2', title: 'TTC College',                    description: 'Complete Training Center with modern, responsive design.',              category: 'Web Development',  image: ttc,    tags: ['React','Node.js','MongoDB','Express'],  link: 'https://ttccollege.netlify.app/' },
  { _id: '3', title: 'Dropupseller',                   description: 'Dropshipping platform with custom product management.',                  category: 'App Development',  image: dropup, tags: ['React','Node.js','MongoDB','Express'],  link: 'https://dropupseller.com/' },
  { _id: '4', title: 'Product Promo Video for Cutegig',description: 'High-energy promotional video with motion graphics.',                    category: 'Video Editing',    image: video,  tags: ['After Effects','Premiere Pro','Color'], link: 'https://www.facebook.com/share/v/14Uv5n7Vffr/' },
  { _id: '5', title: 'Brand Identity for Shoppiyo',    description: 'Complete branding package including logo, color scheme, style guide.',  category: 'Digital Service',  image: brand,  tags: ['Brand Strategy','Logo Design'],          link: 'https://www.facebook.com/shoppiyobd' },
  { _id: '6', title: 'Mobile App for BMDSSS SAVINGS',  description: 'Money management app with budgeting tools and expense tracking.',        category: 'App Development',  image: app,    tags: ['React Native','Mongoose','Maps API'],    link: 'https://bmdsss-savings.netlify.app/' },
];

const CATEGORIES = ['All', 'Web Development', 'App Development', 'Video Editing', 'Digital Service', 'AI / Automation', 'Graphic Design'];

const CATEGORY_STYLES = {
  'Web Development':  { text: 'text-blue-400',    badge: 'bg-blue-500/15 text-blue-300',     btn: 'bg-blue-600 hover:bg-blue-700' },
  'App Development':  { text: 'text-teal-400',    badge: 'bg-teal-500/15 text-teal-300',     btn: 'bg-teal-600 hover:bg-teal-700' },
  'Video Editing':    { text: 'text-orange-400',  badge: 'bg-orange-500/15 text-orange-300', btn: 'bg-orange-600 hover:bg-orange-700' },
  'Digital Service':  { text: 'text-indigo-400',  badge: 'bg-indigo-500/15 text-indigo-300', btn: 'bg-indigo-600 hover:bg-indigo-700' },
  'AI / Automation':  { text: 'text-emerald-400', badge: 'bg-emerald-500/15 text-emerald-300', btn: 'bg-emerald-600 hover:bg-emerald-700' },
  'Graphic Design':   { text: 'text-pink-400',    badge: 'bg-pink-500/15 text-pink-300',     btn: 'bg-pink-600 hover:bg-pink-700' },
  Other:              { text: 'text-slate-300',   badge: 'bg-white/10 text-slate-300',       btn: 'bg-slate-600 hover:bg-slate-700' },
};

const getStyle = (category) => CATEGORY_STYLES[category] || CATEGORY_STYLES.Other;

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const PortfolioPage = () => {
  const [projects, setProjects]               = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = selectedCategory === 'All'
          ? `${BACKEND_URL}/api/projects`
          : `${BACKEND_URL}/api/projects?category=${encodeURIComponent(selectedCategory)}`;
        const res  = await fetch(url);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setProjects(data.data);
        } else {
          const fallback = selectedCategory === 'All'
            ? FALLBACK_PROJECTS
            : FALLBACK_PROJECTS.filter((p) => p.category === selectedCategory);
          setProjects(fallback);
        }
      } catch {
        const fallback = selectedCategory === 'All'
          ? FALLBACK_PROJECTS
          : FALLBACK_PROJECTS.filter((p) => p.category === selectedCategory);
        setProjects(fallback);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchProjects();
  }, [selectedCategory]);

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-navy-950 bg-grid pt-[110px]">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-20 px-4 md:px-8">
        <div className="pointer-events-none absolute top-0 left-1/3 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Explore our latest work across Web, App, Video, AI, Design and more.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Projects Completed', value: '500+', icon: <Award className="w-6 h-6" /> },
              { label: 'Happy Clients',       value: '200+', icon: <Users className="w-6 h-6" /> },
              { label: 'Years Experience',    value: '8+',   icon: <Star className="w-6 h-6" /> },
              { label: 'Success Rate',        value: '98%',  icon: <TrendingUp className="w-6 h-6" /> },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center">
                <div className="inline-flex p-3 rounded-full bg-accent-500/10 text-accent-400 mb-4">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Why Clients <span className="gradient-text">Trust Us</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-8 h-8" />,    title: 'Quality First',      description: 'Every project passes rigorous quality checks before delivery.' },
              { icon: <Clock className="w-8 h-8" />,     title: 'On-Time Delivery',   description: 'We consistently deliver on schedule.' },
              { icon: <Headphones className="w-8 h-8" />,title: 'Dedicated Support',  description: 'Ongoing assistance even after project completion.' },
              { icon: <Target className="w-8 h-8" />,    title: 'Tailored Solutions', description: 'Custom strategies for your unique needs.' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6">
                <div className="inline-flex p-3 rounded-xl bg-accent-500/10 text-accent-400 mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <div className="py-12 px-4 md:px-8" id="portfolio">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">
              Our <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-slate-400">Category wise সব কাজ দেখুন।</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-8 justify-center">
            <Filter className="w-4 h-4 text-slate-500" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-accent-500 text-navy-950 shadow-md scale-105'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:border-accent-500/40 hover:text-accent-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-accent-500 animate-spin" />
            </div>
          )}

          {!loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 md:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {projects.length === 0 && (
                  <div className="col-span-3 text-center py-16 text-slate-500">
                    <p>এই category তে এখনো কোনো project নেই।</p>
                  </div>
                )}
                {projects.map((project) => {
                  const style = getStyle(project.category);
                  const imageSrc = project.image ? assetUrl(project.image) : dozz;
                  return (
                    <motion.div key={project._id} variants={cardVariants} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="group">
                      <div className="h-full flex flex-col glass-card rounded-xl overflow-hidden">
                        <div className="h-48 overflow-hidden">
                          <img src={imageSrc} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 w-fit ${style.badge}`}>
                            {project.category}
                          </span>
                          <h3 className={`text-lg font-bold mb-2 ${style.text}`}>{project.title}</h3>
                          <p className="text-sm text-slate-400 mb-4 flex-grow">{project.description}</p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {(project.tags || []).map((tag, i) => (
                              <span key={i} className="text-xs bg-white/5 text-slate-400 px-2 py-0.5 rounded">{tag}</span>
                            ))}
                          </div>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full text-white font-medium px-4 py-3 rounded-lg transition-colors duration-300 ${style.btn} flex items-center justify-center gap-2 mt-auto`}
                          >
                            View Project
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="rounded-3xl p-8 md:p-12 text-center bg-gradient-to-r from-electric-600 to-accent-600">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Start Your Project?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Let's discuss your idea and create something amazing together.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-navy-950 font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition">
                <FileText className="w-5 h-5" /> Get Free Consultation
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition">
                <Calendar className="w-5 h-5" /> Schedule a Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
