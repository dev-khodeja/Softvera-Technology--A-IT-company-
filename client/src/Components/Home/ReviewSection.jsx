import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Briefcase, Clock, Target, CheckCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { API_URL } from '../../utils/api';

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [activeReview, setActiveReview] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    fetch(`${API_URL}/api/testimonials`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setReviews(d.data); })
      .catch(() => {});
  }, []);

  const goTo = (index, dir) => {
    setDirection(dir);
    setActiveReview(index);
  };
  const next = () => goTo((activeReview + 1) % reviews.length, 1);
  const prev = () => goTo((activeReview - 1 + reviews.length) % reviews.length, -1);

  if (reviews.length === 0) return null;
  const review = reviews[activeReview];

  return (
    <section className="py-20 px-4 md:px-8 bg-navy-950 relative overflow-hidden" id="testimonials">
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-96 h-96 bg-electric-500/10 rounded-full blur-[120px]" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-14"
        >
          <span className="eyebrow justify-center mb-4">Client Success Stories</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mt-4">
            Discover how <span className="text-accent-400 font-semibold">SoftVera Technologies</span> has helped businesses transform digitally
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={review._id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="glass-card rounded-3xl p-6 md:p-10"
            >
              <Quote className="w-10 h-10 text-accent-500/30 mb-4" />
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${review.avatarColor || 'from-accent-400 to-electric-600'} flex items-center justify-center text-white font-bold text-xl md:text-2xl shrink-0 shadow-lg`}>
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-white">{review.name}</h3>
                  <p className="text-accent-400 text-sm font-medium">{review.role}</p>
                  <p className="text-slate-500 text-xs md:text-sm">{review.company}</p>
                  <div className="flex mt-2">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-current mr-0.5" />
                    ))}
                  </div>
                </div>
                {review.category && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-accent-500/10 text-accent-400 rounded-full border border-accent-500/20 shrink-0">
                    {review.category}
                  </div>
                )}
              </div>

              {(review.project || review.duration) && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {review.project && (
                    <div className="bg-white/5 p-3 rounded-xl">
                      <div className="text-xs text-slate-500 flex items-center gap-1.5"><Briefcase className="w-3 h-3" /> Project</div>
                      <div className="font-semibold text-white text-sm mt-0.5">{review.project}</div>
                    </div>
                  )}
                  {review.duration && (
                    <div className="bg-white/5 p-3 rounded-xl">
                      <div className="text-xs text-slate-500 flex items-center gap-1.5"><Clock className="w-3 h-3" /> Duration</div>
                      <div className="font-semibold text-white text-sm mt-0.5">{review.duration}</div>
                    </div>
                  )}
                </div>
              )}

              <blockquote className="text-slate-300 leading-relaxed p-5 bg-white/5 rounded-xl border-l-2 border-accent-500">
                "{review.content}"
              </blockquote>

              {review.benefits?.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-accent-400" /> Key Benefits Achieved
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {review.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-slate-300 bg-white/5 px-3 py-2 rounded-lg">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {reviews.length > 1 && (
            <>
              <button onClick={prev} className="hidden md:flex absolute top-1/2 -left-14 -translate-y-1/2 w-10 h-10 rounded-full glass-panel items-center justify-center text-slate-300 hover:text-white transition">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} className="hidden md:flex absolute top-1/2 -right-14 -translate-y-1/2 w-10 h-10 rounded-full glass-panel items-center justify-center text-slate-300 hover:text-white transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {reviews.length > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index, index > activeReview ? 1 : -1)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeReview ? 'w-6 bg-accent-500' : 'w-2 bg-white/15 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
