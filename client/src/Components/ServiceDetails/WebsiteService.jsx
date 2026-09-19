// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Globe, 
  Check, 
  ArrowRight, 
  Clock, 
  Shield, 
  Users, 
  Smartphone,
  Code,
  Database,
  Server,
  Zap,
  Layout,
  Palette,
  BarChart,
  ShoppingCart,
  CreditCard,
  Headphones,
  Star,
  Award,
  Target,
  Rocket,
  Sparkles,
  TrendingUp,
  Lock,
  Smartphone as Mobile,
  Cpu,
  Cloud,
  Layers,
  Globe as Web
} from 'lucide-react';
import { useServicePackages, useServiceBanner } from '../../utils/useServiceCms';
import { ServiceIcon } from '../../utils/serviceIcons.jsx';

const WebsiteService = () => {
  const navigate = useNavigate();

  // Packages for Web Development with Bangladeshi Taka in English text
  const DEFAULT_PACKAGES = [
    {
      id: 'basic-website',
      name: 'Basic Website',
      price: '৳ 4,999',
      originalPrice: '৳ 7,999',
      duration: '7-10 days',
      features: [
        '5 Pages Responsive Website',
        'Mobile Friendly Design',
        'Contact Form Integration',
        'Basic SEO Setup',
        'Google Analytics Integration',
        'Social Media Links',
        '1 Month Free Support',
        '3 Revisions',
        'Domain & Hosting Guidance'
      ],
      bestFor: 'Startups & Personal Websites',
      popular: false,
      icon: <Globe className="w-6 h-6" />
    },
    {
      id: 'business-website',
      name: 'Business Website',
      price: '৳ 12,999',
      originalPrice: '৳ 19,999',
      duration: '15-20 days',
      features: [
        '10-15 Pages Dynamic Website',
        'CMS Integration (WordPress)',
        'Advanced SEO Optimization',
        'Google Maps Integration',
        'Blog/News Section',
        'Gallery/Portfolio Section',
        'Email Newsletter Setup',
        '6 Months Free Support',
        'Unlimited Revisions',
        'Mobile App (Optional)',
        'SSL Certificate',
        'Monthly Backup'
      ],
      bestFor: 'Small & Medium Businesses',
      popular: true,
      icon: <Building className="w-6 h-6" />
    },
    {
      id: 'ecommerce-website',
      name: 'E-commerce Website',
      price: '৳ 29,999',
      originalPrice: '৳ 49,999',
      duration: '25-30 days',
      features: [
        'Complete E-commerce Solution',
        'Payment Gateway Integration',
        'Admin Dashboard with Analytics',
        'Inventory Management System',
        'Order Tracking System',
        'Customer Management',
        'Product Reviews & Ratings',
        'Coupon/Discount System',
        '1 Year Free Support',
        'Mobile App Included',
        'Advanced Security Features',
        'Daily Backup System',
        'Multi-vendor Support (Optional)'
      ],
      bestFor: 'Online Stores & Marketplaces',
      popular: false,
      icon: <ShoppingCart className="w-6 h-6" />
    },
    {
      id: 'custom-webapp',
      name: 'Custom Web Application',
      price: 'Custom Quote',
      originalPrice: '',
      duration: 'Based on Project',
      features: [
        'Custom Requirements & Features',
        'Scalable Architecture',
        'API Integration',
        'Database Design & Management',
        'Real-time Features',
        'User Authentication System',
        'Advanced Analytics Dashboard',
        'Dedicated Project Manager',
        'Priority Support',
        'Technical Documentation',
        'Training & Handover',
        'Maintenance Agreement'
      ],
      bestFor: 'Enterprises & Complex Projects',
      popular: false,
      icon: <Cpu className="w-6 h-6" />
    }
  ];

  const { packages } = useServicePackages('web-app-development', DEFAULT_PACKAGES);
  const banner = useServiceBanner('web-app-development', {
    title: 'Modern Web Development',
    subtitle: 'Responsive websites, e-commerce solutions, and custom web applications built with cutting-edge technology',
  });

  // Technologies we use
  const technologies = [
    { name: 'React.js', icon: '⚛️', color: 'from-cyan-500 to-blue-600' },
    { name: 'Next.js', icon: '▲', color: 'from-black to-gray-800' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-emerald-600' },
    { name: 'MongoDB', icon: '🍃', color: 'from-green-400 to-green-600' },
    { name: 'Firebase', icon: '🔥', color: 'from-orange-500 to-yellow-500' },
    { name: 'Tailwind CSS', icon: '🎨', color: 'from-teal-400 to-cyan-500' },
    { name: 'WordPress', icon: 'W', color: 'from-blue-600 to-blue-800' },
    { name: 'Laravel', icon: '🐘', color: 'from-red-500 to-pink-600' }
  ];

  // Features of our service
  const FEATURE_COLORS = [
    'from-purple-500 to-indigo-600', 'from-blue-500 to-cyan-500', 'from-yellow-500 to-orange-500',
    'from-green-500 to-emerald-600', 'from-pink-500 to-rose-600', 'from-red-500 to-orange-500',
  ];
  const DEFAULT_FEATURES = [
    { icon: 'Shield', title: 'Secure & Reliable', description: 'Enterprise-level security with SSL, firewalls, and regular security updates' },
    { icon: 'Smartphone', title: 'Mobile First', description: 'Optimized for all devices with responsive design principles' },
    { icon: 'Zap', title: 'High Performance', description: 'Lightning-fast loading with 90+ Google PageSpeed scores' },
    { icon: 'TrendingUp', title: 'SEO Optimized', description: 'Built with SEO best practices for maximum visibility' },
    { icon: 'Headphones', title: '24/7 Support', description: 'Round-the-clock technical support and maintenance' },
    { icon: 'Rocket', title: 'Rapid Delivery', description: 'Agile development with regular progress updates' }
  ];
  const features = (banner.whyChoosePoints?.length > 0 ? banner.whyChoosePoints : DEFAULT_FEATURES)
    .map((f, i) => ({ ...f, color: FEATURE_COLORS[i % FEATURE_COLORS.length] }));

  // Process steps
  const processSteps = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We analyze your requirements and define project goals',
      icon: <Target className="w-6 h-6" />
    },
    {
      step: '02',
      title: 'Design',
      description: 'Wireframing, prototyping, and visual design approval',
      icon: <Palette className="w-6 h-6" />
    },
    {
      step: '03',
      title: 'Development',
      description: 'Agile development with continuous testing',
      icon: <Code className="w-6 h-6" />
    },
    {
      step: '04',
      title: 'Testing',
      description: 'Quality assurance and performance optimization',
      icon: <Check className="w-6 h-6" />
    },
    {
      step: '05',
      title: 'Launch',
      description: 'Deployment and performance monitoring',
      icon: <Rocket className="w-6 h-6" />
    },
    {
      step: '06',
      title: 'Support',
      description: 'Ongoing maintenance and feature updates',
      icon: <Headphones className="w-6 h-6" />
    }
  ];

 const handleOrderClick = (packageId) => {
  navigate('/order', {
    state: {
      service: {
        id: 'web-development',
        name: 'Web & App Development',
        icon: '💻',
        // Send packages without icon property
        // eslint-disable-next-line no-unused-vars
        packages: packages.map(({ icon, ...rest }) => rest),
        selectedPackage: packageId
      }
    }
  });
};

  // Stats
  const DEFAULT_STATS = [
    { value: '200+', label: 'Projects Delivered' },
    { value: '99%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Available' },
    { value: '50+', label: 'Expert Developers' }
  ];
  const stats = banner.stats?.length > 0 ? banner.stats : DEFAULT_STATS;

  return (
    <div className="min-h-screen bg-navy-950 bg-grid pt-[110px]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 md:py-24">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 mb-8"
            >
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            >
              {banner.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 px-4"
            >
              {banner.subtitle}
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOrderClick('business-website')}
                className="px-6 py-4 md:px-8 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/25"
              >
                <ArrowRight className="w-5 h-5" />
                Start Your Project
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-4 md:px-8 md:py-4 bg-navy-900/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-navy-900/20 transition-all"
              >
                View Packages
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies We Use */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Modern Tech Stack
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Leveraging cutting-edge technologies for scalable, performant solutions
            </p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, type: "spring" }}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`bg-gradient-to-br ${tech.color} rounded-2xl p-4 hover:shadow-xl transition-all duration-300 cursor-pointer`}
              >
                <div className="flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-3xl mb-2">{tech.icon}</span>
                  <span className="text-xs md:text-sm font-medium text-white text-center">{tech.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16 md:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-700 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Pricing Plans
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Tailored Solutions for Every Business
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Choose the perfect package that aligns with your business goals and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className={`relative rounded-3xl overflow-hidden h-full flex flex-col ${
                  pkg.popular 
                    ? 'ring-2 ring-cyan-500 ring-offset-4 shadow-2xl transform md:scale-105 z-10' 
                    : 'border border-white/10 shadow-lg'
                } bg-navy-900 hover:shadow-xl transition-all duration-300`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-center py-2 px-4 font-bold text-sm">
                    🏆 MOST POPULAR
                  </div>
                )}
                
                <div className={`pt-8 ${pkg.popular ? 'pb-8' : 'pb-8'} px-6 flex-1 flex flex-col`}>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 mb-4">
                      {pkg.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {pkg.name}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-400 text-sm">{pkg.duration}</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-white">
                        {pkg.price}
                      </div>
                      {pkg.originalPrice && (
                        <div className="text-slate-500 line-through text-sm">
                          {pkg.originalPrice}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-sm text-cyan-600 font-medium px-4 py-1 bg-cyan-500/10 rounded-full inline-block">
                      {pkg.bestFor}
                    </div>
                  </div>
                  
                  <div className="flex-1 mb-8">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOrderClick(pkg.id)}
                    className={`w-full py-3.5 rounded-xl font-bold transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-xl shadow-lg shadow-cyan-500/25'
                        : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-lg'
                    }`}
                  >
                    {pkg.price === 'Custom Quote' ? 'Get Custom Quote' : 'Select Package'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Custom Development CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 md:mt-16 bg-gradient-to-r from-navy-900 to-cyan-500/10 rounded-3xl p-8 border border-white/10"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Need Custom Development?
                </h3>
                <p className="text-slate-300">
                  Have specific requirements? Contact us for a custom quote tailored to your exact needs.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOrderClick('custom-webapp')}
                className="px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-xl hover:shadow-xl transition-all shadow-lg"
              >
                Request Custom Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-navy-900 to-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {banner.whyChooseHeading || 'Excellence in Every Project'}
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              We deliver websites that not only look stunning but also drive business growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="relative h-full bg-navy-900 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-white/10">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-300 to-transparent rounded-t-2xl group-hover:h-2 transition-all" />
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 text-white`}>
                    <ServiceIcon name={feature.icon} fallback={Shield} className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 md:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-700 rounded-full text-sm font-medium mb-4">
              <Layers className="w-4 h-4" />
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Streamlined Development Workflow
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              A systematic approach ensuring quality, transparency, and timely delivery
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transform -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="relative bg-gradient-to-br from-navy-900 to-navy-900 rounded-3xl p-8 shadow-lg border border-white/10 h-full">
                    <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Special */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">E-commerce Special</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Launch Your Online Store
              </h2>
              
              <p className="text-gray-300 text-lg mb-8">
                Complete e-commerce solutions with payment integration, inventory management, 
                and everything needed for successful online selling.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Payment Gateway Integration (Cards, UPI, Wallet)',
                  'Mobile App Included with Website',
                  '1 Year Free Support & Maintenance',
                  'Order Tracking & Analytics Dashboard',
                  'Inventory Management System',
                  'Multi-language & Currency Support'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOrderClick('ecommerce-website')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all flex items-center gap-3 shadow-lg shadow-emerald-500/25"
              >
                <ShoppingCart className="w-5 h-5" />
                Launch Store Now
              </motion.button>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                initial={{ rotateY: 180 }}
                whileInView={{ rotateY: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50"
              >
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-white mb-2">৳ 29,999</div>
                  <div className="text-2xl font-bold text-white mb-4">E-commerce Package</div>
                  <p className="text-emerald-400">One-time payment, lifetime value</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: 'Development Time', value: '25-30 Days', icon: <Clock className="w-4 h-4" /> },
                    { label: 'Free Support', value: '1 Year', icon: <Headphones className="w-4 h-4" /> },
                    { label: 'Mobile App', value: 'Included', icon: <Smartphone className="w-4 h-4" /> },
                    { label: 'Payment Methods', value: '6+ Options', icon: <CreditCard className="w-4 h-4" /> }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="text-slate-500">
                          {item.icon}
                        </div>
                        <span className="text-gray-300">{item.label}</span>
                      </div>
                      <span className="font-bold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
            
            <div className="relative z-10 text-center py-16 md:py-20 px-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                {banner.ctaTitle || 'Ready to Build Your Digital Presence?'}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-blue-100 max-w-2xl mx-auto mb-10"
              >
                {banner.ctaSubtitle || "Let's create a stunning website that drives results for your business"}
              </motion.p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOrderClick('business-website')}
                  className="px-8 py-4 bg-navy-900 text-white font-bold rounded-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 shadow-lg"
                >
                  <Rocket className="w-5 h-5" />
                  Start Your Project
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-navy-900/20 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl hover:bg-navy-900/30 transition-all"
                >
                  Compare Packages
                </motion.button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-blue-100">
                {[
                  { icon: <Award />, text: '200+ Projects Delivered' },
                  { icon: <Users />, text: 'Expert Team' },
                  { icon: <Target />, text: 'On-Time Delivery' },
                  { icon: <Check />, text: 'Quality Guaranteed' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="text-blue-200">
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper component for Building icon
const Building = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export default WebsiteService;