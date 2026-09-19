import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  Star, Users, Clock, Shield, Award, ArrowRight, ArrowUpRight,
  FileText, Calendar, Target, Headphones, TrendingUp
} from 'lucide-react';
import { API_URL } from '../../utils/api';
import { getServiceStyle } from '../../utils/serviceStyles';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardVariant = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const STATS = [
  { label: 'Projects Completed', value: '500+', icon: <Award className="w-5 h-5" /> },
  { label: 'Happy Clients', value: '200+', icon: <Users className="w-5 h-5" /> },
  { label: 'Expert Team', value: '50+', icon: <Star className="w-5 h-5" /> },
  { label: 'Success Rate', value: '98%', icon: <TrendingUp className="w-5 h-5" /> },
];

const WHY_US = [
  { icon: <Shield className="w-6 h-6" />, title: 'Quality Assurance', description: 'Rigorous testing ensures flawless delivery every time' },
  { icon: <Clock className="w-6 h-6" />, title: 'Timely Delivery', description: 'We respect deadlines and deliver projects on schedule' },
  { icon: <Headphones className="w-6 h-6" />, title: '24/7 Support', description: 'Round-the-clock assistance for your peace of mind' },
  { icon: <Target className="w-6 h-6" />, title: 'Custom Solutions', description: 'Tailored approaches for your unique requirements' },
];

const PROCESS = [
  { step: '01', title: 'Discovery', description: 'We understand your requirements and define project scope' },
  { step: '02', title: 'Planning', description: 'Detailed project planning and strategy development' },
  { step: '03', title: 'Execution', description: 'Quality implementation with regular progress updates' },
  { step: '04', title: 'Delivery & Support', description: 'Final delivery and ongoing maintenance support' },
];

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/service-cards`).then((r) => r.json()).then((d) => { if (d.success) setServices(d.data); }).catch(() => {});
    fetch(`${API_URL}/api/testimonials`).then((r) => r.json()).then((d) => { if (d.success) setTestimonials(d.data.slice(0, 3)); }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-navy-950 bg-grid pt-[110px]">
      {/* Hero Banner */}
      <section className="relative overflow-hidden py-16 md:py-20 px-4 md:px-8">
        <div className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs. From concept to execution, we deliver excellence in every project.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {STATS.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center">
                <div className="inline-flex p-3 rounded-full bg-accent-500/10 text-accent-400 mb-4">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">SoftVera</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We combine expertise, innovation, and dedication to deliver exceptional results</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6">
                <div className="inline-flex p-3 rounded-xl bg-accent-500/10 text-accent-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 md:px-8" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
              Our Comprehensive <span className="gradient-text">Services</span>
            </h2>
            <p className="text-slate-400 text-lg">
              <span className="text-accent-400 font-semibold">SoftVera Technologies</span> offers a complete range of digital solutions. Click on any service to explore detailed packages, pricing, and features.
            </p>
          </div>

          <motion.div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            {services.map((service) => {
              const style = getServiceStyle(service.color);
              const Icon = style.icon;
              return (
                <motion.div key={service._id} variants={cardVariant} className="group">
                  <Link to={service.link} className="block h-full">
                    <div className={`h-full flex flex-col glass-card p-6 rounded-2xl transition-all duration-300 ${style.ring} ${style.glow}`}>
                      <div className={`w-14 h-14 mx-auto mb-6 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-center text-white">{service.title}</h3>
                      <p className="text-sm text-slate-400 mb-6 flex-grow text-center">{service.description}</p>
                      <div className={`mt-auto flex items-center justify-center gap-1.5 text-sm font-semibold ${style.text}`}>
                        View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our <span className="gradient-text">Process</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">A structured approach to ensure project success from start to finish</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS.map((process, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative">
                <div className="glass-card rounded-2xl p-6">
                  <div className="text-4xl font-bold gradient-text mb-4">{process.step}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{process.title}</h3>
                  <p className="text-slate-400 text-sm">{process.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-accent-500/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Client <span className="gradient-text">Testimonials</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">What our clients say about working with us</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, index) => (
                <motion.div key={t._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating || 5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />)}
                  </div>
                  <p className="text-slate-300 italic mb-6">"{t.content}"</p>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.role}{t.company ? `, ${t.company}` : ''}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="rounded-3xl p-8 md:p-12 text-center bg-gradient-to-r from-electric-600 to-accent-600">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Transform Your Business?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Let's discuss your project and create a customized solution that drives results.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-navy-950 font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition">
                <FileText className="w-5 h-5" /> Get Free Consultation
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition">
                <Calendar className="w-5 h-5" /> Schedule a Call
              </Link>
            </div>
            <p className="text-sm text-white/70 mt-6 flex items-center justify-center gap-2">
              <ArrowUpRight className="w-4 h-4" /> Average response time: <span className="font-semibold">Under 2 hours</span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
