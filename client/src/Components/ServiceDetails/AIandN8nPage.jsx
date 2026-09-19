import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Network,
  Check,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Users,
  ChevronRight,
  Sparkles,
  Bot,
  Workflow,
  Database,
  Server,
  Globe,
  Code,
  BarChart,
  MessageSquare,
  ShoppingCart,
  Cloud,
  Rocket,
  Target,
  TrendingUp,
  ShieldCheck,
  Infinity as InfinityIcon,
  PlayCircle,
  Wrench,
  Cog,
  RefreshCw,
  FileText
} from 'lucide-react';
import { useServicePackages, useServiceBanner } from '../../utils/useServiceCms';
import { ServiceIcon } from '../../utils/serviceIcons.jsx';

const AIandN8nPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  // eslint-disable-next-line no-unused-vars
  const [hoveredCard, setHoveredCard] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const DEFAULT_PACKAGES = [
    // AI Packages
    {
      id: 'basic-ai',
      name: 'AI Starter',
      price: '৳2,999',
      originalPrice: '৳4,999',
      description: 'Perfect for startups beginning their AI journey',
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      accentColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      duration: '7-10 days',
      features: [
        'ChatGPT API Integration',
        'Basic AI Chatbot Setup',
        '1 Custom AI Workflow',
        'Training Session (2 hours)',
        'Basic Documentation',
        '1 Month Support',
        'Email Integration'
      ],
      bestFor: ['Startups', 'Small Businesses', 'Beginner Projects'],
      popular: true,
      type: 'ai',
      badge: 'Most Popular',
      icon: <Brain className="w-6 h-6" />
    },
    {
      id: 'standard-ai',
      name: 'AI Pro',
      price: '৳7,999',
      originalPrice: '৳12,999',
      description: 'Advanced AI solutions for scaling businesses',
      color: 'from-purple-500 via-pink-500 to-rose-500',
      accentColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      duration: '15-20 days',
      features: [
        'Multiple AI Models Integration',
        'Custom AI Chatbot Development',
        '3-5 Custom Workflows',
        'Advanced Training (5 hours)',
        'API Integration',
        'Database Connection',
        '3 Months Support',
        'WhatsApp/Telegram Bot'
      ],
      bestFor: ['Growing Businesses', 'E-commerce', 'Service Providers'],
      popular: false,
      type: 'ai',
      badge: 'Recommended',
      icon: <Brain className="w-6 h-6" />
    },
    {
      id: 'enterprise-ai',
      name: 'AI Enterprise',
      price: '৳19,999',
      originalPrice: '৳29,999',
      description: 'Complete AI transformation for organizations',
      color: 'from-orange-500 via-red-500 to-amber-500',
      accentColor: 'bg-gradient-to-r from-orange-500 to-red-500',
      duration: '30-45 days',
      features: [
        'Custom AI Model Development',
        'Multi-channel AI Assistant',
        'Unlimited Workflows',
        'Complete System Integration',
        'Advanced Analytics Dashboard',
        'Dedicated Support Team',
        '6 Months Premium Support',
        '24/7 Monitoring',
        'Custom Training Program'
      ],
      bestFor: ['Large Enterprises', 'Corporations', 'Government Projects'],
      popular: false,
      type: 'ai',
      badge: 'Premium',
      icon: <Brain className="w-6 h-6" />
    },
    // n8n Packages
    {
      id: 'basic-n8n',
      name: 'n8n Basic',
      price: '৳1,999',
      originalPrice: '৳3,499',
      description: 'Simple automation for repetitive tasks',
      color: 'from-green-500 via-emerald-500 to-teal-500',
      accentColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      duration: '5-7 days',
      features: [
        '1 Process Automation',
        'Basic Workflow Design',
        'Email Automation',
        'Data Entry Automation',
        'Google Sheets Integration',
        '1 Month Maintenance',
        'Basic Training'
      ],
      bestFor: ['Freelancers', 'Small Teams', 'Basic Automation'],
      popular: true,
      type: 'n8n',
      badge: 'Best Value',
      icon: <Network className="w-6 h-6" />
    },
    {
      id: 'standard-n8n',
      name: 'n8n Advanced',
      price: '৳4,999',
      originalPrice: '৳7,999',
      description: 'Advanced automation for business processes',
      color: 'from-indigo-500 via-blue-500 to-cyan-500',
      accentColor: 'bg-gradient-to-r from-indigo-500 to-blue-500',
      duration: '10-15 days',
      features: [
        '3-5 Process Automations',
        'Custom Workflow Design',
        'Multi-platform Integration',
        'CRM/ERP Integration',
        'Database Automation',
        '3 Months Maintenance',
        'API Development',
        'Advanced Training'
      ],
      bestFor: ['Medium Businesses', 'Agencies', 'Service Companies'],
      popular: false,
      type: 'n8n',
      badge: 'Popular',
      icon: <Network className="w-6 h-6" />
    },
    {
      id: 'enterprise-n8n',
      name: 'n8n Enterprise',
      price: '৳14,999',
      originalPrice: '৳24,999',
      description: 'Complete business process automation',
      color: 'from-rose-500 via-pink-500 to-purple-500',
      accentColor: 'bg-gradient-to-r from-rose-500 to-pink-500',
      duration: '20-30 days',
      features: [
        'Complete System Automation',
        'Custom Dashboard Development',
        'Real-time Monitoring',
        'Multi-system Integration',
        'Custom API Development',
        '6 Months Maintenance',
        'Priority Support',
        'Team Training',
        'Process Optimization'
      ],
      bestFor: ['Large Organizations', 'Factories', 'Corporate Offices'],
      popular: false,
      type: 'n8n',
      badge: 'Enterprise',
      icon: <Network className="w-6 h-6" />
    },
    // Automation Packages
    {
      id: 'general-automation',
      name: 'Automation Basic',
      price: '৳1,499',
      originalPrice: '৳2,499',
      description: 'Essential automation for daily tasks',
      color: 'from-teal-500 via-cyan-500 to-blue-500',
      accentColor: 'bg-gradient-to-r from-teal-500 to-cyan-500',
      duration: '3-5 days',
      features: [
        'Data Entry Automation',
        'File Management',
        'Report Generation',
        'Social Media Posting',
        'Email Campaign Setup',
        'Basic Script Development',
        '2 Weeks Support'
      ],
      bestFor: ['Individuals', 'Small Offices', 'Daily Tasks'],
      popular: true,
      type: 'automation',
      badge: 'Quick Start',
      icon: <Bot className="w-6 h-6" />
    },
    {
      id: 'advanced-automation',
      name: 'Automation Pro',
      price: '৳3,999',
      originalPrice: '৳5,999',
      description: 'Comprehensive automation solutions',
      color: 'from-amber-500 via-orange-500 to-red-500',
      accentColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
      duration: '10-12 days',
      features: [
        'Multi-system Integration',
        'Custom Script Development',
        'Web Scraping Setup',
        'Database Automation',
        'Task Scheduler Setup',
        'Error Handling System',
        '1 Month Support',
        'Performance Optimization'
      ],
      bestFor: ['Tech Companies', 'Developers', 'Complex Tasks'],
      popular: false,
      type: 'automation',
      badge: 'Advanced',
      icon: <Bot className="w-6 h-6" />
    },
    {
      id: 'full-automation',
      name: 'Automation Enterprise',
      price: '৳8,999',
      originalPrice: '৳14,999',
      description: 'End-to-end automation ecosystem',
      color: 'from-violet-500 via-purple-500 to-fuchsia-500',
      accentColor: 'bg-gradient-to-r from-violet-500 to-purple-500',
      duration: '15-20 days',
      features: [
        'Complete Automation Setup',
        'Multiple System Integration',
        'Custom Dashboard',
        'Real-time Alerts',
        'Backup & Recovery',
        '3 Months Support',
        'Regular Updates',
        'Team Training',
        'Documentation'
      ],
      bestFor: ['Enterprises', 'Agencies', 'Complete Solutions'],
      popular: false,
      type: 'automation',
      badge: 'Complete',
      icon: <Bot className="w-6 h-6" />
    }
  ];

  // Decorative styling cycled by index onto whatever packages come back from the
  // CMS (admin can add/remove packages; core data like price/features is theirs,
  // visual flourish here keeps the page looking designed either way).
  const PACKAGE_STYLES = [
    { color: 'from-blue-500 via-cyan-500 to-teal-500', accentColor: 'bg-gradient-to-r from-blue-500 to-cyan-500', icon: <Brain className="w-6 h-6" />, type: 'ai', bestFor: ['Startups', 'Small Businesses', 'Beginner Projects'] },
    { color: 'from-purple-500 via-pink-500 to-rose-500', accentColor: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: <Brain className="w-6 h-6" />, type: 'ai', bestFor: ['Growing Businesses', 'E-commerce', 'Service Providers'] },
    { color: 'from-orange-500 via-red-500 to-amber-500', accentColor: 'bg-gradient-to-r from-orange-500 to-red-500', icon: <Brain className="w-6 h-6" />, type: 'ai', bestFor: ['Large Enterprises', 'Corporations', 'Government Projects'] },
    { color: 'from-green-500 via-emerald-500 to-teal-500', accentColor: 'bg-gradient-to-r from-green-500 to-emerald-500', icon: <Network className="w-6 h-6" />, type: 'n8n', bestFor: ['Freelancers', 'Small Teams', 'Basic Automation'] },
    { color: 'from-indigo-500 via-blue-500 to-cyan-500', accentColor: 'bg-gradient-to-r from-indigo-500 to-blue-500', icon: <Network className="w-6 h-6" />, type: 'n8n', bestFor: ['Medium Businesses', 'Agencies', 'Service Companies'] },
    { color: 'from-rose-500 via-pink-500 to-purple-500', accentColor: 'bg-gradient-to-r from-rose-500 to-pink-500', icon: <Network className="w-6 h-6" />, type: 'n8n', bestFor: ['Large Organizations', 'Factories', 'Corporate Offices'] },
    { color: 'from-teal-500 via-cyan-500 to-blue-500', accentColor: 'bg-gradient-to-r from-teal-500 to-cyan-500', icon: <Bot className="w-6 h-6" />, type: 'automation', bestFor: ['Individuals', 'Small Offices', 'Daily Tasks'] },
    { color: 'from-amber-500 via-orange-500 to-red-500', accentColor: 'bg-gradient-to-r from-amber-500 to-orange-500', icon: <Bot className="w-6 h-6" />, type: 'automation', bestFor: ['Tech Companies', 'Developers', 'Complex Tasks'] },
    { color: 'from-violet-500 via-purple-500 to-fuchsia-500', accentColor: 'bg-gradient-to-r from-violet-500 to-purple-500', icon: <Bot className="w-6 h-6" />, type: 'automation', bestFor: ['Enterprises', 'Agencies', 'Complete Solutions'] },
  ];

  const { packages: cmsPackages } = useServicePackages('ai-n8n-solutions', DEFAULT_PACKAGES);
  const packages = cmsPackages.map((p, i) => {
    const style = PACKAGE_STYLES[i % PACKAGE_STYLES.length];
    return { ...style, ...p, type: p.category || style.type, badge: p.popular ? 'Most Popular' : style.badge };
  });
  const banner = useServiceBanner('ai-n8n-solutions', {
    eyebrow: 'Complete Automation Suite',
    title: 'AI • n8n • Automation',
    highlight: 'Complete Business Transformation',
    subtitle: 'Harness the power of AI intelligence, n8n workflows, and custom automation to streamline operations and drive unprecedented growth.',
  });

  const filteredPackages = activeFilter === 'all'
    ? packages
    : packages.filter(pkg => pkg.type === activeFilter);

  const handleOrderClick = (packageId) => {
  // Find the selected package
  const selectedPackage = packages.find(pkg => pkg.id === packageId);

  if (!selectedPackage) return;

  // Create serializable data for all packages
  const serializablePackages = packages.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    price: pkg.price,
    originalPrice: pkg.originalPrice,
    description: pkg.description,
    color: pkg.color,
    accentColor: pkg.accentColor,
    duration: pkg.duration,
    features: pkg.features,
    bestFor: pkg.bestFor,
    popular: pkg.popular,
    type: pkg.type,
    badge: pkg.badge
    // icon property removed - it contains React element
  }));

  navigate('/order', {
    state: {
      service: {
        id: 'ai-solutions',
        name: 'AI, n8n & Automation Solutions',
        icon: '🤖',
        packages: serializablePackages, // Send all packages
        selectedPackage: packageId
      }
    }
  });
};
  const STAT_STYLES = [
    { icon: <Check className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' },
    { icon: <Sparkles className="w-5 h-5" />, color: 'from-purple-500 to-pink-500' },
    { icon: <Clock className="w-5 h-5" />, color: 'from-green-500 to-emerald-500' },
    { icon: <Users className="w-5 h-5" />, color: 'from-orange-500 to-red-500' },
  ];
  const DEFAULT_STATS = [
    { value: '300+', label: 'Projects Completed' },
    { value: '99%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Available' },
    { value: '100+', label: 'Happy Clients' }
  ];
  const stats = (banner.stats?.length > 0 ? banner.stats : DEFAULT_STATS)
    .map((s, i) => ({ ...s, ...STAT_STYLES[i % STAT_STYLES.length] }));

  const automationTypes = [
    {
      type: 'ai',
      title: 'AI Solutions',
      description: 'Artificial Intelligence & Machine Learning',
      icon: <Brain className="w-8 h-8" />,
      examples: ['Chatbots', 'Predictive Analytics', 'Natural Language Processing'],
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      type: 'n8n',
      title: 'n8n Workflows',
      description: 'No-Code Workflow Automation',
      icon: <Network className="w-8 h-8" />,
      examples: ['API Integrations', 'Database Automation', 'Process Flows'],
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      type: 'automation',
      title: 'General Automation',
      description: 'Traditional & Custom Automation',
      icon: <Bot className="w-8 h-8" />,
      examples: ['Data Processing', 'Task Scheduling', 'System Integration'],
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    }
  ];

  const FEATURE_STYLES = [
    { color: 'from-blue-500 to-cyan-500', delay: 0.1 },
    { color: 'from-purple-500 to-pink-500', delay: 0.2 },
    { color: 'from-green-500 to-emerald-500', delay: 0.3 },
    { color: 'from-orange-500 to-red-500', delay: 0.4 },
    { color: 'from-indigo-500 to-blue-500', delay: 0.5 },
    { color: 'from-rose-500 to-purple-500', delay: 0.6 },
  ];
  const DEFAULT_WHY_CHOOSE = [
    { icon: 'Brain', title: 'AI Intelligence', description: 'Smart automation with artificial intelligence' },
    { icon: 'Workflow', title: 'Visual Workflows', description: 'Drag-and-drop n8n workflow builder' },
    { icon: 'Cog', title: 'Custom Automation', description: 'Tailored automation scripts and systems' },
    { icon: 'ShieldCheck', title: 'Enterprise Security', description: 'Bank-level security protocols' },
    { icon: 'TrendingUp', title: 'Scalable Solutions', description: 'Grow with your business needs' },
    { icon: 'Rocket', title: 'Fast Deployment', description: 'Quick setup and implementation' }
  ];
  const features = (banner.whyChoosePoints?.length > 0 ? banner.whyChoosePoints : DEFAULT_WHY_CHOOSE).map((f, i) => ({
    ...f, ...FEATURE_STYLES[i % FEATURE_STYLES.length],
  }));

  const useCases = [
    {
      category: 'E-commerce',
      icon: <ShoppingCart className="w-6 h-6" />,
      automations: ['Order Processing', 'Inventory Sync', 'Customer Support'],
      color: 'from-blue-500/15 to-blue-500/10'
    },
    {
      category: 'Finance',
      icon: <BarChart className="w-6 h-6" />,
      automations: ['Report Generation', 'Data Analysis', 'Transaction Processing'],
      color: 'from-green-500/15 to-green-500/10'
    },
    {
      category: 'Marketing',
      icon: <MessageSquare className="w-6 h-6" />,
      automations: ['Social Media Automation', 'Email Campaigns', 'Lead Management'],
      color: 'from-purple-500/15 to-purple-500/10'
    },
    {
      category: 'Operations',
      icon: <Server className="w-6 h-6" />,
      automations: ['Data Entry', 'File Management', 'System Monitoring'],
      color: 'from-orange-500/15 to-orange-500/10'
    }
  ];

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "CEO, TechVision Ltd",
      content: "The AI automation reduced our operational costs by 40%. Game changer!",
      avatar: "SA",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Rajib Hasan",
      role: "Operations Manager, ShopEase",
      content: "n8n workflows automated our entire order processing system flawlessly.",
      avatar: "RH",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Fatima Begum",
      role: "Director, EduTech Solutions",
      content: "Their automation scripts saved us 20 hours of manual work weekly.",
      avatar: "FB",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-navy-950 bg-grid pt-[110px] pb-12 px-4">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8 md:p-12 mb-12"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-navy-900/10 backdrop-blur-sm rounded-full mb-8"
            >
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-300" />
                <Network className="w-5 h-5 text-green-300" />
                <Bot className="w-5 h-5 text-purple-300" />
              </div>
              <span className="text-white font-medium">{banner.eyebrow}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {banner.title}
              <span className="block mt-2 text-4xl md:text-5xl">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {banner.highlight}
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl"
            >
              {banner.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
                <span className="relative flex items-center gap-2">
                  Explore All Packages
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 ease-out" />
                </span>
              </button>

              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-navy-900/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-navy-900/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Book Free Consultation
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900 to-navy-900 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 ease-out"></div>
              <div className="relative bg-navy-900 rounded-2xl p-6 shadow-lg border border-white/10 hover:shadow-xl transition-all duration-300 ease-out group-hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white transition-all duration-300 group-hover:scale-110`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 group-hover:text-white transition-colors duration-300">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Automation Types Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full mb-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                Our Solutions
              </span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Three Pillars of Automation
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Choose from our comprehensive suite of automation services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {automationTypes.map((type, index) => (
              <motion.div
                key={type.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group"
              >
                <div className="relative h-full bg-navy-900 rounded-2xl p-6 shadow-lg border border-white/10 overflow-hidden transition-all duration-500 ease-out">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-navy-900 to-navy-900 rounded-full -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:translate-x-0"></div>
                  
                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${type.color} text-white mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      {type.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {type.title}
                    </h3>
                    <p className="text-slate-400 mb-4 group-hover:text-white transition-colors duration-300">
                      {type.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-white group-hover:text-white transition-colors duration-300">
                        Examples:
                      </h4>
                      {type.examples.map((example, idx) => (
                        <motion.div 
                          key={idx} 
                          className="flex items-center gap-2 group/item"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-current transition-all duration-300 group-hover/item:scale-150 group-hover/item:bg-gradient-to-r group-hover/item:from-blue-500 group-hover/item:to-purple-500"></div>
                          <span className="text-slate-300 text-sm group-hover/item:text-white transition-colors duration-300">
                            {example}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setActiveFilter(type.type)}
                      className={`w-full py-3 ${type.gradient} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group-hover:shadow-xl`}
                    >
                      View {type.title}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Our Solutions?
            </h2>
            <p className="text-slate-400 text-lg">
              Cutting-edge technology meets intuitive design
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group"
              >
                <div className="relative h-full bg-navy-900 rounded-2xl p-6 shadow-lg border border-white/10 overflow-hidden transition-all duration-500 ease-out hover:shadow-xl">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-all duration-700 ease-out`}></div>
                  
                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      <ServiceIcon name={feature.icon} fallback={Brain} className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 group-hover:text-white transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Packages Section */}
        <div className="mb-16" id="packages">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your Automation Package
            </h2>
            <p className="text-slate-400 text-lg">
              Tailored solutions for every business need
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3 mb-8 justify-center"
          >
            {['all', 'ai', 'n8n', 'automation'].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${activeFilter === filter
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl'
                    : 'bg-navy-900 text-slate-300 hover:bg-navy-900 shadow-sm border border-white/10 hover:shadow-md'
                  }`}
              >
                {filter === 'all' && 'All Solutions'}
                {filter === 'ai' && (
                  <>
                    <Brain className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                    AI Solutions
                  </>
                )}
                {filter === 'n8n' && (
                  <>
                    <Network className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    n8n Workflows
                  </>
                )}
                {filter === 'automation' && (
                  <>
                    <Bot className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-[-2px]" />
                    General Automation
                  </>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Packages Grid */}
          <AnimatePresence>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  onMouseEnter={() => setHoveredCard(pkg.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-700 ease-out group-hover:scale-105"></div>
                  
                  <div className={`relative bg-navy-900 rounded-2xl shadow-xl overflow-hidden border border-white/10 transition-all duration-500 ease-out hover:shadow-2xl ${pkg.popular ? 'ring-2 ring-blue-500 ring-opacity-50 group-hover:ring-opacity-100' : ''
                    }`}>
                    {/* Header */}
                    <div className={`relative p-6 bg-gradient-to-r ${pkg.color} text-white transition-all duration-700 ease-out group-hover:scale-105 group-hover:origin-top`}>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-navy-900/20 backdrop-blur-sm rounded-full text-sm font-medium transition-all duration-300 group-hover:bg-navy-900/30 group-hover:scale-105">
                          {pkg.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-navy-900/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                          {pkg.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold transition-all duration-300 group-hover:scale-105 group-hover:translate-x-1">
                            {pkg.name}
                          </h3>
                          <p className="text-white/90 text-sm mt-1 transition-all duration-300 group-hover:text-white">
                            {pkg.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Price */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-2 transition-all duration-300 group-hover:gap-3">
                          <span className="text-3xl font-bold text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                            {pkg.price}
                          </span>
                          <span className="text-slate-500 line-through transition-all duration-300 group-hover:text-slate-300">
                            {pkg.originalPrice}
                          </span>
                          {pkg.popular && (
                            <motion.span 
                              className="ml-auto px-2 py-1 bg-green-500/15 text-green-800 text-xs font-bold rounded transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-emerald-500 group-hover:text-white"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3
                              }}
                            >
                              POPULAR
                            </motion.span>
                          )}
                        </div>
                        <div className="flex items-center text-slate-400 text-sm transition-colors duration-300 group-hover:text-white">
                          <Clock className="w-4 h-4 mr-2 transition-all duration-300 group-hover:rotate-12" />
                          Delivery in {pkg.duration}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-white mb-4 transition-colors duration-300 group-hover:text-white">
                          What's included:
                        </h4>
                        <ul className="space-y-3">
                          {pkg.features.slice(0, 5).map((feature, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start group/feature"
                              whileHover={{ x: 5 }}
                            >
                              <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5 transition-all duration-300 group-hover/feature:scale-110 group-hover/feature:rotate-12" />
                              <span className="text-sm text-slate-300 transition-all duration-300 group-hover/feature:text-white group-hover/feature:font-medium">
                                {feature}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Best For */}
                      <div className="mb-8">
                        <h4 className="font-semibold text-white mb-3 transition-colors duration-300 group-hover:text-white">
                          Perfect for:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {pkg.bestFor.map((item, idx) => (
                            <motion.span
                              key={idx}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                              className="px-3 py-1.5 bg-white/5 text-slate-300 rounded-lg text-xs hover:bg-gray-200 transition-all duration-300 hover:shadow-md cursor-default"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2, ease: "easeOut" }
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOrderClick(pkg.id)}
                        className={`w-full py-3.5 ${pkg.accentColor} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2`}
                      >
                        Select Package
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Use Cases Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Industry Use Cases
            </h2>
            <p className="text-slate-400 text-lg">
              See how automation transforms different industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="bg-navy-900 rounded-2xl p-6 shadow-lg border border-white/10 hover:shadow-xl transition-all duration-500 ease-out group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${useCase.color} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <div className="text-white transition-all duration-300 group-hover:text-white">
                      {useCase.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                    {useCase.category}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {useCase.automations.map((automation, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex items-center gap-3 group/item"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 transition-all duration-300 group-hover/item:scale-150 group-hover/item:bg-gradient-to-r group-hover/item:from-blue-500 group-hover/item:to-purple-500"></div>
                      <span className="text-slate-300 text-sm transition-colors duration-300 group-hover/item:text-white">
                        {automation}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-slate-400 text-lg">
              Join hundreds of satisfied customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-700 ease-out group-hover:scale-105"></div>
                <div className="relative bg-navy-900 rounded-2xl p-6 shadow-lg border border-white/10 transition-all duration-500 ease-out group-hover:shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-white transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                        {testimonial.name}
                      </h4>
                      <p className="text-slate-400 text-sm transition-colors duration-300 group-hover:text-white">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300 italic transition-colors duration-300 group-hover:text-white">
                    "{testimonial.content}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          id="contact"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 md:p-12 text-center mb-8"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4 transition-all duration-300 hover:scale-105">
              {banner.ctaTitle || 'Start Your Automation Journey Today'}
            </h2>
            <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto transition-all duration-300 hover:text-white">
              {banner.ctaSubtitle || 'Transform your business operations with our comprehensive AI, n8n, and automation solutions.'}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOrderClick('basic-ai')}
                className="group px-8 py-4 bg-navy-900 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex items-center gap-3"
              >
                <Zap className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                Get Started Now
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </motion.button>
              
              <button 
                onClick={() => handleOrderClick('enterprise-ai')}
                className="group px-8 py-4 bg-navy-900/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-navy-900/20 transition-all duration-300 hover:scale-[1.02]"
              >
                Schedule Free Demo
              </button>
            </div>
            
            <p className="text-gray-300 text-sm mt-6 transition-colors duration-300 hover:text-white">
              No credit card required • Free consultation • 30-day money-back guarantee
            </p>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-8 items-center text-slate-500"
        >
          {[
            { value: '100%', label: 'Uptime Guarantee' },
            { value: '24/7', label: 'Expert Support' },
            { value: '30-Day', label: 'Money Back' },
            { value: '300+', label: 'Projects Delivered' }
          ].map((badge, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="text-center group cursor-pointer"
            >
              <div className="text-2xl font-bold text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                {badge.value}
              </div>
              <div className="text-sm transition-colors duration-300 group-hover:text-white">
                {badge.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
          animation-timing-function: ease-in-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AIandN8nPage;