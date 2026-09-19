import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Phone, 
  Calendar, 
  Mail, 
  FileText, 
  Check, 
  ArrowRight, 
  Zap, 
  Shield, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  Globe,
  Headphones,
  Video,
  Brain,
  Bot,
  BarChart,
  Database,
  Cloud,
  Target,
  Star,
  Award,
  Coffee,
  ThumbsUp
} from 'lucide-react';
import { useServicePackages, useServiceBanner } from '../../utils/useServiceCms';

const VirtualAssistantServices = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const DEFAULT_PACKAGES = [
    {
      id: 'basic-va',
      name: 'Virtual Assistant Lite',
      price: '৳4,999/month',
      originalPrice: '৳6,999/month',
      description: 'Perfect for entrepreneurs and small business owners',
      color: 'from-blue-500 to-cyan-500',
      accentColor: 'bg-blue-500',
      duration: 'Part-time (20 hours/month)',
      features: [
        'Email Management',
        'Calendar Management',
        'Basic Data Entry',
        'Social Media Posting',
        'Document Preparation',
        'Customer Support (Basic)',
        'Weekly Reports',
        'Standard Communication'
      ],
      tasks: ['Up to 50 emails/day', 'Schedule 10 meetings/week', '10 social media posts'],
      bestFor: ['Startup Founders', 'Freelancers', 'Small Business Owners'],
      popular: true,
      type: 'general',
      badge: 'Most Popular'
    },
    {
      id: 'pro-va',
      name: 'Virtual Assistant Pro',
      price: '৳9,999/month',
      originalPrice: '৳14,999/month',
      description: 'Comprehensive support for growing businesses',
      color: 'from-purple-500 to-pink-500',
      accentColor: 'bg-purple-500',
      duration: 'Full-time (40 hours/month)',
      features: [
        'Advanced Email Management',
        'Complete Calendar Control',
        'Customer Relationship Management',
        'Social Media Management',
        'Content Research & Creation',
        'Basic Bookkeeping',
        'Travel Arrangements',
        'Project Coordination',
        'Video Editing (Basic)',
        'Monthly Performance Reports'
      ],
      tasks: ['Unlimited emails', 'Full calendar management', 'Social media strategy'],
      bestFor: ['Growing Companies', 'Agencies', 'Consultants'],
      popular: false,
      type: 'general',
      badge: 'Recommended'
    },
    {
      id: 'premium-va',
      name: 'Executive VA',
      price: '৳19,999/month',
      originalPrice: '৳29,999/month',
      description: 'Dedicated executive support for leaders',
      color: 'from-orange-500 to-red-500',
      accentColor: 'bg-orange-500',
      duration: 'Dedicated (80 hours/month)',
      features: [
        'Executive Calendar Management',
        'Strategic Planning Support',
        'Meeting Preparation & Follow-ups',
        'Presentation Creation',
        'Market Research & Analysis',
        'Client Relationship Management',
        'Team Coordination',
        'Budget Management',
        'Confidential Document Handling',
        'Personal Tasks Management',
        '24/7 Priority Support',
        'Weekly Strategy Sessions'
      ],
      tasks: ['Strategic planning', 'Team management', 'High-level coordination'],
      bestFor: ['Executives', 'CEOs', 'Senior Managers', 'Business Leaders'],
      popular: false,
      type: 'executive',
      badge: 'Premium'
    },
    {
      id: 'technical-va',
      name: 'Technical VA',
      price: '৳12,999/month',
      originalPrice: '৳18,999/month',
      description: 'Technical support for tech businesses',
      color: 'from-green-500 to-emerald-500',
      accentColor: 'bg-green-500',
      duration: 'Full-time (40 hours/month)',
      features: [
        'Technical Documentation',
        'Code Review Assistance',
        'API Documentation',
        'Software Testing Support',
        'GitHub Management',
        'Technical Research',
        'Bug Tracking',
        'Developer Communication',
        'Technical Writing',
        'Project Management Tools Setup'
      ],
      tasks: ['API documentation', 'Code review', 'Technical research'],
      bestFor: ['Tech Startups', 'Software Companies', 'Developers'],
      popular: true,
      type: 'technical',
      badge: 'Tech Specialized'
    },
    {
      id: 'creative-va',
      name: 'Creative VA',
      price: '৳11,999/month',
      originalPrice: '৳16,999/month',
      description: 'Creative support for marketing & content',
      color: 'from-pink-500 to-rose-500',
      accentColor: 'bg-pink-500',
      duration: 'Full-time (40 hours/month)',
      features: [
        'Content Writing & Editing',
        'Graphic Design Support',
        'Video Editing Assistance',
        'Social Media Content Creation',
        'Blog Management',
        'Email Newsletter Creation',
        'Marketing Material Design',
        'Brand Voice Development',
        'SEO Content Optimization',
        'Creative Research'
      ],
      tasks: ['Content creation', 'Design support', 'Social media management'],
      bestFor: ['Content Creators', 'Marketers', 'Design Agencies'],
      popular: false,
      type: 'creative',
      badge: 'Creative'
    },
    {
      id: 'ai-enhanced-va',
      name: 'AI Enhanced VA',
      price: '৳14,999/month',
      originalPrice: '৳21,999/month',
      description: 'AI-powered virtual assistance',
      color: 'from-indigo-500 to-blue-500',
      accentColor: 'bg-indigo-500',
      duration: 'Full-time + AI Support',
      features: [
        'AI Email Responses',
        'Smart Calendar Optimization',
        'Automated Research',
        'AI Content Generation',
        'Chatbot Integration',
        'Data Analysis & Insights',
        'Predictive Scheduling',
        'Automated Reporting',
        'Natural Language Processing',
        'Machine Learning Assistance'
      ],
      tasks: ['AI automation', 'Smart analytics', 'Automated workflows'],
      bestFor: ['Tech-Savvy Businesses', 'Innovation Teams', 'Data-Driven Companies'],
      popular: false,
      type: 'ai',
      badge: 'AI Powered'
    }
  ];

  const PACKAGE_STYLES = [
    { color: 'from-blue-500 to-cyan-500', accentColor: 'bg-blue-500', type: 'general', badge: 'Most Popular', tasks: ['Up to 50 emails/day', 'Schedule 10 meetings/week', '10 social media posts'], bestFor: ['Startup Founders', 'Freelancers', 'Small Business Owners'] },
    { color: 'from-purple-500 to-pink-500', accentColor: 'bg-purple-500', type: 'general', badge: 'Recommended', tasks: ['Unlimited emails', 'Full calendar management', 'Social media strategy'], bestFor: ['Growing Companies', 'Agencies', 'Consultants'] },
    { color: 'from-orange-500 to-red-500', accentColor: 'bg-orange-500', type: 'executive', badge: 'Premium', tasks: ['Strategic planning', 'Team management', 'High-level coordination'], bestFor: ['Executives', 'CEOs', 'Senior Managers', 'Business Leaders'] },
    { color: 'from-green-500 to-emerald-500', accentColor: 'bg-green-500', type: 'technical', badge: 'Tech Specialized', tasks: ['API documentation', 'Code review', 'Technical research'], bestFor: ['Tech Startups', 'Software Companies', 'Developers'] },
    { color: 'from-pink-500 to-rose-500', accentColor: 'bg-pink-500', type: 'creative', badge: 'Creative', tasks: ['Content creation', 'Design support', 'Social media management'], bestFor: ['Content Creators', 'Marketers', 'Design Agencies'] },
    { color: 'from-indigo-500 to-blue-500', accentColor: 'bg-indigo-500', type: 'ai', badge: 'AI Powered', tasks: ['AI automation', 'Smart analytics', 'Automated workflows'], bestFor: ['Tech-Savvy Businesses', 'Innovation Teams', 'Data-Driven Companies'] },
  ];

  const { packages: cmsPackages } = useServicePackages('virtual-assistance', DEFAULT_PACKAGES);
  const packages = cmsPackages.map((p, i) => {
    const style = PACKAGE_STYLES[i % PACKAGE_STYLES.length];
    return { ...style, ...p, type: p.category || style.type, badge: p.popular ? 'Most Popular' : style.badge };
  });
  const banner = useServiceBanner('virtual-assistance', {
    title: 'Your Professional Virtual Assistant',
    subtitle: 'Dedicated virtual assistants to handle your tasks, boost productivity, and help you focus on what matters most.',
  });

  const filteredPackages = activeFilter === 'all'
    ? packages
    : packages.filter(pkg => pkg.type === activeFilter);

  const handleOrderClick = () => {
    navigate('/order', {
      state: {
        service: {
          id: 'virtual-assistant',
          name: 'Virtual Assistant Services',
          icon: '👨‍💼',
          packages: packages
        }
      }
    });
  };

  const STAT_ICONS = [<Users className="w-5 h-5" />, <ThumbsUp className="w-5 h-5" />, <Clock className="w-5 h-5" />, <Check className="w-5 h-5" />];
  const DEFAULT_STATS = [
    { value: '150+', label: 'Clients Served' },
    { value: '99%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Availability' },
    { value: '50k+', label: 'Tasks Completed' }
  ];
  const stats = (banner.stats?.length > 0 ? banner.stats : DEFAULT_STATS)
    .map((s, i) => ({ ...s, icon: STAT_ICONS[i % STAT_ICONS.length] }));

  const vaTypes = [
    {
      type: 'general',
      title: 'General VA',
      description: 'Administrative & daily support',
      icon: <Users className="w-6 h-6" />,
      tasks: ['Email Management', 'Scheduling', 'Data Entry'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'executive',
      title: 'Executive VA',
      description: 'Strategic & leadership support',
      icon: <Award className="w-6 h-6" />,
      tasks: ['Strategic Planning', 'Meeting Management', 'Confidential Tasks'],
      color: 'from-orange-500 to-red-500'
    },
    {
      type: 'technical',
      title: 'Technical VA',
      description: 'Tech & development support',
      icon: <Brain className="w-6 h-6" />,
      tasks: ['Documentation', 'Research', 'Technical Support'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      type: 'creative',
      title: 'Creative VA',
      description: 'Content & design support',
      icon: <Sparkles className="w-6 h-6" />,
      tasks: ['Content Creation', 'Design', 'Social Media'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      type: 'ai',
      title: 'AI Enhanced VA',
      description: 'AI-powered assistance',
      icon: <Bot className="w-6 h-6" />,
      tasks: ['Automation', 'Analytics', 'AI Integration'],
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const services = [
    {
      category: 'Communication',
      icon: <MessageSquare className="w-5 h-5" />,
      items: [
        'Email Management',
        'Phone Call Handling',
        'Chat Support',
        'Client Communication',
        'Meeting Coordination'
      ]
    },
    {
      category: 'Administrative',
      icon: <FileText className="w-5 h-5" />,
      items: [
        'Calendar Management',
        'Document Preparation',
        'Data Entry',
        'Travel Arrangements',
        'Expense Tracking'
      ]
    },
    {
      category: 'Digital',
      icon: <Globe className="w-5 h-5" />,
      items: [
        'Social Media Management',
        'Website Updates',
        'CRM Management',
        'Online Research',
        'E-commerce Support'
      ]
    },
    {
      category: 'Creative',
      icon: <Star className="w-5 h-5" />,
      items: [
        'Content Writing',
        'Graphic Design',
        'Video Editing',
        'Presentation Design',
        'Brand Management'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Rahim Ahmed',
      role: 'Startup Founder',
      content: 'My VA saves me 15+ hours weekly. Best investment for my business!',
      rating: 5
    },
    {
      name: 'Tasnim Rahman',
      role: 'Marketing Director',
      content: 'The creative VA transformed our content strategy completely.',
      rating: 5
    },
    {
      name: 'Karim Hossain',
      role: 'Tech CEO',
      content: 'Technical VA helped us streamline our development process.',
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen bg-navy-950 bg-grid pt-[110px] pb-12 px-4">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 md:p-12 mb-12">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-navy-900/20 backdrop-blur-sm">
                <Users className="w-8 h-8 text-white" />
              </div>
              <span className="px-4 py-1.5 bg-navy-900/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                Professional Virtual Assistance
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {banner.title}
            </h1>

            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              {banner.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-navy-900 text-blue-600 font-semibold rounded-xl hover:bg-navy-900 transition-all duration-300 flex items-center gap-2"
              >
                View Packages
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-navy-900/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-navy-900/30 transition-all duration-300"
              >
                Free Consultation
              </button>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-navy-900 rounded-2xl p-6 shadow border border-white/10 hover:border-blue-500/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* VA Types */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Types of Virtual Assistants
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Choose the perfect assistant for your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {vaTypes.map((type, index) => (
              <motion.div
                key={type.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setActiveFilter(type.type)}
              >
                <div className="border-2 border-transparent hover:border-blue-500/50 transition-all duration-300 rounded-xl overflow-hidden">
                  <div className="bg-navy-900 p-4 text-center h-full border border-white/10 hover:border-blue-500/40 transition-colors duration-300">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${type.color} text-white mb-3`}>
                      {type.icon}
                    </div>
                    <h3 className="font-bold text-white mb-1">{type.title}</h3>
                    <p className="text-slate-400 text-xs mb-3">{type.description}</p>
                    
                    <div className="space-y-1">
                      {type.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span className="text-slate-300 text-xs">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Services We Offer
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Comprehensive virtual assistance for all your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-navy-900 rounded-xl p-6 border border-white/10 hover:border-blue-500/50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{service.category}</h3>
                </div>
                
                <div className="space-y-3">
                  {service.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center" id="packages">
          {['all', 'general', 'executive', 'technical', 'creative', 'ai'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow'
                  : 'bg-white/5 text-slate-300 hover:bg-gray-200'
              }`}
            >
              {filter === 'all' && 'All Assistants'}
              {filter === 'general' && (
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  General VA
                </span>
              )}
              {filter === 'executive' && (
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Executive VA
                </span>
              )}
              {filter === 'technical' && (
                <span className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Technical VA
                </span>
              )}
              {filter === 'creative' && (
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Creative VA
                </span>
              )}
              {filter === 'ai' && (
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  AI Enhanced
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-navy-900 rounded-2xl border border-white/10 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 overflow-hidden ${
                pkg.popular ? 'border-2 border-blue-300' : ''
              }`}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className={`px-4 py-1.5 ${pkg.accentColor} text-white font-bold rounded-full text-xs tracking-wide`}>
                  {pkg.badge}
                </div>
              </div>

              {/* Header with Gradient */}
              <div className={`pt-8 pb-6 px-6 bg-gradient-to-r ${pkg.color} text-white`}>                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-navy-900/20 backdrop-blur-sm">
                      <Users className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-navy-900/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      {pkg.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-white/90 text-sm">{pkg.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-white">{pkg.price}</span>
                    <span className="text-slate-500 line-through">{pkg.originalPrice}</span>
                  </div>
                  <div className="text-sm text-slate-400 mb-4">
                    Billed monthly • Cancel anytime
                  </div>
                </div>

                {/* Sample Tasks */}
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Sample Tasks:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.tasks.map((task, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-500/10 text-blue-700 rounded-full text-xs">
                        {task}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Best For */}
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Best For:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.bestFor.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/5 text-slate-300 rounded-full text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Features:
                  </h4>
                  <ul className="space-y-2">
                    {pkg.features.slice(0, 6).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-slate-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Button */}
                <button
                  onClick={handleOrderClick}
                  className={`w-full py-3 bg-blue-500/10 hover:bg-blue-500/15 text-blue-700 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 hover:border-blue-500/50`}
                >
                  Hire Assistant
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Client Testimonials
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              See what our clients say about our virtual assistant services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-navy-900 rounded-xl p-6 border border-white/10 hover:border-blue-500/50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 italic mb-4">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-600 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16" id="contact">
          <button
            onClick={handleOrderClick}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
          >
            <Users className="w-5 h-5" />
            Hire Your Virtual Assistant
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-slate-400 mt-4">
            Start with a 7-day trial • No long-term commitment required
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Hire Our Virtual Assistants?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Experience the difference with professional virtual assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Save 20+ Hours/Week",
                desc: "Focus on growth while we handle the routine tasks",
                color: "bg-blue-500"
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Trained Professionals",
                desc: "Skilled assistants with proven expertise",
                color: "bg-green-500"
              },
              {
                icon: <Coffee className="w-6 h-6" />,
                title: "No Overhead Costs",
                desc: "No office space, equipment, or benefits to pay",
                color: "bg-orange-500"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Flexible Scaling",
                desc: "Easily adjust hours as your needs change",
                color: "bg-purple-500"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-navy-900 p-6 rounded-xl border border-white/10 hover:border-blue-500/50 hover:shadow-md transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-lg ${benefit.color} text-white mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {banner.ctaTitle || 'Ready to Boost Your Productivity?'}
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            {banner.ctaSubtitle || 'Join hundreds of successful professionals who have transformed their work-life balance with our virtual assistants'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleOrderClick}
              className="px-8 py-4 bg-navy-900 text-blue-600 font-bold rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center gap-3"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-navy-900/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-navy-900/30 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualAssistantServices;