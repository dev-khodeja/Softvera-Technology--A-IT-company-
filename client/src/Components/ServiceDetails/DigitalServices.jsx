import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Palette, 
  Check, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Globe, 
  Shield,
  Users,
  Zap,
  Clock,
  Star,
  Award,
  Target,
  BarChart,
  MessageSquare,
  Video,
  Smartphone,
  Cloud,
  Cpu
} from 'lucide-react';
import { useServicePackages, useServiceBanner } from '../../utils/useServiceCms';
import { ServiceIcon } from '../../utils/serviceIcons.jsx';

const PACKAGE_STYLES = [
  { color: 'from-blue-400 to-cyan-500', badge: 'Most Affordable' },
  { color: 'from-purple-500 to-pink-500', badge: 'Most Popular' },
  { color: 'from-amber-500 to-orange-600', badge: 'Premium' },
  { color: 'from-emerald-500 to-teal-600', badge: 'Ultimate' },
];

const DigitalServices = () => {
  const navigate = useNavigate();

  const DEFAULT_PACKAGES = [
    {
      id: 'starter-digital',
      name: 'Starter Digital',
      tagline: 'Perfect for startups',
      price: '৳999',
      duration: '3-5 days',
      features: [
        'Logo Design (2 concepts)',
        'Business Card Design',
        'Social Media Banner Set',
        '3 Revisions',
        'Source Files (PNG, JPG)',
        'Basic Brand Guide',
        '24-hour support'
      ],
      popular: false,
      color: 'from-blue-400 to-cyan-500',
      badge: 'Most Affordable'
    },
    {
      id: 'professional-digital',
      name: 'Professional',
      tagline: 'Best for growing businesses',
      price: '৳3,999',
      duration: '7-10 days',
      features: [
        'Complete Brand Identity',
        'Logo + Stationery Design',
        'Social Media Kit (15 posts)',
        'Website Graphics Package',
        'Digital Marketing Strategy',
        '8 Revisions',
        'Priority Support',
        'Source Files + Vector',
        'Social Media Templates'
      ],
      popular: true,
      color: 'from-purple-500 to-pink-500',
      badge: 'Most Popular'
    },
    {
      id: 'enterprise-digital',
      name: 'Enterprise Suite',
      tagline: 'For established businesses',
      price: '৳7,999',
      duration: '14-21 days',
      features: [
        'Full Branding Package',
        'Website Graphics & UI Kit',
        'Social Media Management (1 month)',
        'Marketing Materials Design',
        'Unlimited Revisions',
        '24/7 Dedicated Support',
        'Print-ready Files',
        'Brand Guidelines Book',
        'Video Intro Animation',
        'Google Analytics Setup',
        'SEO Consultation'
      ],
      popular: false,
      color: 'from-amber-500 to-orange-600',
      badge: 'Premium'
    },
    {
      id: 'ultimate-digital',
      name: 'Ultimate Digital',
      tagline: 'Complete digital transformation',
      price: '৳14,999',
      duration: '30 days',
      features: [
        'Everything in Enterprise Suite',
        '3 Months Social Media Management',
        'Email Marketing Setup',
        'PPC Campaign Design',
        'Content Creation Strategy',
        'Competitor Analysis',
        'Monthly Performance Reports',
        'Dedicated Account Manager',
        'Video Marketing Package',
        'Mobile App Graphics',
        'CRM Integration Design'
      ],
      popular: false,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Ultimate'
    }
  ];

  const { packages: cmsPackages } = useServicePackages('digital-services', DEFAULT_PACKAGES);
  const packages = cmsPackages.map((p, i) => ({ ...PACKAGE_STYLES[i % PACKAGE_STYLES.length], ...p }));
  const banner = useServiceBanner('digital-services', {
    title: 'Digital Services',
    subtitle: 'Transform your digital presence with our professional design, development, and marketing services',
  });

  const DEFAULT_SERVICES_GRID = [
    { icon: 'Globe', title: 'Website Design', description: 'Responsive websites that convert visitors into customers' },
    { icon: 'TrendingUp', title: 'Digital Marketing', description: 'Data-driven strategies to boost your online presence' },
    { icon: 'Smartphone', title: 'App UI/UX Design', description: 'Intuitive interfaces for mobile applications' },
    { icon: 'MessageSquare', title: 'Social Media Graphics', description: 'Engaging content for all social platforms' },
    { icon: 'Video', title: 'Motion Graphics', description: 'Animated videos and explainer content' },
    { icon: 'BarChart', title: 'Data Visualization', description: 'Infographics and data presentation' }
  ];
  const services = banner.servicesGrid?.length > 0 ? banner.servicesGrid : DEFAULT_SERVICES_GRID;

  const DEFAULT_STATS = [
    { value: '500+', label: 'Projects Completed' },
    { value: '99%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Available' },
    { value: '48hr', label: 'Fastest Delivery' }
  ];
  const stats = banner.stats?.length > 0 ? banner.stats : DEFAULT_STATS;

  const handleOrderClick = () => {
    navigate('/order', {
      state: {
        service: {
          id: 'digital-services',
          name: 'Digital Services',
          icon: '🖥️',
          packages: packages
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-navy-950 bg-grid pt-[110px] pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-full" />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl mb-6 transform rotate-3">
              <Palette className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {banner.title}
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              {banner.subtitle}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-navy-900/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10/50"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">
            Our Digital Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-navy-900 rounded-xl p-6 shadow-lg border border-white/10 hover:shadow-xl transition-shadow group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/15 text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                  <ServiceIcon name={service.icon} fallback={Globe} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                <p className="text-slate-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Packages Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Flexible Packages</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your Digital Package
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Select from our range of packages designed to meet your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className={`relative rounded-2xl overflow-hidden border-2 ${
                  pkg.popular ? 'border-purple-500 shadow-2xl' : 'border-white/10'
                } bg-navy-900`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-sm flex items-center gap-2 shadow-lg">
                      <Star className="w-4 h-4" />
                      {pkg.badge}
                    </div>
                  </div>
                )}

                {!pkg.popular && (
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 bg-white/5 text-slate-300 font-medium rounded-full text-xs">
                      {pkg.badge}
                    </div>
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${pkg.color}`} />

                <div className="p-6 pt-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{pkg.tagline}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-white">{pkg.price}</span>
                      <span className="text-slate-400">/project</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>{pkg.duration} delivery</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start"
                      >
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOrderClick}
                    className={`w-full py-3 font-semibold rounded-xl transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                        : 'bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:shadow-lg'
                    }`}
                  >
                    Select Package
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 text-white mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900/10 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Why Choose Us</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">
                {banner.whyChooseHeading || 'Premium Digital Solutions for Modern Businesses'}
              </h2>
              <div className="space-y-4">
                {(banner.whyChoosePoints?.length > 0 ? banner.whyChoosePoints : [
                  { icon: 'Shield', title: 'Quality Assurance', description: 'Rigorous testing and quality checks' },
                  { icon: 'Users', title: 'Expert Team', description: 'Professional designers & developers' },
                  { icon: 'Target', title: 'Results-Driven', description: 'Focus on business outcomes' },
                ]).map((point, i) => (
                  <div className="flex items-start gap-4" key={i}>
                    <ServiceIcon name={point.icon} fallback={Shield} className="w-6 h-6 text-blue-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">{point.title}</h4>
                      <p className="text-gray-300">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-navy-900/5 rounded-2xl p-6 backdrop-blur-sm">
                <Cpu className="w-8 h-8 text-blue-400 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Modern Tech Stack</h4>
                <p className="text-gray-300 text-sm">Latest tools and technologies</p>
              </div>
              <div className="bg-navy-900/5 rounded-2xl p-6 backdrop-blur-sm">
                <Cloud className="w-8 h-8 text-green-400 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Cloud Integration</h4>
                <p className="text-gray-300 text-sm">Seamless cloud solutions</p>
              </div>
              <div className="bg-navy-900/5 rounded-2xl p-6 backdrop-blur-sm">
                <Award className="w-8 h-8 text-yellow-400 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Award-Winning</h4>
                <p className="text-gray-300 text-sm">Industry recognition</p>
              </div>
              <div className="bg-navy-900/5 rounded-2xl p-6 backdrop-blur-sm">
                <MessageSquare className="w-8 h-8 text-pink-400 mb-4" />
                <h4 className="text-lg font-semibold mb-2">24/7 Support</h4>
                <p className="text-gray-300 text-sm">Always here to help</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {banner.ctaTitle || 'Ready to Transform Your Digital Presence?'}
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              {banner.ctaSubtitle || 'Join hundreds of satisfied clients who have elevated their brand with our digital services'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOrderClick}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
              >
                <ArrowRight className="w-5 h-5" />
                Start Your Project Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-navy-900 text-white font-bold rounded-xl border-2 border-white/15 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
              >
                <MessageSquare className="w-5 h-5" />
                Schedule Consultation
              </motion.button>
            </div>
            <p className="text-slate-500 text-sm mt-6">
              Need help choosing? Contact our experts for a free consultation
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DigitalServices;