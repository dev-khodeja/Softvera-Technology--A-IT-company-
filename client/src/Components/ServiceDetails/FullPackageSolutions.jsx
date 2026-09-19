import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Check,
  Star,
  Zap,
  Shield,
  Clock,
  Users,
  Globe,
  Brain,
  Cpu,
  Code,
  Video,
  Palette,
  BookOpen,
  Bot,
  Rocket,
  Award,
  TrendingUp,
  Target,
  Layers,
  ChevronRight,
  ArrowRight,
  Gift,
  Sparkles,
  Tag,
  DollarSign,
  Calendar,
  ShoppingCart,
  X,
  Mail,
  Phone,
  User,
  Building,
  FileText,
  CreditCard,
  Lock
} from 'lucide-react';
import { useServicePackages, useServiceBanner } from '../../utils/useServiceCms';

const FullPackageSolutions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('advance');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    requirements: '',
    timeline: '30 days'
  });

  // All services list - like DigitalServices page
  const allServices = [
    {
      id: 1,
      title: "Digital Services",
      description: "Logo design, graphic design, data entry, digital marketing & more",
      icon: <Palette className="w-6 h-6" />,
      color: "blue",
      features: ["Logo Design", "Social Media", "Branding", "Marketing"]
    },
    {
      id: 2,
      title: "Video Editing",
      description: "Professional video editing with packages & pricing",
      icon: <Video className="w-6 h-6" />,
      color: "purple",
      features: ["Video Editing", "Motion Graphics", "Color Grading", "Audio"]
    },
    {
      id: 3,
      title: "Web & App Development",
      description: "Responsive websites and mobile applications",
      icon: <Code className="w-6 h-6" />,
      color: "green",
      features: ["Web Development", "Mobile Apps", "E-commerce", "API"]
    },
    {
      id: 4,
      title: "AI & n8n Solutions",
      description: "AI integration and n8n automation workflows",
      icon: <Brain className="w-6 h-6" />,
      color: "indigo",
      features: ["AI Integration", "Automation", "Chatbots", "Workflows"]
    },
    {
      id: 6,
      title: "SoftVera Academy",
      description: "Comprehensive IT courses & training programs",
      icon: <BookOpen className="w-6 h-6" />,
      color: "red",
      features: ["Courses", "Training", "Certification", "Mentorship"]
    },
    {
      id: 7,
      title: "Virtual Assistance",
      description: "Reliable virtual support for business productivity",
      icon: <Bot className="w-6 h-6" />,
      color: "teal",
      features: ["VA Services", "Admin Support", "Research", "Management"]
    },
    {
      id: 8,
      title: "IoT Solutions",
      description: "Connect, monitor, and automate devices with smart sensor networks",
      icon: <Cpu className="w-6 h-6" />,
      color: "orange",
      features: ["Smart Sensors", "Real-Time Monitoring", "Device Alerts", "Cloud Sync"]
    }
  ];

  // Eid Special Offers - with Order button like DigitalServices
  const eidSpecialOffers = [
    {
      id: 'eid-startup',
      name: 'Eid Startup Pack',
      price: '৳ 10,500',
      originalPrice: '৳ 25,000',
      discount: '58%',
      description: 'Perfect for new businesses launching this Eid season',
      color: 'from-green-500 to-emerald-500',
      badge: 'Eid Special',
      limited: true,
      features: [
        'Professional Website (MERN Stack)',
        '.bd Domain (1 Year)',
        '1 GB Hosting (1 Year)',
        'Logo Design (2 Concepts)',
        'Business Card Design',
        'Facebook Cover Photo',
        '1 Product Video (30 seconds)',
        'Basic SEO Setup',
        'WhatsApp Integration',
        '1 Month Free Support'
      ],
      duration: '15-20 days',
      validity: 'Offer valid until Eid-ul-Fitr',
      bestFor: ['New Startups', 'Small Businesses', 'Eid Special Businesses']
    },
    {
      id: 'eid-business',
      name: 'Eid Business Boost',
      price: '৳ 19,999',
      originalPrice: '৳ 45,000',
      discount: '56%',
      description: 'Complete digital presence for growing businesses',
      color: 'from-blue-500 to-cyan-500',
      badge: 'Best Value',
      limited: true,
      features: [
        'Advanced Website (MERN + Admin Panel)',
        '.bd Domain + SSL Certificate',
        '2 GB Hosting (1 Year)',
        'Complete Brand Identity Package',
        '10 Business Cards Design',
        'Social Media Kit (5 posts)',
        '3 Product Videos (1 min each)',
        'Advanced SEO Setup',
        'Email Marketing Integration',
        'WhatsApp & Facebook Chat Integration',
        'Google Analytics Setup',
        '3 Months Free Support'
      ],
      duration: '20-30 days',
      validity: 'Offer valid until Eid-ul-Fitr',
      bestFor: ['Growing Companies', 'E-commerce Stores', 'Service Businesses']
    }
  ];

  // Regular Packages - with Order button like DigitalServices
  const DEFAULT_REGULAR_PACKAGES = [
    {
      id: 'startup',
      name: 'Startup Package',
      price: '৳49,999',
      description: 'Perfect for new businesses starting their digital journey',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Basic Brand Identity',
        '5-Page Website',
        'Social Media Management (1 month)',
        'Email Marketing Setup',
        '3 Months Support',
        '2 Revisions per service'
      ],
      duration: '30-45 days',
      bestFor: ['New Startups', 'Small Businesses', 'Personal Brands']
    },
    {
      id: 'growth',
      name: 'Growth Package',
      price: '৳99,999',
      description: 'Complete digital transformation for growing businesses',
      color: 'from-purple-500 to-pink-500',
      recommended: true,
      features: [
        'Complete Brand Package',
        'Dynamic Website with CMS',
        '10 Video Edits/Month',
        'AI Chatbot Integration',
        'Dedicated VA (20 hrs/month)',
        'Social Media Campaigns',
        '6 Months Support',
        'Unlimited Revisions'
      ],
      duration: '60-75 days',
      bestFor: ['Growing Companies', 'E-commerce Stores', 'Service Businesses']
    },
    {
      id: 'enterprise',
      name: 'Enterprise Package',
      price: '৳199,999',
      description: 'End-to-end IT solutions for established organizations',
      color: 'from-orange-500 to-red-500',
      features: [
        'Complete IT Transformation',
        'Custom Software Development',
        'Professional Video Production',
        'AI-Powered Automation Systems',
        'IoT & Smart Device Integration',
        'Dedicated VA (160 hrs/month)',
        'Team Training Program',
        '1 Year Premium Support',
        'Monthly Performance Reports',
        'Strategic Consulting'
      ],
      duration: '90-120 days',
      bestFor: ['Large Enterprises', 'Corporations', 'Government Projects']
    }
  ];

  const REGULAR_PACKAGE_STYLES = [
    { color: 'from-blue-500 to-cyan-500', bestFor: ['New Startups', 'Small Businesses', 'Personal Brands'] },
    { color: 'from-purple-500 to-pink-500', recommended: true, bestFor: ['Growing Companies', 'E-commerce Stores', 'Service Businesses'] },
    { color: 'from-orange-500 to-red-500', bestFor: ['Large Enterprises', 'Corporations', 'Government Projects'] },
  ];
  const { packages: cmsRegularPackages } = useServicePackages('full-package-solutions', DEFAULT_REGULAR_PACKAGES);
  const regularPackages = cmsRegularPackages.map((p, i) => ({ ...REGULAR_PACKAGE_STYLES[i % REGULAR_PACKAGE_STYLES.length], ...p, recommended: p.popular }));
  const banner = useServiceBanner('full-package-solutions', {
    title: 'Complete IT Solutions Full Package Services',
    subtitle: 'One-stop solution for all your IT needs. From digital services to AI automation - we provide comprehensive packages tailored for your business growth.',
  });

  const successStories = [
    {
      company: "TechStart BD",
      package: "Growth Package",
      results: "Revenue increased by 300% in 6 months",
      services: ["Web Dev", "Digital Marketing", "AI Automation"]
    },
    {
      company: "E-Shop Pro",
      package: "Enterprise Package",
      results: "Automated 80% of manual processes",
      services: ["E-commerce", "RPA", "VA Services"]
    },
    {
      company: "Eid Bazar BD",
      package: "Eid Startup Pack",
      results: "Sales increased by 400% during Eid",
      services: ["Website", "Branding", "Video Marketing"]
    }
  ];

  // Handle package selection - Navigate to Order page
  // eslint-disable-next-line no-unused-vars
  const handlePackageSelect = (pkg) => {
    // Navigate to order page with package data
    navigate('/order', {
      state: {
        service: {
          id: 'full-package-solution',
          name: 'Full Package Solution',
          icon: '📦',
          packages: [pkg] // Send the selected package
        },
        selectedPackage: pkg
      }
    });
  };

  // Handle order click for packages - for button click
  const handleOrderClick = (pkg) => {
    navigate('/order', {
      state: {
        service: {
          id: 'full-package-solution',
          name: 'Full Package Solution',
          icon: '📦',
          packages: [pkg] // Send the selected package
        },
        selectedPackage: pkg
      }
    });
  };

  const handleServiceClick = (service) => {
    // Navigate to individual service page
    navigate('/service',);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Calculate final price based on payment method
      let finalPrice = selectedPackage.price;
      let originalPrice = parseInt(selectedPackage.price.replace(/[^\d]/g, ''));
      
      if (paymentMethod === 'full' && selectedPackage.originalPrice) {
        // Apply 5% additional discount for full payment
        finalPrice = `৳ ${Math.floor(originalPrice * 0.95).toLocaleString('en-US')}`;
      }
      
      // Process order
      const orderData = {
        package: selectedPackage,
        customer: orderForm,
        paymentMethod: paymentMethod,
        finalPrice: finalPrice,
        date: new Date().toISOString()
      };
      
      console.log('Order submitted:', orderData);
      
      // Show success message
      alert(`Thank you ${orderForm.name}! Your order for ${selectedPackage.name} has been received.\n\nOrder Summary:\n- Package: ${selectedPackage.name}\n- Payment Method: ${paymentMethod === 'advance' ? '50% Advance' : paymentMethod === 'full' ? '100% Full Payment' : '3 Installments'}\n- Final Amount: ${finalPrice}\n\nOur team will contact you within 2 hours to start your project.`);
      
      // Reset form and close modal
      setShowOrderModal(false);
      setSelectedPackage(null);
      setPaymentMethod('advance');
      setOrderForm({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        businessType: '',
        requirements: '',
        timeline: '30 days'
      });
      
    } catch (error) {
      console.error('Order submission error:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Display packages based on active tab
  const displayPackages = activeTab === 'all' ? [...eidSpecialOffers, ...regularPackages] :
                         activeTab === 'eid' ? eidSpecialOffers : regularPackages;

  // Order Modal Component - DigitalServices style
  const OrderModal = () => (
    <AnimatePresence>
      {showOrderModal && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-navy-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-navy-900 border-b border-white/10 p-6 flex justify-between items-center z-10">
              <div>
                <h2 className="text-2xl font-bold text-white">Order {selectedPackage?.name}</h2>
                <p className="text-slate-400">Complete your order details below</p>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                type="button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Package Summary */}
              <div className={`bg-gradient-to-r ${selectedPackage.color} rounded-xl p-6 text-white mb-6`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedPackage.name}</h3>
                    <p className="text-white/90">{selectedPackage.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        {selectedPackage.price}
                      </span>
                      {selectedPackage.originalPrice && (
                        <span className="line-through opacity-75">{selectedPackage.originalPrice}</span>
                      )}
                    </div>
                    <div className="text-sm mt-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Delivery: {selectedPackage.duration}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={orderForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Your full name"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={orderForm.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={orderForm.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="01XXXXXXXXX"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <Building className="w-4 h-4 inline mr-1" />
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={orderForm.businessName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Your business name"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Business Type
                    </label>
                    <select
                      name="businessType"
                      value={orderForm.businessType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      <option value="">Select business type</option>
                      <option value="startup">Startup</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="service">Service Business</option>
                      <option value="agency">Agency</option>
                      <option value="corporate">Corporate</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Project Timeline
                    </label>
                    <select
                      name="timeline"
                      value={orderForm.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      <option value="15 days">15 days</option>
                      <option value="30 days">30 days</option>
                      <option value="60 days">60 days</option>
                      <option value="90 days">90 days</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <FileText className="w-4 h-4 inline mr-1" />
                    Project Requirements *
                  </label>
                  <textarea
                    name="requirements"
                    value={orderForm.requirements}
                    onChange={handleInputChange}
                    rows="5"
                    required
                    className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                    placeholder="Describe your project requirements, goals, target audience, and any specific features you need..."
                    disabled={isSubmitting}
                  />
                </div>

                {/* Payment Options */}
                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Options
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div 
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'advance' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:border-blue-500/50 hover:bg-blue-500/20'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !isSubmitting && setPaymentMethod('advance')}
                    >
                      <div className="text-lg font-bold text-blue-600">50% Advance</div>
                      <div className="text-sm text-slate-400 mt-1">Pay now, rest after delivery</div>
                      <div className="text-xs text-slate-500 mt-2">Recommended for most clients</div>
                    </div>
                    
                    <div 
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'full' ? 'border-green-500 bg-green-500/10' : 'border-white/10 hover:border-green-500/50 hover:bg-green-500/20'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !isSubmitting && setPaymentMethod('full')}
                    >
                      <div className="text-lg font-bold text-green-600">100% Payment</div>
                      <div className="text-sm text-slate-400 mt-1">Pay full amount upfront</div>
                      <div className="text-xs text-slate-500 mt-2">
                        {selectedPackage?.originalPrice ? 'Get 5% additional discount' : 'Standard rate'}
                      </div>
                    </div>
                    
                    <div 
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'installment' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 hover:border-purple-500/50 hover:bg-purple-500/20'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !isSubmitting && setPaymentMethod('installment')}
                    >
                      <div className="text-lg font-bold text-purple-600">3 Installments</div>
                      <div className="text-sm text-slate-400 mt-1">Pay in 3 equal parts</div>
                      <div className="text-xs text-slate-500 mt-2">Spread your payments</div>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="mb-6 p-4 bg-navy-900 rounded-xl">
                    <h5 className="font-bold text-white mb-2">Payment Summary</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Package Price:</span>
                        <span className="font-medium">{selectedPackage.price}</span>
                      </div>
                      {selectedPackage.originalPrice && (
                        <div className="flex justify-between text-green-600">
                          <span>Package Discount:</span>
                          <span className="font-medium">-৳ {(parseInt(selectedPackage.originalPrice.replace(/[^\d]/g, '')) - parseInt(selectedPackage.price.replace(/[^\d]/g, ''))).toLocaleString('en-US')}</span>
                        </div>
                      )}
                      {paymentMethod === 'full' && selectedPackage.originalPrice && (
                        <div className="flex justify-between text-green-600">
                          <span>5% Additional Discount:</span>
                          <span className="font-medium">-৳ {Math.floor(parseInt(selectedPackage.price.replace(/[^\d]/g, '')) * 0.05).toLocaleString('en-US')}</span>
                        </div>
                      )}
                      {paymentMethod === 'advance' && (
                        <div className="flex justify-between">
                          <span>Advance Payment (50%):</span>
                          <span className="font-medium">৳ {Math.floor(parseInt(selectedPackage.price.replace(/[^\d]/g, '')) * 0.5).toLocaleString('en-US')}</span>
                        </div>
                      )}
                      {paymentMethod === 'installment' && (
                        <div className="flex justify-between">
                          <span>Each Installment:</span>
                          <span className="font-medium">৳ {Math.floor(parseInt(selectedPackage.price.replace(/[^\d]/g, '')) / 3).toLocaleString('en-US')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex items-start space-x-3 mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1"
                      disabled={isSubmitting}
                    />
                    <label htmlFor="terms" className="text-sm text-slate-400">
                      <Lock className="w-4 h-4 inline mr-1" />
                      I agree to the terms and conditions. I understand that project work will start after receiving the advance payment.
                    </label>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-[1.02]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          {paymentMethod === 'advance' ? 'Pay Advance & Place Order' :
                           paymentMethod === 'full' ? 'Pay Full Amount & Place Order' :
                           'Start Installment & Place Order'}
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setShowOrderModal(false)}
                      disabled={isSubmitting}
                      className="flex-1 bg-white/5 text-slate-300 font-bold py-4 px-8 rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </div>
                  
                  <div className="text-center mt-6 p-4 bg-blue-500/10 rounded-xl">
                    <div className="flex items-center justify-center gap-2 text-blue-700">
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">Secure Payment • 24/7 Support • Money Back Guarantee</span>
                    </div>
                    <p className="text-slate-400 text-sm mt-2">
                      Our team will contact you within 2 hours to confirm your order and discuss project details.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-navy-950 bg-grid pt-[110px] pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - DigitalServices style */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6"
          >
            <Package className="w-10 h-10 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full mb-6 border border-white/10"
          >
            <Gift className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Eid Special Offers Available</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {banner.title}
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            {banner.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              View All Packages
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-white/5 text-slate-300 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
            >
              Explore All Services
            </button>
          </div>
        </div>

        {/* Stats - DigitalServices style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: '200+', label: 'Projects Completed', icon: <Check className="w-5 h-5" /> },
            { value: '95%', label: 'Client Satisfaction', icon: <Star className="w-5 h-5" /> },
            { value: '50+', label: 'Team Experts', icon: <Users className="w-5 h-5" /> },
            { value: '58%', label: 'Eid Discount', icon: <Gift className="w-5 h-5" /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-navy-900 rounded-2xl p-6 shadow border border-white/10 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  index === 3 ? 'bg-green-500/15 text-green-600' : 'bg-blue-500/15 text-blue-600'
                }`}>
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

        {/* All Services Grid - DigitalServices style */}
        <div id="services" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Complete Service Suite</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Choose individual services or opt for comprehensive packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleServiceClick(service)}
                className="group bg-navy-900 rounded-xl border border-white/10 p-6 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className={`inline-flex p-3 rounded-lg ${
                  service.color === 'blue' ? 'bg-blue-500/15 text-blue-600' :
                  service.color === 'purple' ? 'bg-purple-500/15 text-purple-600' :
                  service.color === 'green' ? 'bg-green-500/15 text-green-600' :
                  service.color === 'indigo' ? 'bg-indigo-500/15 text-indigo-600' :
                  service.color === 'orange' ? 'bg-orange-500/15 text-orange-600' :
                  service.color === 'red' ? 'bg-red-500/15 text-red-600' :
                  'bg-teal-500/15 text-teal-600'
                } mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white/5 text-slate-300 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  View Details
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Limited Time Eid Banner - DigitalServices style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 mb-12 text-white text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <Gift className="w-6 h-6" />
              <div>
                <h3 className="text-xl font-bold">🎉 Eid Special Offers 🎉</h3>
                <p className="text-green-100">Limited time discounts up to 58% OFF</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Offer valid until Eid-ul-Fitr</span>
            </div>
            <button 
              onClick={() => setActiveTab('eid')}
              className="px-4 py-2 bg-navy-900 text-green-600 font-bold rounded-lg hover:bg-white/5 transition-all duration-300"
            >
              View Eid Offers
            </button>
          </div>
        </motion.div>

        {/* Package Tabs - DigitalServices style */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {['all', 'eid', 'regular'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab
                  ? tab === 'eid' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white/5 text-slate-300 hover:bg-gray-200'
              }`}
            >
              {tab === 'all' && 'All Packages'}
              {tab === 'eid' && '🎁 Eid Offers'}
              {tab === 'regular' && 'Regular Packages'}
            </button>
          ))}
        </div>

        {/* Packages Grid - DigitalServices Style with Order Button */}
        <div id="packages" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {activeTab === 'eid' ? '🎁 Eid Exclusive Packages' : 
               activeTab === 'regular' ? 'Regular Service Packages' : 
               'Complete Package Solutions'}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {activeTab === 'eid' 
                ? 'Limited time Eid offers - Don\'t miss out!' 
                : 'Comprehensive solutions combining multiple services for maximum impact'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displayPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative bg-navy-900 rounded-2xl border-2 ${
                  pkg.recommended ? 'border-purple-300 shadow-xl' : 
                  pkg.limited ? 'border-green-300 shadow-xl' :
                  'border-white/10'
                } overflow-hidden hover:shadow-2xl transition-shadow duration-300`}
              >
                {/* Limited/Eid Badge */}
                {pkg.limited && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full text-xs animate-pulse">
                      EID SPECIAL
                    </div>
                  </div>
                )}

                {/* Discount Badge */}
                {pkg.discount && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full text-xs">
                      {pkg.discount} OFF
                    </div>
                  </div>
                )}

                {/* Recommended Badge */}
                {pkg.recommended && !pkg.limited && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-sm">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Package Header */}
                <div className={`pt-12 pb-6 px-6 bg-gradient-to-r ${pkg.color} text-white`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-navy-900/20 backdrop-blur-sm">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{pkg.name}</h3>
                      <p className="text-white/90 text-sm">{pkg.description}</p>
                    </div>
                  </div>
                  
                  {/* Price Display */}
                  <div className="mt-6">
                    {pkg.originalPrice ? (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">{pkg.price}</span>
                          <span className="text-white/70 line-through">{pkg.originalPrice}</span>
                        </div>
                        <div className="text-white/80 text-sm mt-1">
                          You save: ৳ {(parseInt(pkg.originalPrice.replace(/[^\d]/g, '')) - parseInt(pkg.price.replace(/[^\d]/g, ''))).toLocaleString('en-US')}
                        </div>
                      </>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">{pkg.price}</span>
                        <span className="text-white/70">one-time</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center text-white/80 text-sm mt-3">
                    <Clock className="w-4 h-4 mr-2" />
                    Delivery: {pkg.duration}
                  </div>
                </div>

                {/* Package Content - DigitalServices style */}
                <div className="p-6">
                  {/* Best For */}
                  {pkg.bestFor && (
                    <div className="mb-6">
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Best For:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pkg.bestFor.map((item, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/5 text-slate-300 rounded-full text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      What's Included:
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Validity Period for Eid Offers */}
                  {pkg.validity && (
                    <div className="mb-6 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">{pkg.validity}</span>
                      </div>
                    </div>
                  )}

                  {/* ORDER BUTTON - Navigate to Order page */}
                  <button
                    onClick={() => handleOrderClick(pkg)}
                    className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 ${
                      pkg.limited
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:scale-[1.02]'
                        : pkg.recommended
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-[1.02]'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:scale-[1.02]'
                    }`}
                  >
                    {pkg.limited ? '🎉 Grab Eid Offer!' : 'Order This Package'}
                  </button>

                  {/* Installment Option */}
                  <div className="text-center mt-3">
                    <span className="text-sm text-slate-400">
                      Or pay in 3 installments of ৳ {Math.floor(parseInt(pkg.price.replace(/[^\d]/g, '')) / 3).toLocaleString('en-US')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Stories - DigitalServices style */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              See how businesses transformed with our solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-navy-900 rounded-2xl p-6 border border-white/10 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${
                    story.package.includes('Eid') 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : story.package.includes('Growth')
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  } flex items-center justify-center text-white font-bold`}>
                    {story.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{story.company}</h3>
                    <span className={`text-sm font-medium ${
                      story.package.includes('Eid') ? 'text-green-600' : 
                      story.package.includes('Growth') ? 'text-purple-600' : 'text-blue-600'
                    }`}>
                      {story.package}
                    </span>
                  </div>
                </div>
                
                <p className="text-slate-300 italic mb-4">"{story.results}"</p>
                
                <div className="flex flex-wrap gap-2">
                  {story.services.map((service, idx) => (
                    <span key={idx} className={`px-3 py-1 text-sm rounded-full ${
                      story.package.includes('Eid') 
                        ? 'bg-green-500/10 text-green-700' : 
                        story.package.includes('Growth')
                        ? 'bg-purple-500/10 text-purple-700' : 'bg-blue-500/10 text-blue-700'
                    }`}>
                      {service}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA - DigitalServices style */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a customized package recommendation based on your specific needs and budget
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => {
                // Open order page with Growth package
                const growthPackage = displayPackages.find(pkg => pkg.recommended) || displayPackages[0];
                if (growthPackage) {
                  handleOrderClick(growthPackage);
                }
              }}
              className="px-8 py-4 bg-navy-900 text-blue-600 font-bold rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center gap-3"
            >
              <Rocket className="w-5 h-5" />
              Order Most Popular Package
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-navy-900/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-navy-900/20 transition-all duration-300"
            >
              Get Custom Quote
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex flex-wrap items-center justify-center gap-6 text-blue-200 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Money Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Support Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span>Eid Offers Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal (removed the rendering since we're navigating to Order page) */}
    </div>
  );
};

export default FullPackageSolutions;