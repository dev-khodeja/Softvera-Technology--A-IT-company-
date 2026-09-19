import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Play,
  Film,
  Video,
  Scissors,
  Music,
  Sparkles,
  Check,
  Clock,
  Download,
  Globe,
  Users,
  Award,
  Zap,
  Shield,
  HelpCircle,
  TrendingUp,
  Star,
  Target,
  Camera,
  Mic,
  Film as FilmIcon,
  Palette,
  Layers,
  Cpu,
  Server,
  Gift,
  Calendar,
  Clock as ClockIcon,
  Smartphone,
  Monitor,
  Cloud,
  BarChart,
  RefreshCw,
  Headphones,
  FileText,
  ArrowRight,
  Building
} from 'lucide-react';
import { Link } from 'react-router-dom'; // Correct import for Link
import { useServicePackages, useServiceBanner } from '../../utils/useServiceCms';

const VideoDetails = () => {
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [faqOpen, setFaqOpen] = useState(null);

  // Video Editing Packages
  const DEFAULT_PACKAGES = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: '৳599',
      originalPrice: '৳999',
      description: 'Perfect for beginners and social media content',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Up to 2 minutes video',
        'Basic color correction',
        'Simple transitions',
        'Background music',
        '720p HD Quality',
        '1 Revision',
        '2-day delivery'
      ],
      popular: true
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: '৳1,299',
      originalPrice: '৳1,999',
      description: 'Ideal for small businesses and content creators',
      color: 'from-purple-500 to-pink-500',
      features: [
        'Up to 5 minutes video',
        'Advanced color grading',
        'Professional transitions',
        'Sound effects & music',
        '1080p Full HD Quality',
        '2 Revisions',
        '3-day delivery',
        'Motion graphics intro',
        'Social media optimization'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: '৳2,499',
      originalPrice: '৳3,499',
      description: 'Perfect for corporate and professional content',
      color: 'from-orange-500 to-red-500',
      features: [
        'Up to 10 minutes video',
        'Cinematic color grading',
        'Complex transitions & effects',
        'Custom sound design',
        '4K Ultra HD Quality',
        'Unlimited revisions',
        '5-day delivery',
        'Custom animations',
        'Voice over recording',
        'Multi-platform optimization'
      ],
      popular: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise Package',
      price: '৳4,999',
      originalPrice: '৳6,999',
      description: 'For large businesses and high-end productions',
      color: 'from-green-500 to-emerald-500',
      features: [
        'Unlimited video length',
        'Hollywood-grade color grading',
        'Advanced VFX & animations',
        'Professional voice artists',
        '8K Resolution Available',
        'Priority support',
        '7-day delivery',
        'Storyboard creation',
        'Dedicated project manager',
        'Multiple format delivery'
      ],
      popular: false
    }
  ];

  const PACKAGE_STYLES = [
    { color: 'from-blue-500 to-cyan-500' },
    { color: 'from-purple-500 to-pink-500' },
    { color: 'from-orange-500 to-red-500' },
    { color: 'from-green-500 to-emerald-500' },
  ];
  const { packages: cmsPackages } = useServicePackages('video-editing', DEFAULT_PACKAGES);
  const packages = cmsPackages.map((p, i) => ({ ...PACKAGE_STYLES[i % PACKAGE_STYLES.length], ...p }));

  // Keep the selection valid if CMS packages replace the fallback list (different ids)
  useEffect(() => {
    if (packages.length > 0 && !packages.some((p) => p.id === selectedPackage)) {
      setSelectedPackage(packages[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packages]);

  const banner = useServiceBanner('video-editing', {
    title: 'Transform Your Videos Into Masterpieces',
    subtitle: 'Professional video editing services starting from just ৳599. From social media clips to corporate films, we bring your vision to life.',
  });

  // Video Types We Edit
  const videoTypes = [
    {
      title: 'Social Media Videos',
      icon: '📱',
      description: 'Short-form content for TikTok, Instagram, YouTube Shorts',
      color: 'bg-pink-500/15 text-pink-700'
    },
    {
      title: 'YouTube Videos',
      icon: '▶️',
      description: 'Full-length videos, vlogs, tutorials, documentaries',
      color: 'bg-red-500/15 text-red-700'
    },
    {
      title: 'Corporate Videos',
      icon: '🏢',
      description: 'Promotional videos, company profiles, training videos',
      color: 'bg-blue-500/15 text-blue-700'
    },
    {
      title: 'Commercial Ads',
      icon: '📈',
      description: 'TV commercials, online ads, product promotions',
      color: 'bg-green-500/15 text-green-700'
    },
    {
      title: 'Event Videos',
      icon: '📅',
      description: 'Weddings, conferences, concerts, parties',
      color: 'bg-purple-500/15 text-purple-700'
    },
    {
      title: 'Animation Videos',
      icon: '🎞️',
      description: '2D/3D animations, explainer videos, motion graphics',
      color: 'bg-yellow-500/15 text-yellow-700'
    }
  ];

  // Our Process
  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Discuss your vision, goals, and requirements',
      icon: '🎧'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Create storyboard and script',
      icon: '📄'
    },
    {
      step: '03',
      title: 'Editing',
      description: 'Professional editing with latest tools',
      icon: '✂️'
    },
    {
      step: '04',
      title: 'Review',
      description: 'Share draft for your feedback',
      icon: '🔄'
    },
    {
      step: '05',
      title: 'Delivery',
      description: 'Final delivery in required formats',
      icon: '📥'
    }
  ];

  // Additional Services (Addons)
  const addons = [
    {
      id: 'voiceover',
      name: 'Professional Voiceover',
      price: '৳199',
      description: 'Native speaker voice recording',
      icon: '🎤'
    },
    {
      id: 'subtitles',
      name: 'Subtitles/Captions',
      price: '৳199',
      description: 'Multi-language subtitle addition',
      icon: '📝'
    },
    {
      id: 'color',
      name: 'Premium Color Grading',
      price: '৳299',
      description: 'Cinematic color correction',
      icon: '🎨'
    },
    {
      id: 'vfx',
      name: 'Special VFX',
      price: '৳499',
      description: 'Visual effects and animations',
      icon: '✨'
    },
    {
      id: 'urgency',
      name: 'Express Delivery',
      price: '৳599',
      description: '50% faster delivery time',
      icon: '⚡'
    },
    {
      id: 'storage',
      name: 'Cloud Storage',
      price: '৳199',
      description: '1-year cloud storage',
      icon: '☁️'
    }
  ];

  // FAQ Data
  const faqs = [
    {
      question: 'How long does video editing take?',
      answer: 'Delivery time depends on the package selected. Basic: 2 days, Standard: 3 days, Premium: 5 days, Enterprise: 7 days. Express delivery addon reduces time by 50%.'
    },
    {
      question: 'What video formats do you accept?',
      answer: 'We accept all major formats: MP4, MOV, AVI, WMV, and more. We can work with raw footage from DSLRs, smartphones, and professional cameras.'
    },
    {
      question: 'Can I request revisions?',
      answer: 'Yes! Each package includes revisions: Basic (1), Standard (2), Premium (unlimited), Enterprise (unlimited). We work until you are 100% satisfied.'
    },
    {
      question: 'Do you provide source files?',
      answer: 'Yes, we provide all source files including project files upon request. This allows you to make future edits if needed.'
    },
    {
      question: 'What software do you use for editing?',
      answer: 'We use professional software: Adobe Premiere Pro, After Effects, DaVinci Resolve, Final Cut Pro, and Cinema 4D for animations.'
    },
    {
      question: 'How do I send you my videos?',
      answer: 'You can upload via Google Drive, Dropbox, WeTransfer, or our secure client portal. We provide step-by-step guidance.'
    }
  ];

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    const selectedPackageObj = packages.find(p => p.id === selectedPackage) || packages[0];
    if (!selectedPackageObj) return 0;
    const packagePrice = parseInt(selectedPackageObj.price.replace('৳', '').replace(',', '')) || 0;

    const addonsTotal = selectedAddons.reduce((total, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return total + parseInt(addon.price.replace('৳', '').replace(',', ''));
    }, 0);

    return packagePrice + addonsTotal;
  };

  // Helper function to create serializable packages
  const getSerializablePackages = () => {
    return packages.map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      description: pkg.description,
      color: pkg.color,
      features: pkg.features,
      popular: pkg.popular
    }));
  };

  // Helper function to create serializable addons
  const getSerializableAddons = () => {
    return addons.map(addon => ({
      id: addon.id,
      name: addon.name,
      price: addon.price,
      description: addon.description
    }));
  };

  return (
    <div className="min-h-screen bg-navy-950 bg-grid pt-[110px]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28 px-4 md:px-8 bg-gradient-to-r from-purple-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 bg-navy-900/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Film className="w-5 h-5" />
              <span className="text-sm font-medium">Professional Video Editing</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              {banner.title}
            </h1>

            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
              {banner.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('packages-section').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Get Started Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-navy-900/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-navy-900/20 transition-all duration-300"
              >
                View Our Portfolio
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { value: '5000+', label: 'Videos Edited', icon: <Video className="w-6 h-6" /> },
              { value: '98%', label: 'Client Satisfaction', icon: <Star className="w-6 h-6" /> },
              { value: '৳599', label: 'Starting Price', icon: <Award className="w-6 h-6" /> },
              { value: '24/7', label: 'Support Available', icon: <Headphones className="w-6 h-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-navy-900/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
              >
                <div className="inline-flex p-3 rounded-full bg-navy-900/20 text-white mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Types We Edit */}
      <section className="py-16 px-4 md:px-8 bg-navy-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Video Types We{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Specialize In
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From social media clips to corporate films, we handle all types of video content
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-navy-900 to-navy-900 rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-xl ${type.color} bg-opacity-20 mb-4 text-2xl`}>
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{type.title}</h3>
                  <p className="text-slate-400">{type.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section id="packages-section" className="py-16 px-4 md:px-8 bg-gradient-to-b from-navy-900 to-navy-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Perfect Package
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Transparent pricing with no hidden costs. Start from just ৳599
            </p>
          </motion.div>

          {/* Package Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`relative cursor-pointer ${selectedPackage === pkg.id ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                  }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-full">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className={`bg-navy-900 rounded-2xl p-6 border ${selectedPackage === pkg.id ? 'border-blue-500' : 'border-white/10'
                  } h-full`}>
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${pkg.color} text-white mb-4`}>
                    <Film className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{pkg.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">{pkg.price}</span>
                      <span className="text-slate-500 line-through">{pkg.originalPrice}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${selectedPackage === pkg.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-gray-200'
                      }`}
                  >
                    {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="bg-navy-900 rounded-3xl p-6 md:p-8 border border-white/10 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Additional Services (Addons)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {addons.map((addon) => (
                <div
                  key={addon.id}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${selectedAddons.includes(addon.id)
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/10 hover:border-blue-500/50'
                    }`}
                  onClick={() => toggleAddon(addon.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg text-xl ${selectedAddons.includes(addon.id) ? 'bg-blue-500/15 text-blue-600' : 'bg-white/5 text-slate-400'
                        }`}>
                        {addon.icon}
                      </div>
                      <span className="font-semibold text-white">{addon.name}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddons.includes(addon.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-white/15'
                      }`}>
                      {selectedAddons.includes(addon.id) && ( 
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-2">{addon.description}</p>
                  <div className="text-blue-600 font-bold">{addon.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-6 md:p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="bg-navy-900 rounded-xl p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-white">Selected Package</h4>
                      <p className="text-slate-400 text-sm">
                        {packages.find(p => p.id === selectedPackage)?.name}
                      </p>
                    </div>
                    <div className="text-xl font-bold text-blue-600">
                      {packages.find(p => p.id === selectedPackage)?.price}
                    </div>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div>
                      <h5 className="font-medium text-white mb-3">Additional Services:</h5>
                      <div className="space-y-2">
                        {selectedAddons.map(addonId => {
                          const addon = addons.find(a => a.id === addonId);
                          return (
                            <div key={addonId} className="flex items-center justify-between">
                              <span className="text-slate-300">{addon.name}</span>
                              <span className="font-medium text-white">{addon.price}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-navy-900 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white">Total Amount</h4>
                      <p className="text-slate-400 text-sm">Inclusive of all services</p>
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      ৳{calculateTotal().toLocaleString()}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                  >
                    <Link
                      to="/order"
                      state={{
                        service: {
                          id: 'video-editing',
                          name: 'Professional Video Editing',
                          icon: '🎬',
                          packages: getSerializablePackages(),
                          addons: getSerializableAddons(),
                          selectedPackage: selectedPackage,
                          selectedAddons: selectedAddons,
                          totalAmount: calculateTotal()
                        }
                      }}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ArrowRight className="w-5 h-5" />
                      Proceed To Order
                    </Link>
                  </motion.div>
                </div>
              </div>

              <div>
                <div className="bg-navy-900 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    {[
                      'Professional editing by experts',
                      'Fast delivery guarantee',
                      'Unlimited revisions (Premium+)',
                      'Source files provided',
                      'Money-back guarantee',
                      '24/7 customer support'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 px-4 md:px-8 bg-navy-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Simple{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Working Process
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From concept to delivery, we make video editing simple and efficient
            </p>
          </motion.div>

          <div className="relative">
            {/* Process Line */}
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-navy-900 rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl mb-4 mx-auto">
                      {step.icon}
                    </div>
                    <div className="text-sm font-medium text-blue-600 mb-2">Step {step.step}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-navy-900 to-navy-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Questions
              </span>
            </h2>
            <p className="text-slate-400">Get answers to common questions about our video editing services</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-navy-900 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-navy-900 transition-colors"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                  <div className={`transform transition-transform ${faqOpen === index ? 'rotate-180' : ''}`}>
                    <ArrowRight className="w-5 h-5 text-slate-500" />
                  </div>
                </button>
                {faqOpen === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-slate-300">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {banner.ctaTitle || 'Ready to Transform Your Videos?'}
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-10">
              {banner.ctaSubtitle || 'Join thousands of satisfied clients who trust us with their video content. Get started with our ৳599 basic package today!'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('packages-section').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-navy-900 text-blue-900 font-bold rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start Your Project Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-navy-900/10 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl hover:bg-navy-900/20 transition-all duration-300"
              >
                Schedule a Free Consultation
              </motion.button>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { text: 'No Hidden Costs', icon: <Shield className="w-5 h-5" /> },
                { text: '24/7 Support', icon: <Headphones className="w-5 h-5" /> },
                { text: 'Fast Delivery', icon: <Zap className="w-5 h-5" /> },
                { text: 'Money Back Guarantee', icon: <Award className="w-5 h-5" /> }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-blue-200">
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VideoDetails;