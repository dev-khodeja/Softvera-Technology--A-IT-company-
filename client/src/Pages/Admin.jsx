import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderOpen, BookOpen, LogOut, Plus,
  Trash2, Edit3, Save, X, Eye, EyeOff, Loader2,
  Users, Package, Mail, TrendingUp, ChevronRight,
  Code2, Layers, Youtube, Star, CheckCircle, AlertCircle,
  Image as ImageIcon, Link as LinkIcon, Tag, Grip,
  Settings, Globe, Facebook, Phone, MapPin, Upload,
  ArrowUp, ArrowDown, Linkedin, Instagram, HelpCircle, UserCog, FileText, Menu
} from 'lucide-react';
import { SERVICE_ICON_NAMES } from '../utils/serviceIcons.jsx';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { assetUrl } from '../utils/api';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ─── Auth helpers ─────────────────────────────────────────────────
const getToken = () => localStorage.getItem('sv_admin_token');
const setToken = (t) => localStorage.setItem('sv_admin_token', t);
const clearToken = () => localStorage.removeItem('sv_admin_token');
const authHeaders = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` });
const authHeadersUpload = () => ({ Authorization: `Bearer ${getToken()}` });

// ─── Toast ────────────────────────────────────────────────────────
const Toast = ({ msg, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }}
    className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl shadow-black/10 ring-1 ring-white/10 text-white text-sm font-medium backdrop-blur-sm
      ${type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}
  >
    {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
    {msg}
    <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
  </motion.div>
);

// ─── Login Screen ─────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) { setToken(data.token); onLogin(); }
      else setError(data.message || 'Login failed');
    } catch { setError('Server connection failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 text-slate-900 flex items-center justify-center px-4">
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/95 backdrop-blur rounded-3xl shadow-2xl ring-1 ring-white/10 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-cyan-500/30">
            <LayoutDashboard className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Softvera Technologies</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              placeholder="admin@softveratech.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors pr-10"
                placeholder="••••••••" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-cyan-500/25 transition flex items-center justify-center gap-2 mt-2 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-2xl border border-gray-200/70 p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
    <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
    <div className="min-w-0">
      <p className="text-2xl font-bold text-gray-900 truncate">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

// ─── Overview Tab ─────────────────────────────────────────────────
const OverviewTab = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/admin/dashboard/stats`, { headers: authHeaders() })
      .then(r => r.json()).then(d => { if (d.success) setStats(d.data); })
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Package className="w-5 h-5 text-blue-600" />}   label="Total Orders"   value={stats?.totalOrders   ?? '—'} color="bg-blue-50" />
        <StatCard icon={<Mail className="w-5 h-5 text-purple-600" />}    label="New Contacts"   value={stats?.newContacts   ?? '—'} color="bg-purple-50" />
        <StatCard icon={<Users className="w-5 h-5 text-green-600" />}    label="Customers"      value={stats?.totalCustomers ?? '—'} color="bg-green-50" />
        <StatCard icon={<TrendingUp className="w-5 h-5 text-orange-600"/>}label="Revenue"        value={stats?.totalRevenue ? `৳${stats.totalRevenue.toLocaleString()}` : '—'} color="bg-orange-50" />
      </div>
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 rounded-2xl p-6 text-white shadow-lg">
        <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-cyan-500/20 blur-3xl" />
        <h3 className="font-bold text-lg mb-2 relative">Quick Actions</h3>
        <p className="text-cyan-100/70 text-sm relative">Left sidebar থেকে Portfolio বা Academy manage করো।</p>
      </div>
    </div>
  );
};

// ─── Modal ────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children, size = 'md' }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: 'rgba(5,7,15,0.55)' }}>
    <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      className={`bg-white rounded-3xl shadow-2xl w-full ${size === 'lg' ? 'max-w-3xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto`}>
      <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-10 rounded-t-3xl">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-1 transition-colors"><X className="w-5 h-5" /></button>
      </div>
      <div className="p-5">{children}</div>
    </motion.div>
  </div>
);

// ─── Portfolio Tab ────────────────────────────────────────────────
const CATEGORIES = ['Web Development', 'App Development', 'Video Editing', 'Digital Service', 'AI / Automation', 'Graphic Design', 'Other'];

const emptyProject = { title: '', description: '', category: 'Web Development', tags: '', image: '', link: '', featured: false };

const PortfolioTab = ({ showToast }) => {
  const [projects, setProjects]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null); // null = add, obj = edit
  const [form, setForm]           = useState(emptyProject);
  const [saving, setSaving]       = useState(false);
  const [filterCat, setFilterCat] = useState('All');

  const load = (silent) => {
    if (!silent) setLoading(true);
    fetch(`${API}/api/admin/projects`, { headers: authHeaders() })
      .then(r => r.json()).then(d => { if (d.success) setProjects(d.data); })
      .catch(() => showToast('Failed to load projects', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd  = () => { setEditing(null); setForm(emptyProject); setShowModal(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({ ...p, tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.category) {
      showToast('Title, Description ও Category দরকার', 'error'); return;
    }
    setSaving(true);
    const body = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      const url    = editing ? `${API}/api/admin/projects/${editing._id}` : `${API}/api/admin/projects`;
      const method = editing ? 'PUT' : 'POST';
      const res    = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
      const data   = await res.json();
      if (data.success) { showToast(editing ? 'Project updated!' : 'Project added!', 'success'); setShowModal(false); load(true); }
      else showToast(data.message || 'Failed', 'error');
    } catch { showToast('Server error', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete করবে?')) return;
    try {
      const res  = await fetch(`${API}/api/admin/projects/${id}`, { method: 'DELETE', headers: authHeaders() });
      const data = await res.json();
      if (data.success) { showToast('Deleted!', 'success'); load(true); }
      else showToast('Failed to delete', 'error');
    } catch { showToast('Server error', 'error'); }
  };

  const filtered = filterCat === 'All' ? projects : projects.filter(p => p.category === filterCat);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Portfolio Projects</h2>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['All', ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${filterCat === cat ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm shadow-cyan-500/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      {loading && <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-cyan-600 animate-spin" /></div>}

      {!loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-16 text-gray-400">
              <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>কোনো project নেই। "Add Project" এ click করো।</p>
            </div>
          )}
          {filtered.map(p => (
            <div key={p._id} className="bg-white border border-gray-200/70 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="h-36 bg-gray-100 overflow-hidden">
                {p.image ? (
                  <img src={assetUrl(p.image)} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImageIcon className="w-10 h-10" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug">{p.title}</h3>
                  {p.featured && <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full shrink-0">Featured</span>}
                </div>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{p.category}</span>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{p.description}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(p)}
                    className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition">
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)}
                    className="flex items-center gap-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-lg transition ml-auto">
                      <Eye className="w-3.5 h-3.5" /> View
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <Modal title={editing ? 'Edit Project' : 'Add New Project'} onClose={() => setShowModal(false)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="Project title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="Short description" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Tags (comma separated)
                </label>
                <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="React, Node.js, MongoDB" />
              </div>
              <ImageUploadField
                label="Project Image"
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                showToast={showToast}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <LinkIcon className="w-3.5 h-3.5" /> Live Link
                </label>
                <input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="https://yourproject.com" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 accent-blue-600" />
                <label htmlFor="featured" className="text-sm text-gray-700">Featured project (উপরে দেখাবে)</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Academy Tab ──────────────────────────────────────────────────
const HUB_TYPES = {
  css:   ['live', 'recorded', 'project', 'suggestion'],
  skill: ['recorded'],
};
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels', 'Beginner to Pro'];
const SKILL_CATEGORIES = ['Video Editing', 'Web Development', 'Design', 'AI / Automation', 'Other'];
const COLORS = [
  'from-blue-500 to-indigo-600', 'from-purple-500 to-pink-500',
  'from-orange-500 to-red-500', 'from-green-500 to-emerald-500',
  'from-teal-500 to-cyan-500', 'from-gray-700 to-gray-900',
];

const emptyContent = {
  hub: 'css', type: 'live', title: '', description: '', youtubeLink: '',
  thumbnail: '', level: 'Beginner', category: '', videos: 0, duration: '',
  rating: 0, students: 0, tags: '', isLive: false, liveDate: '',
  comingSoon: false, icon: '📚', color: 'from-blue-500 to-indigo-600', active: true,
};

const AcademyTab = ({ showToast }) => {
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(emptyContent);
  const [saving, setSaving]       = useState(false);
  const [filterHub, setFilterHub] = useState('all');

  const load = (silent) => {
    if (!silent) setLoading(true);
    fetch(`${API}/api/admin/academy`, { headers: authHeaders() })
      .then(r => r.json()).then(d => { if (d.success) setItems(d.data); })
      .catch(() => showToast('Failed to load', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd  = () => { setEditing(null); setForm(emptyContent); setShowModal(true); };
  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...item, tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.hub || !form.type) { showToast('Title, Hub ও Type দরকার', 'error'); return; }
    setSaving(true);
    const body = { ...form, tags: form.tags?.split(',').map(t => t.trim()).filter(Boolean) || [] };
    try {
      const url    = editing ? `${API}/api/admin/academy/${editing._id}` : `${API}/api/admin/academy`;
      const method = editing ? 'PUT' : 'POST';
      const res    = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
      const data   = await res.json();
      if (data.success) { showToast(editing ? 'Updated!' : 'Added!', 'success'); setShowModal(false); load(true); }
      else showToast(data.message || 'Failed', 'error');
    } catch { showToast('Server error', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete করবে?')) return;
    try {
      const res  = await fetch(`${API}/api/admin/academy/${id}`, { method: 'DELETE', headers: authHeaders() });
      const data = await res.json();
      if (data.success) { showToast('Deleted!', 'success'); load(true); }
      else showToast('Failed', 'error');
    } catch { showToast('Server error', 'error'); }
  };

  const filtered = filterHub === 'all' ? items : items.filter(i => i.hub === filterHub);

  const typeLabel = { live: '🔴 Live', recorded: '▶ Recorded', project: '💻 Project', suggestion: '💡 Suggestion' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Academy Content</h2>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
          <Plus className="w-4 h-4" /> Add Content
        </button>
      </div>

      {/* Hub filter */}
      <div className="flex gap-2 mb-6">
        {[['all','All'],['css','CSS Hub'],['skill','Skill Hub']].map(([val,label]) => (
          <button key={val} onClick={() => setFilterHub(val)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${filterHub === val ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm shadow-cyan-500/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {label}
          </button>
        ))}
      </div>

      {loading && <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-cyan-600 animate-spin" /></div>}

      {!loading && (
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>কোনো content নেই। "Add Content" এ click করো।</p>
            </div>
          )}
          {filtered.map(item => (
            <div key={item._id} className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-4 flex items-center gap-4 hover:shadow-sm transition">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color || 'from-blue-500 to-indigo-600'} flex items-center justify-center text-lg shrink-0`}>
                {item.icon}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900 text-sm">{item.title}</span>
                  {!item.active && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>}
                  {item.comingSoon && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Coming Soon</span>}
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${item.hub === 'css' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {item.hub === 'css' ? 'CSS Hub' : 'Skill Hub'}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{typeLabel[item.type] || item.type}</span>
                  {item.level && <span className="text-xs text-gray-400">{item.level}</span>}
                  {item.youtubeLink && (
                    <a href={item.youtubeLink} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-red-500 flex items-center gap-1 hover:underline">
                      <Youtube className="w-3 h-3" /> YouTube
                    </a>
                  )}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(item)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item._id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <Modal title={editing ? 'Edit Content' : 'Add Academy Content'} onClose={() => setShowModal(false)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Hub *</label>
                  <select value={form.hub} onChange={e => setForm({ ...form, hub: e.target.value, type: HUB_TYPES[e.target.value][0] })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors">
                    <option value="css">CSS Hub</option>
                    <option value="skill">Skill Hub</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Type *</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors">
                    {HUB_TYPES[form.hub].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="Course / Content title" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="Short description" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Youtube className="w-3.5 h-3.5 text-red-500" /> YouTube Link *
                </label>
                <input value={form.youtubeLink} onChange={e => setForm({ ...form, youtubeLink: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="https://youtube.com/..." />
              </div>

              <div>
                <ImageUploadField
                  label="Custom Thumbnail (optional)"
                  value={form.thumbnail}
                  onChange={(url) => setForm({ ...form, thumbnail: url })}
                  showToast={showToast}
                />
                <p className="text-xs text-gray-400 mt-1">কাস্টম thumbnail না দিলে YouTube video থেকে thumbnail স্বয়ংক্রিয়ভাবে দেখানো হবে।</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Level</label>
                  <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors">
                    {LEVELS.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                {form.hub === 'skill' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors">
                      {SKILL_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Videos</label>
                  <input type="number" value={form.videos} onChange={e => setForm({ ...form, videos: +e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                  <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                    placeholder="8 ঘণ্টা" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Students</label>
                  <input type="number" value={form.students} onChange={e => setForm({ ...form, students: +e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
              </div>

              {form.type === 'live' && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Live Date/Time</label>
                  <input value={form.liveDate} onChange={e => setForm({ ...form, liveDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                    placeholder="প্রতি শুক্রবার রাত ৯টা" />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Icon (emoji)</label>
                <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="🎬" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Card Color</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map(c => (
                    <button key={c} onClick={() => setForm({ ...form, color: c })}
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c} border-2 transition ${form.color === c ? 'border-gray-900 scale-110' : 'border-transparent'}`} />
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={form.comingSoon} onChange={e => setForm({ ...form, comingSoon: e.target.checked })} className="accent-purple-600" />
                  Coming Soon
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={form.isLive} onChange={e => setForm({ ...form, isLive: e.target.checked })} className="accent-red-600" />
                  Live এখন চলছে
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} className="accent-green-600" />
                  Active
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Settings Tab (Header / Footer / Contact / Socials) ────────────
const emptySettings = {
  siteName: '', tagline: '', logo: '', favicon: '', ctaText: '', ctaLink: '',
  navLinks: [], footerDescription: '', footerLinks: [],
  contact: { address: '', email: '', phone: '', whatsapp: '', mapEmbedUrl: '' },
  socials: { facebook: '', youtube: '', linkedin: '', instagram: '', twitter: '', website: '' },
};

const ImageUploadField = ({ label, value, onChange, showToast }) => {
  const [uploading, setUploading] = useState(false);
  const inputId = React.useId();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API}/api/admin/upload`, { method: 'POST', headers: authHeadersUpload(), body: formData });
      const data = await res.json();
      if (data.success) { onChange(data.url); showToast('Image uploaded!', 'success'); }
      else showToast(data.message || 'Upload failed', 'error');
    } catch { showToast('Upload failed', 'error'); }
    finally { setUploading(false); e.target.value = ''; }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
          {value ? <img src={assetUrl(value)} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-gray-300" />}
        </div>
        <label htmlFor={inputId} className="flex items-center gap-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg cursor-pointer transition">
          {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
          {uploading ? 'Uploading...' : 'Upload'}
        </label>
        <input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
};

const LinkListEditor = ({ items, onChange }) => {
  const update = (i, field, val) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, { label: '', path: '', order: items.length }]);
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next.map((it, idx) => ({ ...it, order: idx })));
  };

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input value={item.label} onChange={(e) => update(i, 'label', e.target.value)} placeholder="Label"
            className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          <input value={item.path} onChange={(e) => update(i, 'path', e.target.value)} placeholder="/path"
            className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          <button onClick={() => move(i, -1)} className="p-2 text-gray-400 hover:text-gray-700"><ArrowUp className="w-4 h-4" /></button>
          <button onClick={() => move(i, 1)} className="p-2 text-gray-400 hover:text-gray-700"><ArrowDown className="w-4 h-4" /></button>
          <button onClick={() => remove(i)} className="p-2 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold mt-1">
        <Plus className="w-3.5 h-3.5" /> Add link
      </button>
    </div>
  );
};

const SettingsTab = ({ showToast, onSaved }) => {
  const [form, setForm] = useState(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/settings`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setForm({ ...emptySettings, ...d.data, contact: { ...emptySettings.contact, ...d.data.contact }, socials: { ...emptySettings.socials, ...d.data.socials } }); })
      .catch(() => showToast('Failed to load settings', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const setField = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const setContact = (field, value) => setForm((f) => ({ ...f, contact: { ...f.contact, [field]: value } }));
  const setSocial = (field, value) => setForm((f) => ({ ...f, socials: { ...f.socials, [field]: value } }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/settings`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) {
        onSaved?.();
        showToast('Settings saved!', 'success');
      }
      else showToast(data.message || 'Failed to save', 'error');
    } catch { showToast('Server error', 'error'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-cyan-600 animate-spin" /></div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Site Settings</h2>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Branding */}
        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Branding</h3>
          <div className="space-y-4">
            <ImageUploadField label="Logo" value={form.logo} onChange={(url) => setField('logo', url)} showToast={showToast} />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input value={form.siteName} onChange={(e) => setField('siteName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                <input value={form.tagline} onChange={(e) => setField('tagline', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Header CTA Text</label>
                <input value={form.ctaText} onChange={(e) => setField('ctaText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Header CTA Link</label>
                <input value={form.ctaLink} onChange={(e) => setField('ctaLink', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Header Navigation Links</h3>
          <LinkListEditor items={form.navLinks} onChange={(v) => setField('navLinks', v)} />
        </section>

        {/* Footer */}
        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Footer</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Footer Description</label>
              <textarea rows={3} value={form.footerDescription} onChange={(e) => setField('footerDescription', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Footer Quick Links</label>
              <LinkListEditor items={form.footerLinks} onChange={(v) => setField('footerLinks', v)} />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><MapPin className="w-4 h-4" /> Contact Info</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input value={form.contact.address} onChange={(e) => setContact('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email</label>
                <input value={form.contact.email} onChange={(e) => setContact('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Phone</label>
                <input value={form.contact.phone} onChange={(e) => setContact('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                <input value={form.contact.whatsapp} onChange={(e) => setContact('whatsapp', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Map Embed URL</label>
                <input value={form.contact.mapEmbedUrl} onChange={(e) => setContact('mapEmbedUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
            </div>
          </div>
        </section>

        {/* Socials */}
        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Globe className="w-4 h-4" /> Social Links</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Facebook className="w-3.5 h-3.5" /> Facebook</label>
              <input value={form.socials.facebook} onChange={(e) => setSocial('facebook', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Youtube className="w-3.5 h-3.5" /> YouTube</label>
              <input value={form.socials.youtube} onChange={(e) => setSocial('youtube', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</label>
              <input value={form.socials.linkedin} onChange={(e) => setSocial('linkedin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Instagram className="w-3.5 h-3.5" /> Instagram</label>
              <input value={form.socials.instagram} onChange={(e) => setSocial('instagram', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> Website</label>
              <input value={form.socials.website} onChange={(e) => setSocial('website', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── String List Editor (features / benefits) ──────────────────────
const StringListEditor = ({ items, onChange, placeholder = 'Item' }) => {
  const update = (i, val) => { const next = [...items]; next[i] = val; onChange(next); };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, '']);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input value={item} onChange={(e) => update(i, e.target.value)} placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          <button onClick={() => remove(i)} className="p-2 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold mt-1">
        <Plus className="w-3.5 h-3.5" /> Add {placeholder.toLowerCase()}
      </button>
    </div>
  );
};

// ─── Hero Tab ────────────────────────────────────────────────────
const emptyHero = {
  eyebrow: '', headingLine1: '', headingLine2: '', subheading: '',
  primaryCtaText: '', primaryCtaLink: '', secondaryCtaText: '', secondaryCtaLink: '',
  heroImage: '', badge1Title: '', badge1Subtitle: '', badge2Title: '', badge2Subtitle: '',
  stats: [],
};

const HeroTab = ({ showToast }) => {
  const [form, setForm] = useState(emptyHero);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/hero`).then((r) => r.json())
      .then((d) => { if (d.success) setForm({ ...emptyHero, ...d.data }); })
      .catch(() => showToast('Failed to load hero content', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const updateStat = (i, field, value) => {
    const next = [...form.stats];
    next[i] = { ...next[i], [field]: field === 'value' ? Number(value) : value };
    set('stats', next);
  };
  const removeStat = (i) => set('stats', form.stats.filter((_, idx) => idx !== i));
  const addStat = () => set('stats', [...form.stats, { label: '', value: 0, suffix: '+' }]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/hero`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) showToast('Hero content saved!', 'success');
      else showToast(data.message || 'Failed to save', 'error');
    } catch { showToast('Server error', 'error'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-cyan-600 animate-spin" /></div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Home Hero Section</h2>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Eyebrow Tag</label>
            <input value={form.eyebrow} onChange={(e) => set('eyebrow', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading Line 1 (highlighted)</label>
            <input value={form.headingLine1} onChange={(e) => set('headingLine1', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading Line 2</label>
            <input value={form.headingLine2} onChange={(e) => set('headingLine2', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
            <textarea rows={3} value={form.subheading} onChange={(e) => set('subheading', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          </div>
          <ImageUploadField label="Hero Image" value={form.heroImage} onChange={(url) => set('heroImage', url)} showToast={showToast} />
        </section>

        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5 space-y-4">
          <h3 className="font-semibold text-gray-900">Buttons</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Primary Button Text</label>
              <input value={form.primaryCtaText} onChange={(e) => set('primaryCtaText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Primary Button Link</label>
              <input value={form.primaryCtaLink} onChange={(e) => set('primaryCtaLink', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Secondary Button Text</label>
              <input value={form.secondaryCtaText} onChange={(e) => set('secondaryCtaText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Secondary Button Link</label>
              <input value={form.secondaryCtaLink} onChange={(e) => set('secondaryCtaLink', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            </div>
          </div>
        </section>

        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5 space-y-4">
          <h3 className="font-semibold text-gray-900">Floating Badges</h3>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.badge1Title} onChange={(e) => set('badge1Title', e.target.value)} placeholder="Badge 1 Title"
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            <input value={form.badge1Subtitle} onChange={(e) => set('badge1Subtitle', e.target.value)} placeholder="Badge 1 Subtitle"
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            <input value={form.badge2Title} onChange={(e) => set('badge2Title', e.target.value)} placeholder="Badge 2 Title"
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            <input value={form.badge2Subtitle} onChange={(e) => set('badge2Subtitle', e.target.value)} placeholder="Badge 2 Subtitle"
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          </div>
        </section>

        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5 space-y-3">
          <h3 className="font-semibold text-gray-900">Stats</h3>
          {form.stats.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={s.label} onChange={(e) => updateStat(i, 'label', e.target.value)} placeholder="Label"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              <input type="number" value={s.value} onChange={(e) => updateStat(i, 'value', e.target.value)} placeholder="Value"
                className="w-24 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              <input value={s.suffix} onChange={(e) => updateStat(i, 'suffix', e.target.value)} placeholder="+"
                className="w-16 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              <button onClick={() => removeStat(i)} className="p-2 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <button onClick={addStat} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold mt-1">
            <Plus className="w-3.5 h-3.5" /> Add stat
          </button>
        </section>

        <div className="flex justify-end">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Service Cards Tab ──────────────────────────────────────────────
const SERVICE_COLORS = ['blue', 'purple', 'green', 'indigo', 'orange', 'red', 'teal', 'pink'];
const emptyService = {
  title: '', slug: '', description: '', icon: '', color: 'blue', link: '',
  bannerTitle: '', bannerSubtitle: '', overview: '', features: [], order: 0, active: true,
  stats: [], servicesGrid: [], whyChooseHeading: '', whyChoosePoints: [],
  ctaTitle: '', ctaSubtitle: '',
};

const ServiceCardsTab = ({ showToast }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyService);
  const [saving, setSaving] = useState(false);

  const load = (silent) => {
    if (!silent) setLoading(true);
    fetch(`${API}/api/admin/service-cards`, { headers: authHeaders() })
      .then((r) => r.json()).then((d) => { if (d.success) setServices(d.data); })
      .catch(() => showToast('Failed to load services', 'error'))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyService); setShowModal(true); };
  const openEdit = (s) => { setEditing(s); setForm({ ...emptyService, ...s }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.title || !form.slug || !form.link) { showToast('Title, Slug ও Link দরকার', 'error'); return; }
    setSaving(true);
    try {
      const url = editing ? `${API}/api/admin/service-cards/${editing._id}` : `${API}/api/admin/service-cards`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { showToast(editing ? 'Service updated!' : 'Service added!', 'success'); setShowModal(false); load(true); }
      else showToast(data.message || 'Failed', 'error');
    } catch { showToast('Server error', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete করবে?')) return;
    try {
      const res = await fetch(`${API}/api/admin/service-cards/${id}`, { method: 'DELETE', headers: authHeaders() });
      const data = await res.json();
      if (data.success) { showToast('Deleted!', 'success'); load(true); }
      else showToast('Failed to delete', 'error');
    } catch { showToast('Server error', 'error'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Services</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {loading && <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-cyan-600 animate-spin" /></div>}

      {!loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s._id} className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{s.title}</h3>
                {!s.active && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0">Inactive</span>}
              </div>
              <p className="text-xs text-gray-500 mb-1">/{s.slug} → {s.link}</p>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">{s.description}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(s)} className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition">
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => handleDelete(s._id)} className="flex items-center gap-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <Modal title={editing ? 'Edit Service' : 'Add Service'} onClose={() => setShowModal(false)} size="lg">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Slug *</label>
                  <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Card Description</label>
                <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Page Link *</label>
                  <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="/service-page"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Accent Color</label>
                  <select value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors">
                    {SERVICE_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <ImageUploadField label="Icon (optional, overrides default icon)" value={form.icon} onChange={(url) => setForm({ ...form, icon: url })} showToast={showToast} />

              <hr className="border-gray-100" />
              <p className="text-xs font-semibold text-gray-500 uppercase">Detail Page Content</p>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Banner Title</label>
                <input value={form.bannerTitle} onChange={(e) => setForm({ ...form, bannerTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Banner Subtitle</label>
                <input value={form.bannerSubtitle} onChange={(e) => setForm({ ...form, bannerSubtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Overview</label>
                <textarea rows={3} value={form.overview} onChange={(e) => setForm({ ...form, overview: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Features</label>
                <StringListEditor items={form.features} onChange={(v) => setForm({ ...form, features: v })} placeholder="Feature" />
              </div>

              <hr className="border-gray-100" />
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Stats Bar (e.g. "500+ Projects Completed")</label>
                <ObjectListEditor items={form.stats} onChange={(v) => setForm({ ...form, stats: v })}
                  fields={[{ key: 'value', label: 'Value (e.g. 500+)' }, { key: 'label', label: 'Label (e.g. Projects Completed)' }]}
                  emptyItem={{ value: '', label: '' }} addLabel="Add stat" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Services Grid (the "Our X Services" section)</label>
                <ObjectListEditor items={form.servicesGrid} onChange={(v) => setForm({ ...form, servicesGrid: v })}
                  fields={[
                    { key: 'icon', label: 'Icon', type: 'select', options: SERVICE_ICON_NAMES },
                    { key: 'title', label: 'Title' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                  ]}
                  emptyItem={{ icon: '', title: '', description: '' }} addLabel="Add grid item" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">"Why Choose Us" Heading</label>
                <input value={form.whyChooseHeading} onChange={(e) => setForm({ ...form, whyChooseHeading: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">"Why Choose Us" Points</label>
                <ObjectListEditor items={form.whyChoosePoints} onChange={(v) => setForm({ ...form, whyChoosePoints: v })}
                  fields={[
                    { key: 'icon', label: 'Icon', type: 'select', options: SERVICE_ICON_NAMES },
                    { key: 'title', label: 'Title' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                  ]}
                  emptyItem={{ icon: '', title: '', description: '' }} addLabel="Add point" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">CTA Title</label>
                  <input value={form.ctaTitle} onChange={(e) => setForm({ ...form, ctaTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">CTA Subtitle</label>
                  <input value={form.ctaSubtitle} onChange={(e) => setForm({ ...form, ctaSubtitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
              </div>
              <hr className="border-gray-100" />

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: +e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer mt-5">
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-blue-600" />
                  Active
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── FAQ Tab ─────────────────────────────────────────────────────
const emptyFaq = { question: '', answer: '', category: '', order: 0, active: true };

const FaqTab = ({ showToast }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyFaq);
  const [saving, setSaving] = useState(false);

  const load = (silent) => {
    if (!silent) setLoading(true);
    fetch(`${API}/api/admin/faqs`, { headers: authHeaders() })
      .then((r) => r.json()).then((d) => { if (d.success) setItems(d.data); })
      .catch(() => showToast('Failed to load FAQs', 'error'))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyFaq); setShowModal(true); };
  const openEdit = (f) => { setEditing(f); setForm({ ...emptyFaq, ...f }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.question || !form.answer) { showToast('Question ও Answer দরকার', 'error'); return; }
    setSaving(true);
    try {
      const url = editing ? `${API}/api/admin/faqs/${editing._id}` : `${API}/api/admin/faqs`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { showToast(editing ? 'Updated!' : 'Added!', 'success'); setShowModal(false); load(true); }
      else showToast(data.message || 'Failed', 'error');
    } catch { showToast('Server error', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete করবে?')) return;
    try {
      const res = await fetch(`${API}/api/admin/faqs/${id}`, { method: 'DELETE', headers: authHeaders() });
      const data = await res.json();
      if (data.success) { showToast('Deleted!', 'success'); load(true); }
      else showToast('Failed', 'error');
    } catch { showToast('Server error', 'error'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">FAQs</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      {loading && <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-cyan-600 animate-spin" /></div>}

      {!loading && (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item._id} className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-4 flex items-center gap-4">
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{item.category}</span>
                  {!item.active && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>}
                </div>
                <p className="font-semibold text-gray-900 text-sm">{item.question}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <Modal title={editing ? 'Edit FAQ' : 'Add FAQ'} onClose={() => setShowModal(false)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
                <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer *</label>
                <textarea rows={4} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer mt-5">
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-blue-600" />
                  Active
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Testimonials Tab ────────────────────────────────────────────
const AVATAR_COLORS = [
  'from-blue-500 to-indigo-500', 'from-indigo-500 to-purple-500', 'from-blue-600 to-cyan-500',
  'from-blue-400 to-teal-500', 'from-blue-500 to-teal-400', 'from-rose-500 to-pink-500',
];
const emptyTestimonial = {
  name: '', role: '', company: '', content: '', rating: 5, avatar: '', avatarColor: AVATAR_COLORS[0],
  category: '', project: '', duration: '', benefits: [], order: 0, active: true,
};

const TestimonialsTab = ({ showToast }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTestimonial);
  const [saving, setSaving] = useState(false);

  const load = (silent) => {
    if (!silent) setLoading(true);
    fetch(`${API}/api/admin/testimonials`, { headers: authHeaders() })
      .then((r) => r.json()).then((d) => { if (d.success) setItems(d.data); })
      .catch(() => showToast('Failed to load testimonials', 'error'))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyTestimonial); setShowModal(true); };
  const openEdit = (t) => { setEditing(t); setForm({ ...emptyTestimonial, ...t }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name || !form.content) { showToast('Name ও Content দরকার', 'error'); return; }
    setSaving(true);
    try {
      const url = editing ? `${API}/api/admin/testimonials/${editing._id}` : `${API}/api/admin/testimonials`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { showToast(editing ? 'Updated!' : 'Added!', 'success'); setShowModal(false); load(true); }
      else showToast(data.message || 'Failed', 'error');
    } catch { showToast('Server error', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete করবে?')) return;
    try {
      const res = await fetch(`${API}/api/admin/testimonials/${id}`, { method: 'DELETE', headers: authHeaders() });
      const data = await res.json();
      if (data.success) { showToast('Deleted!', 'success'); load(true); }
      else showToast('Failed', 'error');
    } catch { showToast('Server error', 'error'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Testimonials</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {loading && <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-cyan-600 animate-spin" /></div>}

      {!loading && (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((t) => (
            <div key={t._id} className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{t.name}</p>
                  <p className="text-xs text-gray-500 truncate">{t.role} · {t.company}</p>
                </div>
                {!t.active && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0 ml-auto">Inactive</span>}
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">{t.content}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(t)} className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
                <button onClick={() => handleDelete(t._id)} className="flex items-center gap-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <Modal title={editing ? 'Edit Testimonial' : 'Add Testimonial'} onClose={() => setShowModal(false)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Avatar Initials</label>
                  <input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} maxLength={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                  <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Testimonial Content *</label>
                <textarea rows={3} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Rating (1-5)</label>
                  <input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: +e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Project</label>
                  <input value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                  <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Avatar Color</label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_COLORS.map((c) => (
                    <button key={c} onClick={() => setForm({ ...form, avatarColor: c })}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${c} border-2 transition ${form.avatarColor === c ? 'border-gray-900 scale-110' : 'border-transparent'}`} />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Key Benefits</label>
                <StringListEditor items={form.benefits} onChange={(v) => setForm({ ...form, benefits: v })} placeholder="Benefit" />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-blue-600" />
                Active
              </label>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Generic object-list editor (rows of small forms) ───────────────
// fields: [{ key, label, placeholder?, type?: 'text'|'number'|'textarea' }]
const ObjectListEditor = ({ items, onChange, fields, emptyItem, addLabel = 'Add item' }) => {
  const update = (i, key, val) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, { ...emptyItem }]);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-3">
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(fields.length, 3)}, minmax(0,1fr))` }}>
            {fields.map((f) => (
              f.type === 'textarea' ? (
                <textarea key={f.key} value={item[f.key] ?? ''} onChange={(e) => update(i, f.key, e.target.value)}
                  placeholder={f.placeholder || f.label} rows={2}
                  className="col-span-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              ) : f.type === 'select' ? (
                <select key={f.key} value={item[f.key] ?? ''} onChange={(e) => update(i, f.key, e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors">
                  <option value="">{f.placeholder || f.label}</option>
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input key={f.key} type={f.type || 'text'} value={item[f.key] ?? ''}
                  onChange={(e) => update(i, f.key, f.type === 'number' ? +e.target.value : e.target.value)}
                  placeholder={f.placeholder || f.label}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
              )
            ))}
          </div>
          <button onClick={() => remove(i)} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 mt-2">
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold">
        <Plus className="w-3.5 h-3.5" /> {addLabel}
      </button>
    </div>
  );
};

// ─── About Tab ──────────────────────────────────────────────────
const emptyAbout = {
  heroTitle1: '', heroTitle2: '', heroSubtitle: '', stats: [],
  missionText: '', missionPoints: [], visionText: '', visionHighlights: [],
  timeline: [], growthMetrics: [], team: [], partners: [],
  chairmanName: '', chairmanRole: '', chairmanQuote: '', chairmanPhoto: '',
};

const TIMELINE_ICON_OPTIONS = ['Rocket', 'Target', 'Cpu', 'GraduationCap', 'Globe', 'Award'];

const AboutTab = ({ showToast }) => {
  const [form, setForm] = useState(emptyAbout);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/about`).then((r) => r.json())
      .then((d) => { if (d.success) setForm({ ...emptyAbout, ...d.data }); })
      .catch(() => showToast('Failed to load about content', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/about`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) showToast('About page saved!', 'success');
      else showToast(data.message || 'Failed to save', 'error');
    } catch { showToast('Server error', 'error'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-cyan-600 animate-spin" /></div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">About Page</h2>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5 space-y-3">
          <h3 className="font-semibold text-gray-900">Hero</h3>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.heroTitle1} onChange={(e) => set('heroTitle1', e.target.value)} placeholder="Title part 1"
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            <input value={form.heroTitle2} onChange={(e) => set('heroTitle2', e.target.value)} placeholder="Title part 2 (highlighted)"
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          </div>
          <textarea rows={2} value={form.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)} placeholder="Subtitle"
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          <p className="text-xs font-semibold text-gray-500 uppercase pt-2">Stats</p>
          <ObjectListEditor items={form.stats} onChange={(v) => set('stats', v)}
            fields={[{ key: 'label', label: 'Label' }, { key: 'value', label: 'Value (e.g. 500+)' }]}
            emptyItem={{ label: '', value: '' }} addLabel="Add stat" />
        </section>

        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5 space-y-3">
          <h3 className="font-semibold text-gray-900">Mission</h3>
          <textarea rows={2} value={form.missionText} onChange={(e) => set('missionText', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          <StringListEditor items={form.missionPoints} onChange={(v) => set('missionPoints', v)} placeholder="Mission point" />
        </section>

        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5 space-y-3">
          <h3 className="font-semibold text-gray-900">Vision</h3>
          <textarea rows={2} value={form.visionText} onChange={(e) => set('visionText', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          <ObjectListEditor items={form.visionHighlights} onChange={(v) => set('visionHighlights', v)}
            fields={[{ key: 'label', label: 'Label' }, { key: 'value', label: 'Value' }]}
            emptyItem={{ label: '', value: '' }} addLabel="Add highlight" />
        </section>

        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5 space-y-3">
          <h3 className="font-semibold text-gray-900">Journey Timeline</h3>
          <p className="text-xs text-gray-400">Icon must be one of: {TIMELINE_ICON_OPTIONS.join(', ')}</p>
          <ObjectListEditor items={form.timeline} onChange={(v) => set('timeline', v)}
            fields={[
              { key: 'year', label: 'Year' }, { key: 'icon', label: 'Icon name' },
              { key: 'title', label: 'Title' }, { key: 'description', label: 'Description', type: 'textarea' },
            ]}
            emptyItem={{ year: '', title: '', description: '', icon: 'Rocket' }} addLabel="Add milestone" />
        </section>

        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5 space-y-3">
          <h3 className="font-semibold text-gray-900">Growth Metrics</h3>
          <ObjectListEditor items={form.growthMetrics} onChange={(v) => set('growthMetrics', v)}
            fields={[
              { key: 'year', label: 'Year' }, { key: 'projects', label: 'Projects', type: 'number' },
              { key: 'clients', label: 'Clients', type: 'number' }, { key: 'team', label: 'Team Size', type: 'number' },
            ]}
            emptyItem={{ year: '', projects: 0, clients: 0, team: 0 }} addLabel="Add row" />
        </section>

        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5 space-y-3">
          <h3 className="font-semibold text-gray-900">Team Members</h3>
          <ObjectListEditor items={form.team} onChange={(v) => set('team', v)}
            fields={[
              { key: 'name', label: 'Name' }, { key: 'avatar', label: 'Initials' },
              { key: 'role', label: 'Role' }, { key: 'department', label: 'Department' },
              { key: 'experience', label: 'Experience' }, { key: 'projects', label: 'Projects', type: 'number' },
              { key: 'color', label: 'Gradient (e.g. from-blue-500 to-indigo-600)' },
              { key: 'bio', label: 'Bio', type: 'textarea' },
            ]}
            emptyItem={{ name: '', role: '', department: '', experience: '', expertise: [], avatar: '', color: 'from-blue-500 to-indigo-600', bio: '', projects: 0 }}
            addLabel="Add team member" />
        </section>

        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5 space-y-3">
          <h3 className="font-semibold text-gray-900">Partners</h3>
          <ObjectListEditor items={form.partners} onChange={(v) => set('partners', v)}
            fields={[{ key: 'name', label: 'Name' }, { key: 'logo', label: 'Initials' }, { key: 'type', label: 'Partnership Type' }]}
            emptyItem={{ name: '', logo: '', type: '' }} addLabel="Add partner" />
        </section>

        <section className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5 space-y-3">
          <h3 className="font-semibold text-gray-900">Chairman's Message</h3>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.chairmanName} onChange={(e) => set('chairmanName', e.target.value)} placeholder="Name"
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
            <input value={form.chairmanRole} onChange={(e) => set('chairmanRole', e.target.value)} placeholder="Role"
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          </div>
          <textarea rows={3} value={form.chairmanQuote} onChange={(e) => set('chairmanQuote', e.target.value)} placeholder="Quote"
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          <ImageUploadField label="Photo (optional)" value={form.chairmanPhoto} onChange={(url) => set('chairmanPhoto', url)} showToast={showToast} />
        </section>

        <div className="flex justify-end">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Packages Tab (pricing tiers per service) ───────────────────────
const emptyPackage = { serviceSlug: '', name: '', price: '', duration: '', features: [], popular: false, category: '', order: 0 };

const PackagesTab = ({ showToast }) => {
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyPackage);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/admin/service-cards`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((d) => { if (d.success) { setServices(d.data); if (d.data[0]) setSelectedSlug(d.data[0].slug); } })
      .catch(() => showToast('Failed to load services', 'error'));
  }, []);

  const load = (slug, silent) => {
    if (!slug) return;
    if (!silent) setLoading(true);
    fetch(`${API}/api/admin/service-packages?slug=${encodeURIComponent(slug)}`, { headers: authHeaders() })
      .then((r) => r.json()).then((d) => { if (d.success) setPackages(d.data); })
      .catch(() => showToast('Failed to load packages', 'error'))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(selectedSlug); }, [selectedSlug]);

  const openAdd = () => { setEditing(null); setForm({ ...emptyPackage, serviceSlug: selectedSlug }); setShowModal(true); };
  const openEdit = (p) => { setEditing(p); setForm({ ...emptyPackage, ...p }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name || !form.price) { showToast('Name ও Price দরকার', 'error'); return; }
    setSaving(true);
    try {
      const url = editing ? `${API}/api/admin/service-packages/${editing._id}` : `${API}/api/admin/service-packages`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { showToast(editing ? 'Updated!' : 'Added!', 'success'); setShowModal(false); load(selectedSlug, true); }
      else showToast(data.message || 'Failed', 'error');
    } catch { showToast('Server error', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete করবে?')) return;
    try {
      const res = await fetch(`${API}/api/admin/service-packages/${id}`, { method: 'DELETE', headers: authHeaders() });
      const data = await res.json();
      if (data.success) { showToast('Deleted!', 'success'); load(selectedSlug, true); }
      else showToast('Failed', 'error');
    } catch { showToast('Server error', 'error'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Pricing Packages</h2>
          <p className="text-xs text-gray-400 mt-1">Manage pricing tiers per service (referenced by slug)</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={selectedSlug} onChange={(e) => setSelectedSlug(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors">
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </select>
          <button onClick={openAdd} disabled={!selectedSlug}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0">
            <Plus className="w-4 h-4" /> Add Package
          </button>
        </div>
      </div>

      {loading && <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-cyan-600 animate-spin" /></div>}

      {!loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>এই সার্ভিসের জন্য কোনো package নেই।</p>
            </div>
          )}
          {packages.map((p) => (
            <div key={p._id} className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">{p.name}</h3>
                <div className="flex gap-1 shrink-0">
                  {p.category && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{p.category}</span>}
                  {p.popular && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Popular</span>}
                </div>
              </div>
              <p className="text-lg font-bold text-blue-600">{p.price} <span className="text-xs text-gray-400 font-normal">{p.duration}</span></p>
              <ul className="text-xs text-gray-500 mt-2 space-y-1 list-disc list-inside">
                {(p.features || []).slice(0, 4).map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <div className="flex gap-2 mt-3">
                <button onClick={() => openEdit(p)} className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
                <button onClick={() => handleDelete(p._id)} className="flex items-center gap-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <Modal title={editing ? 'Edit Package' : 'Add Package'} onClose={() => setShowModal(false)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Price *</label>
                  <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="৳999 or Custom"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                  <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="2 weeks"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category (optional)</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. ai, n8n, automation"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Features</label>
                <StringListEditor items={form.features} onChange={(v) => setForm({ ...form, features: v })} placeholder="Feature" />
              </div>
              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: +e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer mt-5">
                  <input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} className="accent-blue-600" />
                  Mark as Popular
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Orders Tab ──────────────────────────────────────────────────
const ORDER_STATUSES = ['new', 'contacted', 'in_progress', 'completed', 'cancelled'];
const ORDER_STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const OrdersTab = ({ showToast }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const load = (silent) => {
    if (!silent) setLoading(true);
    fetch(`${API}/api/admin/orders`, { headers: authHeaders() })
      .then((r) => r.json()).then((d) => { if (d.success) setOrders(d.data); })
      .catch(() => showToast('Failed to load orders', 'error'))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API}/api/admin/orders/${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ status }) });
      const data = await res.json();
      if (data.success) { showToast('Status updated!', 'success'); load(true); }
      else showToast(data.message || 'Failed', 'error');
    } catch { showToast('Server error', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete করবে?')) return;
    try {
      const res = await fetch(`${API}/api/admin/orders/${id}`, { method: 'DELETE', headers: authHeaders() });
      const data = await res.json();
      if (data.success) { showToast('Deleted!', 'success'); load(true); }
      else showToast('Failed', 'error');
    } catch { showToast('Server error', 'error'); }
  };

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return o.customer?.name?.toLowerCase().includes(q) || o.customer?.email?.toLowerCase().includes(q) || o.orderNumber?.toLowerCase().includes(q);
    }
    return true;
  });

  const totalRevenue = orders.filter((o) => o.status === 'completed').reduce((s, o) => s + (o.totalAmount || 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Orders</h2>
          <p className="text-xs text-gray-400 mt-1">{orders.length} total &middot; ৳{totalRevenue.toLocaleString()} revenue from completed orders</p>
        </div>
        <div className="flex items-center gap-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name/email/order#"
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors w-56" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors">
            <option value="all">All statuses</option>
            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {loading && <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-cyan-600 animate-spin" /></div>}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>কোনো order নেই।</p>
        </div>
      )}

      {!loading && (
        <div className="space-y-3">
          {filtered.map((o) => (
            <div key={o._id} className="bg-white border border-gray-200/70 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 flex items-center gap-4 flex-wrap">
                <div className="flex-grow min-w-[200px]">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono text-xs text-gray-400">{o.orderNumber}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${ORDER_STATUS_COLORS[o.status] || 'bg-gray-100 text-gray-600'}`}>{o.status}</span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{o.customer?.name} · {o.package?.name}</p>
                  <p className="text-xs text-gray-500">{o.customer?.email} · {o.customer?.phone}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-gray-900">৳{(o.totalAmount || 0).toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{new Date(o.createdAt).toLocaleDateString()}</p>
                </div>
                <select value={o.status} onChange={(e) => updateStatus(o._id, e.target.value)}
                  className="px-2 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors shrink-0">
                  {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => setExpanded(expanded === o._id ? null : o._id)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition shrink-0">
                  <ChevronRight className={`w-4 h-4 transition-transform ${expanded === o._id ? 'rotate-90' : ''}`} />
                </button>
                <button onClick={() => handleDelete(o._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition shrink-0"><Trash2 className="w-4 h-4" /></button>
              </div>
              <AnimatePresence>
                {expanded === o._id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50 text-sm space-y-2">
                      {o.customer?.company && <p><strong>Company:</strong> {o.customer.company}</p>}
                      <p><strong>Service:</strong> {o.serviceName} ({o.serviceType})</p>
                      <p><strong>Package price:</strong> {o.package?.price}</p>
                      {o.package?.features?.length > 0 && <p><strong>Package features:</strong> {o.package.features.join(', ')}</p>}
                      <p><strong>Project description:</strong> {o.projectDetails?.description}</p>
                      {o.projectDetails?.deadline && <p><strong>Deadline:</strong> {new Date(o.projectDetails.deadline).toLocaleDateString()}</p>}
                      {o.projectDetails?.specialRequirements && <p><strong>Special requirements:</strong> {o.projectDetails.specialRequirements}</p>}
                      <p className="text-xs text-gray-400">Source: {o.source}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Contacts Tab ────────────────────────────────────────────────
const CONTACT_STATUSES = ['new', 'read', 'replied', 'archived'];
const CONTACT_STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-gray-100 text-gray-600',
  replied: 'bg-green-100 text-green-700',
  archived: 'bg-gray-200 text-gray-500',
};

const ContactsTab = ({ showToast }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const load = (silent) => {
    if (!silent) setLoading(true);
    const url = statusFilter === 'all' ? `${API}/api/admin/contacts` : `${API}/api/admin/contacts?status=${statusFilter}`;
    fetch(url, { headers: authHeaders() })
      .then((r) => r.json()).then((d) => { if (d.success) setContacts(d.data || d.contacts || []); })
      .catch(() => showToast('Failed to load contacts', 'error'))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [statusFilter]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API}/api/admin/contacts/${id}/status`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ status }) });
      const data = await res.json();
      if (data.success) { showToast('Status updated!', 'success'); load(true); }
      else showToast(data.message || 'Failed', 'error');
    } catch { showToast('Server error', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete করবে?')) return;
    try {
      const res = await fetch(`${API}/api/admin/contacts/${id}`, { method: 'DELETE', headers: authHeaders() });
      const data = await res.json();
      if (data.success) { showToast('Deleted!', 'success'); load(true); }
      else showToast('Failed', 'error');
    } catch { showToast('Server error', 'error'); }
  };

  const handleExportCsv = async () => {
    try {
      const res = await fetch(`${API}/api/admin/contacts/export/csv`, { headers: authHeaders() });
      if (!res.ok) { showToast('Export failed', 'error'); return; }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `contacts-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch { showToast('Export failed', 'error'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Contact Messages</h2>
          <p className="text-xs text-gray-400 mt-1">{contacts.length} messages</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors">
            <option value="all">All statuses</option>
            {CONTACT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={handleExportCsv}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-semibold transition">
            <FileText className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {loading && <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-cyan-600 animate-spin" /></div>}

      {!loading && contacts.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Mail className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>কোনো message নেই।</p>
        </div>
      )}

      {!loading && (
        <div className="space-y-3">
          {contacts.map((c) => (
            <div key={c._id} className="bg-white border border-gray-200/70 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 flex items-center gap-4 flex-wrap">
                <div className="flex-grow min-w-[200px]">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-gray-900 text-sm">{c.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${CONTACT_STATUS_COLORS[c.status] || 'bg-gray-100 text-gray-600'}`}>{c.status}</span>
                    {c.service && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{c.service}</span>}
                  </div>
                  <p className="text-xs text-gray-500">{c.email} · {c.phone}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{c.message}</p>
                </div>
                <p className="text-xs text-gray-400 shrink-0">{new Date(c.createdAt).toLocaleDateString()}</p>
                <select value={c.status} onChange={(e) => updateStatus(c._id, e.target.value)}
                  className="px-2 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors shrink-0">
                  {CONTACT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => setExpanded(expanded === c._id ? null : c._id)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition shrink-0">
                  <ChevronRight className={`w-4 h-4 transition-transform ${expanded === c._id ? 'rotate-90' : ''}`} />
                </button>
                <button onClick={() => handleDelete(c._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition shrink-0"><Trash2 className="w-4 h-4" /></button>
              </div>
              <AnimatePresence>
                {expanded === c._id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50 text-sm space-y-2">
                      {c.company && <p><strong>Company:</strong> {c.company}</p>}
                      {c.budget && <p><strong>Budget:</strong> {c.budget}</p>}
                      <p><strong>Message:</strong> {c.message}</p>
                      <a href={`mailto:${c.email}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                        <Mail className="w-3.5 h-3.5" /> Reply via email
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Account Tab (change own login email/password) ──────────────────
const AccountTab = ({ showToast }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!currentPassword) { showToast('বর্তমান পাসওয়ার্ড দিতে হবে', 'error'); return; }
    if (!newEmail && !newPassword) { showToast('নতুন ইমেইল বা পাসওয়ার্ড কিছু একটা দিন', 'error'); return; }
    if (newPassword && newPassword !== confirmPassword) { showToast('New password মিলছে না', 'error'); return; }
    if (newPassword && newPassword.length < 8) { showToast('Password কমপক্ষে ৮ অক্ষরের হতে হবে', 'error'); return; }

    setSaving(true);
    try {
      const body = { currentPassword };
      if (newEmail) body.newEmail = newEmail;
      if (newPassword) body.newPassword = newPassword;
      const res = await fetch(`${API}/api/admin/account`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(body) });
      const data = await res.json();
      if (data.success) {
        showToast('Account updated! নতুন credentials দিয়ে পরের বার login করবেন।', 'success');
        setCurrentPassword(''); setNewEmail(''); setNewPassword(''); setConfirmPassword('');
      } else {
        showToast(data.message || 'Failed to update', 'error');
      }
    } catch { showToast('Server error', 'error'); }
    finally { setSaving(false); }
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Account Settings</h2>
      <p className="text-sm text-gray-400 mb-6">নিজের admin login email/password পরিবর্তন করুন।</p>

      <div className="bg-white border border-gray-200/70 rounded-2xl shadow-sm p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password *</label>
          <div className="relative">
            <input type={showCurrent ? 'text' : 'password'} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors pr-10"
              placeholder="Required to confirm any change" />
            <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Email (optional)</label>
          <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
            placeholder="Leave blank to keep current email" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password (optional)</label>
          <div className="relative">
            <input type={showNew ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors pr-10"
              placeholder="Leave blank to keep current password" />
            <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {newPassword && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input type={showNew ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" />
          </div>
        )}

        <button onClick={handleSave} disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md shadow-cyan-500/20 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Update Account'}
        </button>
      </div>
    </div>
  );
};

// ─── Main Admin Component ─────────────────────────────────────────
const TABS = [
  { id: 'overview',     label: 'Overview',     icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'orders',       label: 'Orders',       icon: <Package className="w-4 h-4" /> },
  { id: 'contacts',     label: 'Contacts',     icon: <Mail className="w-4 h-4" /> },
  { id: 'settings',     label: 'Site Settings', icon: <Settings className="w-4 h-4" /> },
  { id: 'about',        label: 'About Page',   icon: <Users className="w-4 h-4" /> },
  { id: 'hero',         label: 'Hero Section', icon: <Layers className="w-4 h-4" /> },
  { id: 'services',     label: 'Services',     icon: <Code2 className="w-4 h-4" /> },
  { id: 'packages',     label: 'Packages',     icon: <Package className="w-4 h-4" /> },
  { id: 'faqs',         label: 'FAQs',         icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'testimonials', label: 'Testimonials', icon: <Star className="w-4 h-4" /> },
  { id: 'portfolio',    label: 'Portfolio',    icon: <FolderOpen className="w-4 h-4" /> },
  { id: 'academy',      label: 'Academy',      icon: <BookOpen className="w-4 h-4" /> },
  { id: 'account',      label: 'Account',      icon: <UserCog className="w-4 h-4" /> },
];

const Admin = () => {
  const { refresh: refreshSiteSettings } = useSiteSettings();
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [activeTab, setActiveTab] = useState('overview');
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogout = () => { clearToken(); setLoggedIn(false); };
  const handleTabClick = (id) => { setActiveTab(id); setMobileMenuOpen(false); };
  const activeTabLabel = TABS.find((t) => t.id === activeTab)?.label || 'Admin Panel';

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 flex mt-[76px]">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-[76px] left-0 right-0 z-40 bg-gradient-to-r from-gray-900 to-blue-950 text-white flex items-center justify-between px-4 h-14 border-b border-white/10 shadow-md">
        <span className="font-bold text-sm truncate">{activeTabLabel}</span>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 -mr-2 text-gray-300 hover:text-white" aria-label="Open admin menu">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[76px] z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static top-[76px] md:top-auto bottom-0 md:bottom-auto left-0 h-[calc(100vh-76px)] md:h-auto z-50 md:z-auto flex flex-col shrink-0 bg-gradient-to-b from-gray-900 to-blue-950 transition-transform md:transition-[width] duration-300 w-64 ${sidebarOpen ? 'md:w-56' : 'md:w-16'} ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/20">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && <span className="text-white font-bold text-sm truncate">Admin Panel</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:block text-gray-400 hover:text-white ml-auto">
            <ChevronRight className={`w-4 h-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-gray-400 hover:text-white ml-auto" aria-label="Close admin menu">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-grow p-3 space-y-1 overflow-y-auto">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => handleTabClick(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border-l-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-transparent text-white border-cyan-400'
                  : 'text-gray-400 border-transparent hover:bg-white/5 hover:text-white'
              }`}>
              {tab.icon}
              <span className={sidebarOpen ? '' : 'md:hidden'}>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10 shrink-0">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition">
            <LogOut className="w-4 h-4" />
            <span className={sidebarOpen ? '' : 'md:hidden'}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-grow min-w-0 p-6 pt-20 md:p-8 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {activeTab === 'overview'     && <OverviewTab />}
            {activeTab === 'orders'       && <OrdersTab showToast={showToast} />}
            {activeTab === 'contacts'     && <ContactsTab showToast={showToast} />}
            {activeTab === 'settings'     && <SettingsTab showToast={showToast} onSaved={refreshSiteSettings} />}
            {activeTab === 'about'        && <AboutTab showToast={showToast} />}
            {activeTab === 'hero'         && <HeroTab showToast={showToast} />}
            {activeTab === 'services'     && <ServiceCardsTab showToast={showToast} />}
            {activeTab === 'packages'     && <PackagesTab showToast={showToast} />}
            {activeTab === 'faqs'         && <FaqTab showToast={showToast} />}
            {activeTab === 'testimonials' && <TestimonialsTab showToast={showToast} />}
            {activeTab === 'portfolio'    && <PortfolioTab showToast={showToast} />}
            {activeTab === 'academy'      && <AcademyTab showToast={showToast} />}
            {activeTab === 'account'      && <AccountTab showToast={showToast} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
