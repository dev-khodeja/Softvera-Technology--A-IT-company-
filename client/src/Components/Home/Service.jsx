import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { API_URL, assetUrl } from '../../utils/api';
import { getServiceStyle } from '../../utils/serviceStyles';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ServicesSection() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/service-cards`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setServices(d.data); })
      .catch(() => {});
  }, []);

  return (
    <section className="relative py-20 px-4 bg-navy-950" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="eyebrow justify-center mb-4">What we do</span>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Our Comprehensive <span className="gradient-text">Services</span>
          </h2>
          <p className="text-slate-400 text-lg">
            <span className="text-accent-400 font-semibold">SoftVera Technologies</span> offers a complete range of digital solutions. Click on any service to explore detailed packages, pricing, and features.
          </p>
        </div>

        <motion.div
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service) => {
            const style = getServiceStyle(service.color);
            const Icon = style.icon;
            return (
              <motion.div key={service._id} variants={cardVariant} className="group">
                <Link to={service.link} className="block h-full">
                  <div className={`h-full flex flex-col glass-card p-6 rounded-2xl transition-all duration-300 ${style.ring} ${style.glow}`}>
                    <div className={`w-14 h-14 mx-auto mb-6 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon
                        ? <img src={assetUrl(service.icon)} alt={service.title} className="w-8 h-8 object-contain" />
                        : <Icon className="w-7 h-7 text-white" />}
                    </div>
                    <h3 className={`text-lg font-bold mb-3 text-center text-white`}>
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-6 flex-grow text-center">
                      {service.description}
                    </p>
                    <div className={`mt-auto flex items-center justify-center gap-1.5 text-sm font-semibold ${style.text}`}>
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white">Need a Custom Solution?</h3>
              <p className="text-sm text-slate-400">Get a personalized quote for your specific requirements</p>
            </div>
            <Link to="/contact" className="btn-primary shrink-0">
              Get Custom Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
