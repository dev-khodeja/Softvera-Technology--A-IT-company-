import {
  Award, BarChart, BookOpen, Bot, Brain, Building, Calendar, Camera, Check,
  Clock, Cloud, Code, Coffee, Cog, Cpu, CreditCard, Database, DollarSign,
  Download, Factory, FileText, Film, Gauge, Gift, Globe, Headphones,
  HelpCircle, Home, Layers, Layout, Lock, Mail, MessageSquare, Mic, Monitor,
  Music, Network, Package, Palette, Phone, Play, PlayCircle, Radio,
  RefreshCw, Rocket, Scissors, Server, Shield, ShieldCheck, ShoppingCart,
  Smartphone, Sparkles, Star, Tag, Target, Thermometer, ThumbsUp,
  TrendingUp, User, Users, Video, Wifi, Workflow, Wrench, Zap,
} from 'lucide-react';

// Curated icon set admins can pick from when customizing a service page's
// feature/stat/why-choose-us blocks. Keys are stored as plain strings in the
// database so the schema stays framework-agnostic; only the frontend needs
// to know these map to actual components.
export const SERVICE_ICON_MAP = {
  Award, BarChart, BookOpen, Bot, Brain, Building, Calendar, Camera, Check,
  Clock, Cloud, Code, Coffee, Cog, Cpu, CreditCard, Database, DollarSign,
  Download, Factory, FileText, Film, Gauge, Gift, Globe, Headphones,
  HelpCircle, Home, Layers, Layout, Lock, Mail, MessageSquare, Mic, Monitor,
  Music, Network, Package, Palette, Phone, Play, PlayCircle, Radio,
  RefreshCw, Rocket, Scissors, Server, Shield, ShieldCheck, ShoppingCart,
  Smartphone, Sparkles, Star, Tag, Target, Thermometer, ThumbsUp,
  TrendingUp, User, Users, Video, Wifi, Workflow, Wrench, Zap,
};

export const SERVICE_ICON_NAMES = Object.keys(SERVICE_ICON_MAP).sort();

// Renders a named icon with a fallback if the name is missing/unrecognized
// (e.g. a page's own hardcoded default icon before an admin picks one).
export const ServiceIcon = ({ name, fallback: Fallback = Sparkles, className = 'w-6 h-6' }) => {
  const Icon = SERVICE_ICON_MAP[name] || Fallback;
  return <Icon className={className} />;
};
