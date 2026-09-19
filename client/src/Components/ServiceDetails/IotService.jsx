import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Cpu,
  Check,
  ArrowRight,
  Sparkles,
  Wifi,
  Shield,
  Users,
  Zap,
  Clock,
  Star,
  Award,
  Target,
  BarChart,
  MessageSquare,
  Radio,
  Cloud,
  Gauge,
  Factory,
  Home,
  Thermometer
} from 'lucide-react';
import { useServicePackages, useServiceBanner } from '../../utils/useServiceCms';
import { ServiceIcon } from '../../utils/serviceIcons.jsx';

const PACKAGE_STYLES = [
  { color: 'from-orange-400 to-amber-500', badge: 'Starter' },
  { color: 'from-amber-500 to-yellow-500', badge: 'Most Popular' },
  { color: 'from-red-500 to-orange-600', badge: 'Premium' },
  { color: 'from-yellow-500 to-amber-600', badge: 'Enterprise' },
];

const IotService = () => {
  const navigate = useNavigate();

  const DEFAULT_PACKAGES = [
    {
      id: 'basic-iot',
      name: 'IoT Starter',
      tagline: 'Connect your first smart devices',
      price: '৳4,999',
      duration: '10-15 days',
      features: [
        'Smart Sensor Setup (up to 5 devices)',
        'Real-Time Data Dashboard',
        'Device Monitoring & Alerts',
        'Cloud Data Sync',
        'Basic Documentation',
        '1 Month Support'
      ],
      popular: false,
      color: 'from-orange-400 to-amber-500',
      badge: 'Starter'
    },
    {
      id: 'standard-iot',
      name: 'IoT Professional',
      tagline: 'Scalable smart systems for growing operations',
      price: '৳9,999',
      duration: '15-20 days',
      features: [
        'Smart Sensor Setup (up to 20 devices)',
        'Custom Monitoring Dashboard',
        'Predictive Alerts',
        'Cloud & Mobile App Access',
        'API Integration',
        '3 Months Support',
        'Device Firmware Updates'
      ],
      popular: true,
      color: 'from-amber-500 to-yellow-500',
      badge: 'Most Popular'
    },
    {
      id: 'enterprise-iot',
      name: 'IoT Enterprise',
      tagline: 'Industrial-grade connected infrastructure',
      price: '৳17,999',
      duration: '25-35 days',
      features: [
        'Unlimited Connected Devices',
        'Custom Sensor Network Design',
        'Real-Time Monitoring Dashboard',
        'Predictive Maintenance Alerts',
        'Cloud & On-Premise Data Sync',
        'System Integration (ERP/CRM)',
        '6 Months Premium Support'
      ],
      popular: false,
      color: 'from-red-500 to-orange-600',
      badge: 'Premium'
    },
    {
      id: 'custom-iot',
      name: 'IoT Custom Solution',
      tagline: 'Fully tailored IoT ecosystem',
      price: '৳29,999',
      duration: '30-45 days',
      features: [
        'Custom Hardware Selection',
        'Bespoke Sensor Network',
        'Advanced Analytics & Reporting',
        'Multi-site Device Management',
        'Dedicated Engineering Support',
        '1 Year Premium Support',
        'Staff Training Included'
      ],
      popular: false,
      color: 'from-yellow-500 to-amber-600',
      badge: 'Enterprise'
    }
  ];

  const { packages: cmsPackages } = useServicePackages('iot-solutions', DEFAULT_PACKAGES);
  const packages = cmsPackages.map((p, i) => ({ ...PACKAGE_STYLES[i % PACKAGE_STYLES.length], ...p }));
  const banner = useServiceBanner('iot-solutions', {
    title: 'IoT Solutions',
    subtitle: 'Connect, monitor, and automate your physical world with smart sensors, real-time dashboards, and reliable device infrastructure',
  });

  const DEFAULT_SERVICES_GRID = [
    { icon: 'Wifi', title: 'Smart Sensor Networks', description: 'Deploy connected sensors for temperature, motion, and more' },
    { icon: 'BarChart', title: 'Real-Time Dashboards', description: 'Monitor every device and metric from a single control panel' },
    { icon: 'Factory', title: 'Industrial Automation', description: 'Connect machinery and production lines for smarter operations' },
    { icon: 'Home', title: 'Smart Building Systems', description: 'Automate lighting, security, and climate control' },
    { icon: 'Radio', title: 'Device Monitoring & Alerts', description: 'Get notified instantly when something needs attention' },
    { icon: 'Cloud', title: 'Cloud Data Integration', description: 'Sync device data seamlessly with your existing systems' }
  ];
  const services = banner.servicesGrid?.length > 0 ? banner.servicesGrid : DEFAULT_SERVICES_GRID;

  const DEFAULT_STATS = [
    { value: '150+', label: 'Devices Deployed' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Monitoring' },
    { value: '15min', label: 'Avg. Alert Response' }
  ];
  const stats = banner.stats?.length > 0 ? banner.stats : DEFAULT_STATS;

  const handleOrderClick = () => {
    navigate('/order', {
      state: {
        service: {
          id: 'iot-solutions',
          name: 'IoT Solutions',
          icon: '📡',
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
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 blur-3xl rounded-full" />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-xl mb-6 transform rotate-3">
              <Cpu className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">
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
                  className="bg-navy-900/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10"
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
            Our IoT Solutions
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
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-orange-500/15 text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                  <ServiceIcon name={service.icon} fallback={Wifi} />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/15 to-amber-500/15 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-400">Flexible Packages</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your IoT Package
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From a handful of smart sensors to full industrial-scale device networks
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
                  pkg.popular ? 'border-amber-500 shadow-2xl' : 'border-white/10'
                } bg-navy-900`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-full text-sm flex items-center gap-2 shadow-lg">
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
                    <h3 className="text-2xl font-bold mb-2 text-white">{pkg.name}</h3>
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
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:shadow-lg'
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Why Choose Us</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">
                {banner.whyChooseHeading || 'Reliable IoT Infrastructure for Real Businesses'}
              </h2>
              <div className="space-y-4">
                {(banner.whyChoosePoints?.length > 0 ? banner.whyChoosePoints : [
                  { icon: 'Shield', title: 'Secure by Design', description: 'Encrypted device communication and access control' },
                  { icon: 'Users', title: 'Expert Engineers', description: 'Experienced in hardware and cloud integration' },
                  { icon: 'Target', title: 'Built to Scale', description: 'From a few sensors to full facility networks' },
                ]).map((point, i) => (
                  <div className="flex items-start gap-4" key={i}>
                    <ServiceIcon name={point.icon} fallback={Shield} className="w-6 h-6 text-orange-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">{point.title}</h4>
                      <p className="text-gray-300">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <Gauge className="w-8 h-8 text-orange-400 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Real-Time Monitoring</h4>
                <p className="text-gray-300 text-sm">Live data from every connected device</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <Thermometer className="w-8 h-8 text-amber-400 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Sensor Flexibility</h4>
                <p className="text-gray-300 text-sm">Temperature, motion, humidity & more</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <Award className="w-8 h-8 text-yellow-400 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Proven Reliability</h4>
                <p className="text-gray-300 text-sm">99.9% uptime across deployments</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <MessageSquare className="w-8 h-8 text-red-400 mb-4" />
                <h4 className="text-lg font-semibold mb-2">24/7 Support</h4>
                <p className="text-gray-300 text-sm">Always here when devices need attention</p>
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
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {banner.ctaTitle || 'Ready to Connect Your Devices?'}
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              {banner.ctaSubtitle || "Let's build a smart, connected system tailored to your business"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOrderClick}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
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

export default IotService;
