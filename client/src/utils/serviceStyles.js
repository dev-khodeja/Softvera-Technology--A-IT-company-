import { Palette, Video, Code2, Bot, Cog, GraduationCap, Headset, Package } from 'lucide-react';

// Maps a service's `color` field (set by admin) to a Tailwind-safe (literal, non-interpolated)
// style set and a default icon, so cards stay on-theme without needing per-service CSS.
const STYLES = {
  blue:   { gradient: 'from-blue-500 to-cyan-500',    text: 'text-blue-400',   ring: 'group-hover:border-blue-400/50',   glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]',   icon: Palette },
  purple: { gradient: 'from-purple-500 to-fuchsia-500', text: 'text-purple-400', ring: 'group-hover:border-purple-400/50', glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)]', icon: Video },
  green:  { gradient: 'from-emerald-500 to-teal-500', text: 'text-emerald-400', ring: 'group-hover:border-emerald-400/50', glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]', icon: Code2 },
  indigo: { gradient: 'from-indigo-500 to-blue-500',  text: 'text-indigo-400', ring: 'group-hover:border-indigo-400/50', glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]', icon: Bot },
  orange: { gradient: 'from-orange-500 to-amber-500', text: 'text-orange-400', ring: 'group-hover:border-orange-400/50', glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)]', icon: Cog },
  red:    { gradient: 'from-rose-500 to-red-500',     text: 'text-rose-400',   ring: 'group-hover:border-rose-400/50',   glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(244,63,94,0.5)]',   icon: GraduationCap },
  teal:   { gradient: 'from-teal-500 to-cyan-500',    text: 'text-teal-400',  ring: 'group-hover:border-teal-400/50',  glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)]',  icon: Headset },
  pink:   { gradient: 'from-pink-500 to-rose-500',    text: 'text-pink-400',  ring: 'group-hover:border-pink-400/50',  glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)]',  icon: Package },
};

export const getServiceStyle = (color) => STYLES[color] || STYLES.blue;
