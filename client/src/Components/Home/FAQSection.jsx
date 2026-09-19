import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ChevronDown, HelpCircle } from 'lucide-react';
import { API_URL } from '../../utils/api';

const FAQSection = () => {
  const [faqItems, setFaqItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/faqs`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setFaqItems(d.data); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 bg-navy-950 relative overflow-hidden" id="faq">
      <div className="pointer-events-none absolute top-20 right-1/4 w-72 h-72 bg-accent-500/10 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <span className="eyebrow justify-center mb-4">
            <HelpCircle className="w-4 h-4" /> Got Questions?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mt-4">
            Get answers to common questions about <span className="text-accent-400 font-semibold">SoftVera Technologies</span> services and processes
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
          className="grid md:grid-cols-2 gap-5"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={item._id}
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="glass-card rounded-2xl p-6"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full text-left flex items-start justify-between gap-4 group"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-accent-400 to-electric-600 flex items-center justify-center text-navy-950 font-bold text-sm">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-accent-500/10 text-accent-400 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                    {item.category}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1 group-hover:text-accent-400 transition-colors">
                    {item.question}
                  </h3>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-slate-400 leading-relaxed pt-3 mt-3 border-t border-white/10">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 group-hover:bg-accent-500/15 flex items-center justify-center text-slate-400 group-hover:text-accent-400 transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 relative overflow-hidden rounded-3xl p-8 md:p-12 text-center bg-gradient-to-r from-electric-600 to-accent-600"
        >
          <div className="max-w-2xl mx-auto relative">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Still have questions?</h3>
            <p className="text-white/80 mb-8">
              Our <span className="font-semibold">SoftVera Technologies</span> team is ready to help you with personalized answers.
            </p>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-navy-950 font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition">
              <Mail className="w-4 h-4" /> Contact Support
            </a>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/80">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              Average response time: <span className="font-semibold">Under 2 hours</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
