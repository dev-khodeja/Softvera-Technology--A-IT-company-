import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle,
  MessageSquare, Calendar, Users, Globe, Headphones,
  Shield, ChevronRight, Facebook, Linkedin,
  Instagram, Youtube, ArrowRight
} from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';

const SOCIAL_ICONS = {
  facebook: { Icon: Facebook, hover: 'hover:bg-blue-600' },
  youtube: { Icon: Youtube, hover: 'hover:bg-red-600' },
  linkedin: { Icon: Linkedin, hover: 'hover:bg-sky-600' },
  instagram: { Icon: Instagram, hover: 'hover:bg-pink-600' },
  website: { Icon: Globe, hover: 'hover:bg-emerald-600' },
};

const ContactPage = () => {
  const { settings } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', message: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const services = [
    'Digital Services', 'Video Editing', 'Web & App Development',
    'AI & n8n Solutions', 'Automation Services', 'SoftVera Academy',
    'Virtual Assistance', 'Full Package Solutions', 'Other'
  ];

  const budgetRanges = [
    '৳500 - ৳2,000', '৳2,000 - ৳5,000', '৳5,000 - ৳10,000',
    '৳10,000 - ৳25,000', '৳25,000 - ৳50,000', '৳50,000 - ৳1,00,000', '৳1,00,000+', 'Not Sure'
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length >= 2 ? '' : 'Name must be at least 2 characters';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Valid email required';
      case 'phone': {
        const digits = value.replace(/\D/g, '');
        if (value.trim() === '') return 'Phone number is required';
        if (!/^[0-9+\-\s()]+$/.test(value)) return 'Phone number contains invalid characters';
        if (digits.length < 11) return 'Phone number must have at least 10 digits';
        if (digits.length > 15) return 'Phone number is too long (max 15 digits)';
        return '';
      }
      case 'message':
        return value.trim().length >= 10 ? '' : 'Message must be at least 11 characters';
      default:
        return '';
    }
  };
  const validateAllFields = () => {
    const errors = {};
    ['name', 'email', 'phone', 'message'].forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');

    const frontendErrors = validateAllFields();
    if (Object.keys(frontendErrors).some((key) => frontendErrors[key])) {
      setFieldErrors(frontendErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setSubmittedData(result.data);
        setFormData({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' });
        setFieldErrors({});
      } else if (response.status === 400 && result.errors) {
        const backendErrors = {};
        result.errors.forEach((err) => { backendErrors[err.path] = err.msg; });
        setFieldErrors(backendErrors);
        setSubmissionError('Please correct the errors below.');
      } else {
        setSubmissionError(result.message || 'Failed to send message');
      }
    } catch (error) {
      setSubmissionError('Failed to connect to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { icon: <Phone className="w-6 h-6" />, title: 'Phone Number', details: settings.contact?.phone ? [settings.contact.phone] : [] },
    { icon: <Mail className="w-6 h-6" />, title: 'Email Address', details: settings.contact?.email ? [settings.contact.email] : [] },
    { icon: <MapPin className="w-6 h-6" />, title: 'Office Address', details: settings.contact?.address ? [settings.contact.address] : [] },
    { icon: <Clock className="w-6 h-6" />, title: 'Working Hours', details: ['Sunday - Thursday: 9AM - 6PM', 'Friday - Saturday: 10AM - 4PM'] },
  ].filter((c) => c.details.length > 0);

  const socialEntries = Object.entries(settings.socials || {}).filter(([, url]) => url);
  const inputBase = 'w-full px-4 py-3 border rounded-lg bg-white/5 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors';

  return (
    <div className="min-h-screen bg-navy-950 bg-grid pt-[110px]">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-20 px-4 md:px-8">
        <div className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Let's discuss how we can transform your business with our digital solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Response Time', value: '< 2 hours', icon: <Clock className="w-6 h-6" /> },
              { label: 'Support Available', value: '24/7', icon: <Headphones className="w-6 h-6" /> },
              { label: 'Client Satisfaction', value: '98%', icon: <Users className="w-6 h-6" /> },
              { label: 'Global Reach', value: '15+ Countries', icon: <Globe className="w-6 h-6" /> },
            ].map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center">
                <div className="inline-flex p-3 rounded-full bg-accent-500/10 text-accent-400 mb-4">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 md:gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card rounded-3xl p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Send us a Message</h2>
                <p className="text-slate-400">Fill out the form below and our team will get back to you soon.</p>
              </div>

              {submissionError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400">{submissionError}</p>
                </div>
              )}

              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent Successfully!</h3>
                  <p className="text-slate-400 mb-6">Thank you for contacting SoftVera Technologies. We'll get back to you shortly.</p>
                  {submittedData && (
                    <div className="mb-6 p-4 bg-accent-500/10 rounded-lg text-left space-y-1">
                      <p className="text-sm text-accent-300"><strong>Confirmation email sent to:</strong> {submittedData.email}</p>
                      <p className="text-sm text-accent-300"><strong>Reference ID:</strong> {submittedData.contactId}</p>
                      <p className="text-sm text-accent-300"><strong>Submitted at:</strong> {new Date(submittedData.submittedAt).toLocaleString()}</p>
                    </div>
                  )}
                  <button onClick={() => { setIsSubmitted(false); setSubmittedData(null); setSubmissionError(''); }} className="btn-primary">
                    <Send className="w-5 h-5" /> Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange}
                        className={`${inputBase} ${fieldErrors.name ? 'border-red-500' : 'border-white/10'}`}
                        placeholder="John Doe" disabled={isLoading} />
                      {fieldErrors.name && <p className="mt-1 text-sm text-red-400">{fieldErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange}
                        className={`${inputBase} ${fieldErrors.email ? 'border-red-500' : 'border-white/10'}`}
                        placeholder="john@example.com" disabled={isLoading} />
                      {fieldErrors.email && <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        className={`${inputBase} ${fieldErrors.phone ? 'border-red-500' : 'border-white/10'}`}
                        placeholder="+880 1XXXXXXXXX" disabled={isLoading} />
                      {fieldErrors.phone && <p className="mt-1 text-sm text-red-400">{fieldErrors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange}
                        className={`${inputBase} border-white/10`} placeholder="Your Company" disabled={isLoading} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Service Interested In</label>
                      <select name="service" value={formData.service} onChange={handleChange}
                        className={`${inputBase} border-white/10`} disabled={isLoading}>
                        <option value="" className="bg-navy-900">Select a service</option>
                        {services.map((s, i) => <option key={i} value={s} className="bg-navy-900">{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Project Budget</label>
                      <select name="budget" value={formData.budget} onChange={handleChange}
                        className={`${inputBase} border-white/10`} disabled={isLoading}>
                        <option value="" className="bg-navy-900">Select budget range</option>
                        {budgetRanges.map((r, i) => <option key={i} value={r} className="bg-navy-900">{r}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Project Details *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows="6"
                      className={`${inputBase} resize-none ${fieldErrors.message ? 'border-red-500' : 'border-white/10'}`}
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..." disabled={isLoading} />
                    {fieldErrors.message && <p className="mt-1 text-sm text-red-400">{fieldErrors.message}</p>}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Shield className="w-4 h-4 text-accent-400 shrink-0" />
                    <span>Your information is secure and will never be shared with third parties</span>
                  </div>

                  <button type="submit" disabled={isLoading} className={`btn-primary w-full ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}>
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Send Message <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent-500/10 text-accent-400 shrink-0">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => <p key={i} className="text-slate-400 text-sm">{detail}</p>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {socialEntries.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Connect With Us</h3>
                <div className="flex gap-3">
                  {socialEntries.map(([key, url]) => {
                    const entry = SOCIAL_ICONS[key];
                    if (!entry) return null;
                    const { Icon, hover } = entry;
                    return (
                      <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 ${hover} hover:scale-110`}>
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a href="/contact" className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent-500/10 text-accent-400"><Calendar className="w-4 h-4" /></div>
                    <span className="text-sm font-medium text-white">Schedule a Call</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-accent-400" />
                </a>
                <a href="/contact" className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-electric-500/10 text-electric-500"><MessageSquare className="w-4 h-4" /></div>
                    <span className="text-sm font-medium text-white">Live Chat</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-electric-500" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      {settings.contact?.address && (
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Find Our <span className="gradient-text">Office</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Visit our headquarters or schedule an appointment for a personal meeting</p>
            </div>
            <div className="glass-card rounded-3xl overflow-hidden">
              {settings.contact.mapEmbedUrl ? (
                <iframe src={settings.contact.mapEmbedUrl} className="w-full h-96 border-0" loading="lazy" title="Office location map" />
              ) : (
                <div className="h-96 relative bg-gradient-to-br from-accent-500/10 to-electric-500/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-accent-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Our Location</h3>
                    <p className="text-slate-400">{settings.contact.address}</p>
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(settings.contact.address)}`} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-accent-400 hover:text-accent-300 font-medium">
                      Open in Google Maps <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked <span className="gradient-text">Questions</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Common questions about contacting and working with us</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { question: 'What is your typical response time?', answer: 'We respond to all inquiries within 2 hours during business hours and within 12 hours outside of business hours.' },
              { question: 'Do you offer free consultations?', answer: 'Yes, we offer a free 30-minute consultation to discuss your project requirements and how we can help.' },
              { question: 'What information should I provide when contacting you?', answer: "Please include your project requirements, timeline, budget range, and any specific goals or challenges you're facing." },
              { question: 'Do you work with international clients?', answer: 'Absolutely! We serve clients from 15+ countries and can accommodate different time zones and communication preferences.' },
              { question: 'What are your business hours?', answer: 'Our office hours are Sunday-Thursday 9AM-6PM (GMT+6). We also provide 24/7 emergency support for existing clients.' },
              { question: 'How do I schedule a meeting with your team?', answer: "You can schedule a meeting through our contact form, by emailing us directly, or by using the 'Schedule a Call' button on this page." },
            ].map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.floor(index / 2) * 0.1 }}
                className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-3 flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-accent-500/10 text-accent-400 mt-1 shrink-0"><MessageSquare className="w-4 h-4" /></div>
                  {faq.question}
                </h3>
                <p className="text-slate-400 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="rounded-3xl p-8 md:p-12 text-center bg-gradient-to-r from-electric-600 to-accent-600">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Let's Start Your Project Today</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Join 200+ satisfied clients who have transformed their businesses with our solutions.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {settings.contact?.phone && (
                <a href={`tel:${settings.contact.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-navy-950 font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition">
                  <Phone className="w-5 h-5" /> Call Now: {settings.contact.phone}
                </a>
              )}
              {settings.contact?.email && (
                <a href={`mailto:${settings.contact.email}`}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition">
                  <Mail className="w-5 h-5" /> Email Us Directly
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
