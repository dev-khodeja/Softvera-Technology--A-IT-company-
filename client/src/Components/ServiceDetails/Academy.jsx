import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Clock, Users, Star, BookOpen,
  Youtube, Layers, Code2, Lightbulb, Target,
  ExternalLink, Zap, Award, Filter, Loader2, Video as VideoIcon
} from 'lucide-react';
import { API_URL, assetUrl } from '../../utils/api';

const SKILL_CATEGORIES = ['All', 'Video Editing', 'Web Development', 'Design', 'AI / Automation', 'Other'];

// ─── Helper Components ────────────────────────────────────────────────────────

const LevelBadge = ({ level }) => {
  const colors = {
    Beginner: 'bg-green-500/15 text-green-400',
    Intermediate: 'bg-yellow-500/15 text-yellow-400',
    Advanced: 'bg-red-500/15 text-red-400',
    'All Levels': 'bg-blue-500/15 text-blue-400',
    'Beginner to Pro': 'bg-purple-500/15 text-purple-400',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors[level] || 'bg-white/5 text-slate-300'}`}>
      {level}
    </span>
  );
};

const YoutubeButton = ({ link, label = 'YouTube এ দেখুন' }) => (
  <a
    href={link || '#'}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
  >
    <Youtube className="w-4 h-4" />
    {label}
    <ExternalLink className="w-3 h-3" />
  </a>
);

const Thumb = ({ item, className }) => (
  item.thumbnail
    ? <img src={assetUrl(item.thumbnail)} alt={item.title} className={className} />
    : (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br ${item.color || 'from-blue-500 to-indigo-600'} text-4xl`}>
        {item.icon || '📚'}
      </div>
    )
);

const EmptyState = ({ label }) => (
  <div className="text-center py-16 text-slate-500">
    <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
    <p>{label}</p>
  </div>
);

// ─── CSS Hub Tab ──────────────────────────────────────────────────────────────

const CssHubTab = ({ items, loading }) => {
  const [activeSection, setActiveSection] = useState('live');

  const sections = [
    { id: 'live', label: 'Live Class', icon: <Zap className="w-4 h-4" /> },
    { id: 'recorded', label: 'Recorded', icon: <VideoIcon className="w-4 h-4" /> },
    { id: 'project', label: 'Projects', icon: <Code2 className="w-4 h-4" /> },
    { id: 'suggestion', label: 'Suggestions', icon: <Lightbulb className="w-4 h-4" /> },
  ];

  const filtered = items.filter((i) => i.type === activeSection);

  return (
    <div>
      {/* CSS Hub Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">🎨</span>
          <div>
            <h2 className="text-2xl font-bold">CSS Hub</h2>
            <p className="text-blue-200 text-sm mt-1">CSS শেখার সম্পূর্ণ প্ল্যাটফর্ম — Live, Recorded, Projects ও Suggestions</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {[
            { icon: <Users className="w-4 h-4" />, label: '1000+ Students' },
            { icon: <Play className="w-4 h-4" />, label: '50+ Videos' },
            { icon: <Award className="w-4 h-4" />, label: 'Certificate দেওয়া হয়' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full text-sm">
              {item.icon} {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Sub Nav */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeSection === s.id
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {loading && <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-blue-500 animate-spin" /></div>}

      {!loading && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.length === 0 && <EmptyState label="এখনো কোনো content যোগ করা হয়নি।" />}

            {/* LIVE */}
            {activeSection === 'live' && filtered.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {filtered.map((cls) => (
                  <div key={cls._id} className="bg-navy-900 rounded-xl border border-white/10 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Thumb item={cls} className="w-full h-40 object-cover" />
                      {cls.isLive && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> LIVE
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-white mb-2">{cls.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-4">
                        {cls.liveDate && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{cls.liveDate}</span>}
                        {cls.students > 0 && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{cls.students} enrolled</span>}
                      </div>
                      <div className="flex items-center justify-between">
                        <LevelBadge level={cls.level} />
                        <YoutubeButton link={cls.youtubeLink} label="Join Class" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* RECORDED */}
            {activeSection === 'recorded' && filtered.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {filtered.map((course) => (
                  <div key={course._id} className="bg-navy-900 rounded-xl border border-white/10 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Thumb item={course} className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="bg-red-600 rounded-full p-3">
                          <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-white mb-2">{course.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-3">
                        {course.videos > 0 && <span className="flex items-center gap-1"><Play className="w-3.5 h-3.5" />{course.videos} videos</span>}
                        {course.duration && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>}
                        {course.students > 0 && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.students}</span>}
                      </div>
                      {course.rating > 0 && (
                        <div className="flex items-center gap-1 mb-4">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-semibold text-slate-300">{course.rating}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <LevelBadge level={course.level} />
                        <YoutubeButton link={course.youtubeLink} label="Playlist দেখুন" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PROJECTS */}
            {activeSection === 'project' && filtered.length > 0 && (
              <div className="grid md:grid-cols-3 gap-5">
                {filtered.map((project) => (
                  <div key={project._id} className="bg-navy-900 rounded-xl border border-white/10 p-5 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-white text-sm">{project.title}</h3>
                      <LevelBadge level={project.level} />
                    </div>
                    <p className="text-sm text-slate-400 mb-4">{project.description}</p>
                    {project.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                    )}
                    <YoutubeButton link={project.youtubeLink} label="Project দেখুন" />
                  </div>
                ))}
              </div>
            )}

            {/* SUGGESTIONS */}
            {activeSection === 'suggestion' && filtered.length > 0 && (
              <div className="space-y-4">
                {filtered.map((s) => (
                  <div key={s._id} className="bg-navy-900 rounded-xl border border-white/10 p-5 flex flex-wrap items-center justify-between gap-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/15 text-blue-400 rounded-full p-2.5">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{s.title}</h3>
                        {s.category && <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">{s.category}</span>}
                      </div>
                    </div>
                    <YoutubeButton link={s.youtubeLink} label="দেখুন" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

// ─── Skill Hub Tab ────────────────────────────────────────────────────────────

const SkillHubTab = ({ items, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = selectedCategory === 'All' ? items : items.filter((c) => c.category === selectedCategory);

  return (
    <div>
      {/* Skill Hub Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">⚡</span>
          <div>
            <h2 className="text-2xl font-bold">Skill Hub</h2>
            <p className="text-purple-200 text-sm mt-1">Video Editing, MERN, Design, AI — সব skill এক জায়গায়</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {[
            { icon: <BookOpen className="w-4 h-4" />, label: `${items.length}+ Courses` },
            { icon: <Youtube className="w-4 h-4" />, label: 'YouTube এ Free' },
            { icon: <Target className="w-4 h-4" />, label: 'Practical Based' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full text-sm">
              {item.icon} {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Filter className="w-4 h-4 text-slate-500 self-center" />
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-purple-500 animate-spin" /></div>}

      {!loading && filtered.length === 0 && <EmptyState label="এই category তে এখনো কোনো course নেই।" />}

      {/* Course Cards */}
      {!loading && filtered.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-navy-900 rounded-xl border border-white/10 overflow-hidden hover:shadow-xl transition-all duration-300 relative"
              >
                {course.comingSoon && (
                  <div className="absolute top-3 right-3 z-10 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full">
                    Coming Soon
                  </div>
                )}
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${course.color || 'from-blue-500 to-indigo-600'} p-6 text-white`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{course.icon || '📚'}</span>
                    <div>
                      {course.category && <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">{course.category}</span>}
                      <h3 className="font-bold text-lg mt-1">{course.title}</h3>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm text-white/80">
                    {course.videos > 0 && <span className="flex items-center gap-1"><Play className="w-3.5 h-3.5" />{course.videos} videos</span>}
                    {course.duration && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>}
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-slate-400 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {course.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-semibold text-white">{course.rating}</span>
                        </div>
                      )}
                      {course.students > 0 && (
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />{course.students}+
                        </span>
                      )}
                    </div>
                    <LevelBadge level={course.level} />
                  </div>
                  {course.comingSoon ? (
                    <button disabled className="w-full bg-white/5 text-slate-500 font-semibold py-2.5 rounded-lg text-sm cursor-not-allowed">
                      শীঘ্রই আসছে...
                    </button>
                  ) : (
                    <a
                      href={course.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full bg-gradient-to-r ${course.color || 'from-blue-500 to-indigo-600'} text-white font-semibold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
                    >
                      <Youtube className="w-4 h-4" />
                      Full Course দেখুন
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Subscribe CTA */}
      <div className="mt-10 bg-gradient-to-r from-white/5 to-blue-900 rounded-2xl p-8 text-white text-center">
        <Youtube className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">নতুন Course মিস করতে চাও না?</h3>
        <p className="text-gray-300 mb-5">YouTube Channel Subscribe করো — নতুন video গেলেই notification পাবে।</p>
        <a
          href="https://youtube.com/@softveratechnologies"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          <Youtube className="w-5 h-5" />
          Subscribe করুন
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

// ─── Main Academy Component ───────────────────────────────────────────────────

const Academy = () => {
  const [activeHub, setActiveHub] = useState('css');
  const [cssItems, setCssItems] = useState([]);
  const [skillItems, setSkillItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/academy?hub=css`).then((r) => r.json()),
      fetch(`${API_URL}/api/academy?hub=skill`).then((r) => r.json()),
    ])
      .then(([css, skill]) => {
        if (css.success) setCssItems(css.data);
        if (skill.success) setSkillItems(skill.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-navy-950 bg-grid pt-[110px]">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-gray-800 to-blue-900 text-white py-14 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-black/15 px-4 py-1.5 rounded-full text-sm mb-5 mt-5">
              <BookOpen className="w-4 h-4" />
              Softvera Academy — শিখুন, বানান, এগিয়ে যান
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Softvera <span className="text-blue-400">Academy</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              CSS থেকে MERN Stack, Video Editing থেকে AI — সব কিছু এক জায়গায়.
              YouTube এ Free, Live Class ও Recorded সব পাবে।
            </p>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { value: '2000+', label: 'Students' },
              { value: `${cssItems.length + skillItems.length}+`, label: 'Courses' },
              { value: 'Free', label: 'YouTube' },
              { value: 'Weekly', label: 'Live Class' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-blue-300">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hub Selector */}
      <div className="sticky top-[70px] z-40 bg-navy-900 border-b border-white/10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex">
            <button
              onClick={() => setActiveHub('css')}
              className={`flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all border-b-2 ${
                activeHub === 'css'
                  ? 'border-blue-600 text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-white'
              }`}
            >
              <Code2 className="w-5 h-5" />
              CSS Hub
              <span className="bg-blue-500/15 text-blue-400 text-xs px-1.5 py-0.5 rounded-full">CSS Focused</span>
            </button>
            <button
              onClick={() => setActiveHub('skill')}
              className={`flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all border-b-2 ${
                activeHub === 'skill'
                  ? 'border-purple-600 text-purple-400'
                  : 'border-transparent text-slate-500 hover:text-white'
              }`}
            >
              <Layers className="w-5 h-5" />
              Skill Hub
              <span className="bg-purple-500/15 text-purple-400 text-xs px-1.5 py-0.5 rounded-full">All Skills</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHub}
            initial={{ opacity: 0, x: activeHub === 'css' ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeHub === 'css' ? <CssHubTab items={cssItems} loading={loading} /> : <SkillHubTab items={skillItems} loading={loading} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Academy;
